import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { google } from "googleapis";
import { getAuthClient } from "./config/credentials.js";

interface GscRow {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface ScoredRow extends GscRow {
  previousClicks: number;
  previousImpressions: number;
  clickDelta: number;
  impressionDelta: number;
}

const DEFAULT_DOMAIN = "cosmediloans.com.au";
const DEFAULT_DAYS = 28;
const API_LAG_DAYS = 3;
const ROW_LIMIT = 25_000;

function getArg(name: string) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function dateRange(days: number) {
  const endDate = addDays(new Date(), -API_LAG_DAYS);
  const startDate = addDays(endDate, -(days - 1));
  const previousEndDate = addDays(startDate, -1);
  const previousStartDate = addDays(previousEndDate, -(days - 1));

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    previousStartDate: formatDate(previousStartDate),
    previousEndDate: formatDate(previousEndDate),
  };
}

function rowKey(row: Pick<GscRow, "query" | "page">) {
  return `${row.query}\n${row.page}`;
}

function expectedCtr(position: number) {
  if (position <= 1.5) return 0.22;
  if (position <= 3) return 0.12;
  if (position <= 5) return 0.07;
  if (position <= 8) return 0.04;
  return 0.02;
}

async function resolveSiteUrl(
  sc: ReturnType<typeof google.searchconsole>,
  configured?: string
) {
  if (configured) return configured;

  const sites = await sc.sites.list();
  const entries = sites.data.siteEntry ?? [];
  const candidates = entries
    .filter((entry) => entry.siteUrl?.includes(DEFAULT_DOMAIN))
    .filter((entry) => entry.permissionLevel !== "siteUnverifiedUser");

  const exactUrlPrefix = candidates.find(
    (entry) => entry.siteUrl === `https://www.${DEFAULT_DOMAIN}/`
  );
  if (exactUrlPrefix?.siteUrl) return exactUrlPrefix.siteUrl;

  const domainProperty = candidates.find((entry) =>
    entry.siteUrl?.startsWith("sc-domain:")
  );
  if (domainProperty?.siteUrl) return domainProperty.siteUrl;

  const first = candidates[0]?.siteUrl;
  if (first) return first;

  throw new Error(
    `No Search Console property found for ${DEFAULT_DOMAIN}. Set GSC_PROPERTY explicitly.`
  );
}

async function fetchRows(
  sc: ReturnType<typeof google.searchconsole>,
  siteUrl: string,
  startDate: string,
  endDate: string
) {
  const rows: GscRow[] = [];

  for (let startRow = 0; ; startRow += ROW_LIMIT) {
    const response = await sc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: ROW_LIMIT,
        startRow,
        type: "web",
      },
    });

    const batch = response.data.rows ?? [];
    rows.push(
      ...batch.map((row) => ({
        query: row.keys?.[0] ?? "",
        page: row.keys?.[1] ?? "",
        clicks: Number(row.clicks ?? 0),
        impressions: Number(row.impressions ?? 0),
        ctr: Number(row.ctr ?? 0),
        position: Number(row.position ?? 0),
      }))
    );

    if (batch.length < ROW_LIMIT) break;
  }

  return rows.filter((row) => row.query && row.page);
}

function scoreRows(current: GscRow[], previous: GscRow[]): ScoredRow[] {
  const previousByKey = new Map(previous.map((row) => [rowKey(row), row]));

  return current.map((row) => {
    const prev = previousByKey.get(rowKey(row));
    return {
      ...row,
      previousClicks: prev?.clicks ?? 0,
      previousImpressions: prev?.impressions ?? 0,
      clickDelta: row.clicks - (prev?.clicks ?? 0),
      impressionDelta: row.impressions - (prev?.impressions ?? 0),
    };
  });
}

function topRows<T>(rows: T[], limit = 20) {
  return rows.slice(0, limit);
}

function analyze(rows: ScoredRow[]) {
  const strikingDistance = rows
    .filter((row) => row.impressions >= 30 && row.position > 3 && row.position <= 20)
    .sort((a, b) => b.impressions * (21 - b.position) - a.impressions * (21 - a.position));

  const ctrOpportunities = rows
    .filter((row) => row.impressions >= 30 && row.position <= 8)
    .filter((row) => row.ctr < expectedCtr(row.position) * 0.65)
    .sort((a, b) => b.impressions * (expectedCtr(b.position) - b.ctr) - a.impressions * (expectedCtr(a.position) - a.ctr));

  const zeroClick = rows
    .filter((row) => row.clicks === 0 && row.impressions >= 20 && row.position <= 30)
    .sort((a, b) => b.impressions - a.impressions);

  const decliners = rows
    .filter((row) => row.previousClicks >= 3 && row.clicks <= row.previousClicks * 0.75)
    .sort((a, b) => a.clickDelta - b.clickDelta);

  const queryPages = new Map<string, ScoredRow[]>();
  for (const row of rows) {
    if (row.impressions < 10) continue;
    const pages = queryPages.get(row.query) ?? [];
    pages.push(row);
    queryPages.set(row.query, pages);
  }

  const cannibalization = [...queryPages.entries()]
    .map(([query, pages]) => ({
      query,
      pages: pages.sort((a, b) => b.impressions - a.impressions),
      totalImpressions: pages.reduce((sum, page) => sum + page.impressions, 0),
      totalClicks: pages.reduce((sum, page) => sum + page.clicks, 0),
    }))
    .filter((item) => item.pages.length > 1 && item.totalImpressions >= 30)
    .sort((a, b) => b.totalImpressions - a.totalImpressions);

  const pageSummary = new Map<string, GscRow>();
  for (const row of rows) {
    const existing = pageSummary.get(row.page) ?? {
      query: "",
      page: row.page,
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };
    const totalImpressions = existing.impressions + row.impressions;
    existing.position =
      totalImpressions > 0
        ? (existing.position * existing.impressions + row.position * row.impressions) /
          totalImpressions
        : 0;
    existing.clicks += row.clicks;
    existing.impressions = totalImpressions;
    existing.ctr =
      existing.impressions > 0 ? existing.clicks / existing.impressions : 0;
    pageSummary.set(row.page, existing);
  }

  const landingPages = [...pageSummary.values()].sort(
    (a, b) => b.impressions - a.impressions
  );

  return {
    strikingDistance: topRows(strikingDistance),
    ctrOpportunities: topRows(ctrOpportunities),
    zeroClick: topRows(zeroClick),
    decliners: topRows(decliners),
    cannibalization: topRows(cannibalization),
    landingPages: topRows(landingPages),
  };
}

function compactRow(row: GscRow | ScoredRow) {
  return {
    query: row.query,
    page: row.page,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: `${(row.ctr * 100).toFixed(2)}%`,
    position: Number(row.position.toFixed(1)),
    ...("clickDelta" in row
      ? {
          clickDelta: row.clickDelta,
          impressionDelta: row.impressionDelta,
        }
      : {}),
  };
}

function printSection(title: string, rows: unknown[]) {
  console.log("");
  console.log(`## ${title}`);
  console.log(JSON.stringify(rows, null, 2));
}

async function main() {
  const days = Number(getArg("days") ?? DEFAULT_DAYS);
  const siteArg = getArg("site") ?? process.env.GSC_PROPERTY;
  const outPath = getArg("out");
  const range = dateRange(days);

  const auth = await getAuthClient();
  const sc = google.searchconsole({ version: "v1", auth });
  const siteUrl = await resolveSiteUrl(sc, siteArg);

  console.log(`Search Console property: ${siteUrl}`);
  console.log(`Current range: ${range.startDate} to ${range.endDate}`);
  console.log(
    `Previous range: ${range.previousStartDate} to ${range.previousEndDate}`
  );

  const current = await fetchRows(sc, siteUrl, range.startDate, range.endDate);
  const previous = await fetchRows(
    sc,
    siteUrl,
    range.previousStartDate,
    range.previousEndDate
  );
  const scored = scoreRows(current, previous);
  const report = analyze(scored);

  const output = {
    generatedAt: new Date().toISOString(),
    siteUrl,
    range,
    totalRows: scored.length,
    totals: {
      clicks: scored.reduce((sum, row) => sum + row.clicks, 0),
      impressions: scored.reduce((sum, row) => sum + row.impressions, 0),
    },
    report: {
      strikingDistance: report.strikingDistance.map(compactRow),
      ctrOpportunities: report.ctrOpportunities.map(compactRow),
      zeroClick: report.zeroClick.map(compactRow),
      decliners: report.decliners.map(compactRow),
      cannibalization: report.cannibalization.map((item) => ({
        query: item.query,
        totalClicks: item.totalClicks,
        totalImpressions: item.totalImpressions,
        pages: item.pages.slice(0, 5).map(compactRow),
      })),
      landingPages: report.landingPages.map(compactRow),
    },
  };

  console.log("");
  console.log(`# GSC Opportunities (${days} days)`);
  console.log(
    `Total clicks: ${output.totals.clicks}; total impressions: ${output.totals.impressions}`
  );

  printSection("Striking Distance Queries", output.report.strikingDistance);
  printSection("CTR Rewrite Opportunities", output.report.ctrOpportunities);
  printSection("Zero-Click Impression Opportunities", output.report.zeroClick);
  printSection("Declining Query/Page Pairs", output.report.decliners);
  printSection("Cannibalization", output.report.cannibalization);
  printSection("Top Landing Pages", output.report.landingPages);

  if (outPath) {
    const resolved = path.resolve(outPath);
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.writeFileSync(resolved, JSON.stringify(output, null, 2));
    console.log("");
    console.log(`Wrote JSON report to ${resolved}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
