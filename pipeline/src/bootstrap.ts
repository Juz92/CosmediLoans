import "dotenv/config";
import { google } from "googleapis";
import { getAuthClient } from "./config/credentials.js";
import { getSiteConfig } from "./config/site.js";

const DATA_TABS = [
  "uptime-log",
  "ssl-check",
  "daily-traffic",
  "search-queries",
  "search-queries-by-page",
  "index-coverage",
  "landing-performance",
  "pagespeed",
  "broken-links",
  "robots-monitor",
  "content-freshness",
  "business-profile",
  "cannibalization",
  "google-trends",
  "backlinks",
];

const ALERT_TABS = [
  "active-alerts",
  "alert-history",
  "snippet-opportunities",
  "keyword-gaps",
  "trending-keywords",
  "competitor-movements",
  "action-log",
];

async function ensureTabs(spreadsheetId: string, tabNames: string[]) {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = new Set(
    (meta.data.sheets ?? [])
      .map((s) => s.properties?.title)
      .filter((t): t is string => !!t),
  );

  const toAdd = tabNames.filter((t) => !existing.has(t));
  if (toAdd.length === 0) {
    console.log(`  ✓ all tabs present in ${spreadsheetId}`);
    return;
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: toAdd.map((title) => ({
        addSheet: { properties: { title } },
      })),
    },
  });

  console.log(`  + added ${toAdd.length} tab(s): ${toAdd.join(", ")}`);

  const sheet1 = (meta.data.sheets ?? []).find(
    (s) => s.properties?.title === "Sheet1",
  );
  if (sheet1?.properties?.sheetId !== undefined && existing.has("Sheet1")) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ deleteSheet: { sheetId: sheet1.properties.sheetId } }],
      },
    });
    console.log(`  - removed default "Sheet1"`);
  }
}

async function main() {
  const config = getSiteConfig();
  console.log(`Bootstrapping sheets for ${config.name}`);
  console.log(`\nData sheet: ${config.sheetId}`);
  await ensureTabs(config.sheetId, DATA_TABS);
  console.log(`\nAlerts sheet: ${config.alertsSheetId}`);
  await ensureTabs(config.alertsSheetId, ALERT_TABS);
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Bootstrap failed:", err);
  process.exit(1);
});
