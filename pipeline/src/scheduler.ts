import cron from "node-cron";
import { appendRows, clearAndWrite } from "./sheets/writer.js";
import { getSiteConfig } from "./config/site.js";
import { evaluateAlerts } from "./alerts/evaluator.js";
import { logAlerts } from "./alerts/history.js";
import { sendDiscordAlert } from "./alerts/discord.js";
import type { CollectorResult } from "./collectors/types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SOURCE_TO_TAB: Record<string, string> = {
  uptime: "uptime-log",
  "ssl-check": "ssl-check",
  "search-console": "search-queries",
  ga4: "daily-traffic",
  pagespeed: "pagespeed",
  "robots-monitor": "robots-monitor",
  "content-freshness": "content-freshness",
  "business-profile": "business-profile",
  cannibalization: "cannibalization",
  "snippet-opportunities": "snippet-opportunities",
  "keyword-gaps": "keyword-gaps",
};

const ALERT_SHEET_SOURCES = new Set([
  "snippet-opportunities",
  "keyword-gaps",
  "trending-keywords",
  "competitor-movements",
]);

/** Write a collector result to the appropriate Sheets tab. */
async function writeResult(result: CollectorResult): Promise<void> {
  const config = getSiteConfig();
  if (result.rows.length === 0) {
    console.log(`[scheduler] ${result.source}: no rows to write`);
    return;
  }
  const tabName = SOURCE_TO_TAB[result.source] ?? result.source;
  const sheetId = ALERT_SHEET_SOURCES.has(result.source)
    ? config.alertsSheetId
    : config.sheetId;
  await appendRows(sheetId, tabName, result.rows);
  console.log(
    `[scheduler] ${tabName}: wrote ${result.rows.length} row(s)`
  );
}

/** Write analyzer results (overwrite the tab so it always shows latest). */
async function writeAnalyzerResult(result: CollectorResult): Promise<void> {
  const config = getSiteConfig();
  if (result.rows.length === 0) {
    console.log(`[scheduler] ${result.source}: no rows to write`);
    return;
  }
  // Analyzer results replace previous data so the sheet is always current
  const headers = getHeadersForSource(result.source);
  const tabName = SOURCE_TO_TAB[result.source] ?? result.source;
  const sheetId = ALERT_SHEET_SOURCES.has(result.source)
    ? config.alertsSheetId
    : config.sheetId;
  await clearAndWrite(sheetId, tabName, headers, result.rows);
  console.log(
    `[scheduler] ${tabName}: wrote ${result.rows.length} row(s) (replaced)`
  );
}

function getHeadersForSource(source: string): string[] {
  switch (source) {
    case "cannibalization":
      return ["timestamp", "query", "pageCount", "pages", "impressions"];
    case "snippet-opportunities":
      return ["timestamp", "query", "position", "ctr", "impressions"];
    case "keyword-gaps":
      return [
        "timestamp",
        "query",
        "impressions",
        "clicks",
        "ctr",
        "position",
      ];
    default:
      return [];
  }
}

/** Run alert evaluation, send Discord notifications, and log history. */
async function runAlertPipeline(): Promise<void> {
  try {
    const alerts = await evaluateAlerts();
    if (alerts.length === 0) return;

    // Send each alert to Discord
    for (const alert of alerts) {
      try {
        await sendDiscordAlert({
          severity: alert.severity,
          title: alert.title,
          description: alert.description,
          fields: alert.fields,
        });
      } catch (err) {
        console.error(
          `[scheduler] Failed to send Discord alert for ${alert.ruleId}:`,
          err
        );
      }
    }

    // Log to history sheet
    await logAlerts(alerts);
  } catch (err) {
    console.error("[scheduler] Alert pipeline error:", err);
  }
}

/** Safely run an async task with error logging. */
async function safeRun(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    console.log(`[scheduler] Running: ${name}`);
    await fn();
    console.log(`[scheduler] Completed: ${name}`);
  } catch (err) {
    console.error(`[scheduler] Failed: ${name}`, err);
  }
}

// ---------------------------------------------------------------------------
// Scheduler
// ---------------------------------------------------------------------------

export function startScheduler(): void {
  console.log("[scheduler] SEO Pipeline scheduler started");
  console.log("[scheduler] Timezone: AEST (UTC+10, cron runs in UTC)");

  // -----------------------------------------------------------------------
  // Every 5 minutes: uptime check
  // -----------------------------------------------------------------------
  cron.schedule("*/5 * * * *", async () => {
    await safeRun("uptime", async () => {
      const { collectUptime } = await import("./collectors/uptime.js");
      const result = await collectUptime();
      await writeResult(result);
      await runAlertPipeline();
    });
  });

  // -----------------------------------------------------------------------
  // Daily at 6am AEST (20:00 UTC previous day)
  // Search Console, GA4, SSL check
  // -----------------------------------------------------------------------
  cron.schedule("0 20 * * *", async () => {
    await safeRun("search-console", async () => {
      const { collectSearchConsole } = await import(
        "./collectors/search-console.js"
      );
      const result = await collectSearchConsole();
      await writeResult(result);
    });

    await safeRun("ga4", async () => {
      const { collectGa4 } = await import("./collectors/ga4.js");
      const result = await collectGa4();
      await writeResult(result);
    });

    await safeRun("ssl-check", async () => {
      const { collectSslCheck } = await import("./collectors/ssl-check.js");
      const result = await collectSslCheck();
      await writeResult(result);
    });

    await safeRun("business-profile", async () => {
      const { collectBusinessProfile } = await import(
        "./collectors/business-profile.js"
      );
      const result = await collectBusinessProfile();
      await writeResult(result);
    });

    await runAlertPipeline();
  });

  // -----------------------------------------------------------------------
  // Weekly Monday at 6am AEST (Sunday 20:00 UTC)
  // PageSpeed, content freshness, robots monitor, + all analyzers
  // -----------------------------------------------------------------------
  cron.schedule("0 20 * * 0", async () => {
    // Collectors
    await safeRun("pagespeed", async () => {
      const { collectPagespeed } = await import("./collectors/pagespeed.js");
      const result = await collectPagespeed();
      await writeResult(result);
    });

    await safeRun("content-freshness", async () => {
      const { collectContentFreshness } = await import(
        "./collectors/content-freshness.js"
      );
      const result = await collectContentFreshness();
      await writeResult(result);
    });

    await safeRun("robots-monitor", async () => {
      const { collectRobotsMonitor } = await import("./collectors/robots-monitor.js");
      const result = await collectRobotsMonitor();
      await writeResult(result);
    });

    // Analyzers
    await safeRun("cannibalization-analysis", async () => {
      const { analyzeCannibalization } = await import(
        "./analyzers/cannibalization.js"
      );
      const result = await analyzeCannibalization();
      await writeAnalyzerResult(result);
    });

    await safeRun("snippet-analysis", async () => {
      const { analyzeSnippetOpportunities } = await import(
        "./analyzers/snippet-finder.js"
      );
      const result = await analyzeSnippetOpportunities();
      await writeAnalyzerResult(result);
    });

    await safeRun("keyword-gap-analysis", async () => {
      const { analyzeKeywordGaps } = await import(
        "./analyzers/keyword-gaps.js"
      );
      const result = await analyzeKeywordGaps();
      await writeAnalyzerResult(result);
    });

    await runAlertPipeline();
  });

  console.log("[scheduler] Cron jobs registered:");
  console.log("  - */5 * * * *   uptime");
  console.log("  - 0 20 * * *    search-console, ga4, ssl-check, business-profile");
  console.log("  - 0 20 * * 0    pagespeed, freshness, robots, analyzers");
}
