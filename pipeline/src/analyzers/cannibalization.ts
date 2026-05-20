import { google } from "googleapis";
import type { CollectorResult } from "../collectors/types.js";
import { getAuthClient } from "../config/credentials.js";
import { getSiteConfig } from "../config/site.js";

interface QueryPageMetric {
  page: string;
  impressions: number;
  clicks: number;
  positionWeighted: number;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Keyword cannibalization analyzer.
 *
 * Pulls Search Console query + page rows directly so it can identify
 * queries where multiple URLs are receiving impressions for the same term.
 *
 * Sheet row format:
 * [timestamp, query, pageCount, pages_csv, totalImpressions]
 */
export async function analyzeCannibalization(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 27);

  const auth = await getAuthClient();
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const response = await searchconsole.searchanalytics.query({
    siteUrl: config.gscProperty,
    requestBody: {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      dimensions: ["query", "page"],
      rowLimit: 25000,
      type: "web",
    },
  });

  const grouped = new Map<string, Map<string, QueryPageMetric>>();

  for (const row of response.data.rows ?? []) {
    const query = (row.keys?.[0] ?? "").trim().toLowerCase();
    const page = (row.keys?.[1] ?? "").trim();
    const impressions = Number(row.impressions ?? 0);
    const clicks = Number(row.clicks ?? 0);
    const position = Number(row.position ?? 0);

    if (!query || !page || impressions <= 0) continue;

    if (!grouped.has(query)) grouped.set(query, new Map());
    const pages = grouped.get(query)!;
    const existing = pages.get(page);

    if (existing) {
      existing.impressions += impressions;
      existing.clicks += clicks;
      existing.positionWeighted += position * impressions;
    } else {
      pages.set(page, {
        page,
        impressions,
        clicks,
        positionWeighted: position * impressions,
      });
    }
  }

  const resultRows: string[][] = [];

  for (const [query, pages] of grouped) {
    const pageMetrics = [...pages.values()].sort(
      (a, b) => b.impressions - a.impressions
    );
    if (pageMetrics.length < 2) continue;

    const totalImpressions = pageMetrics.reduce(
      (sum, page) => sum + page.impressions,
      0
    );
    if (totalImpressions < 20) continue;

    const pageSummary = pageMetrics
      .slice(0, 5)
      .map((page) => {
        const avgPosition =
          page.impressions > 0
            ? page.positionWeighted / page.impressions
            : 0;
        return `${page.page} (${page.impressions} impr, pos ${avgPosition.toFixed(1)})`;
      })
      .join(" | ");

    resultRows.push([
      timestamp,
      query,
      String(pageMetrics.length),
      pageSummary,
      String(Math.round(totalImpressions)),
    ]);
  }

  resultRows.sort((a, b) => parseInt(b[4], 10) - parseInt(a[4], 10));

  console.log(
    `[cannibalization] Found ${resultRows.length} cannibalized queries`
  );

  return {
    source: "cannibalization",
    timestamp,
    rows: resultRows,
    metadata: {
      totalCannibalized: resultRows.length,
      dateRange: `${formatDate(startDate)} to ${formatDate(endDate)}`,
    },
  };
}
