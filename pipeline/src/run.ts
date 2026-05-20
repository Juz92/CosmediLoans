import "dotenv/config";
import type { CollectorResult } from "./collectors/types.js";

const args = process.argv.slice(2);
const mode = args.find((a) => a.startsWith("--mode="))?.split("=")[1];
const source = args.find((a) => a.startsWith("--source="))?.split("=")[1];
const type = args.find((a) => a.startsWith("--type="))?.split("=")[1];

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
  "snippet-finder": "snippet-opportunities",
  "snippet-opportunities": "snippet-opportunities",
  "keyword-gaps": "keyword-gaps",
};

const ALERT_SHEET_SOURCES = new Set([
  "snippet-finder",
  "snippet-opportunities",
  "keyword-gaps",
  "trending-keywords",
  "competitor-movements",
]);

async function writeResultToSheets(result: CollectorResult): Promise<void> {
  const { appendRows } = await import("./sheets/writer.js");
  const { getSiteConfig } = await import("./config/site.js");
  const config = getSiteConfig();
  const tabName = SOURCE_TO_TAB[result.source] ?? result.source;
  const sheetId = ALERT_SHEET_SOURCES.has(result.source)
    ? config.alertsSheetId
    : config.sheetId;
  if (result.rows.length > 0) {
    await appendRows(sheetId, tabName, result.rows);
    console.log(`Wrote ${result.rows.length} row(s) to "${tabName}"`);
  } else {
    console.log(`No rows to write for "${result.source}"`);
  }
}

// ---------------------------------------------------------------------------
// Collector dispatch
// ---------------------------------------------------------------------------

async function runCollector(name: string): Promise<void> {
  let result: CollectorResult;

  switch (name) {
    case "uptime": {
      const { collectUptime } = await import("./collectors/uptime.js");
      result = await collectUptime();
      break;
    }
    case "search-console": {
      const { collectSearchConsole } = await import(
        "./collectors/search-console.js"
      );
      result = await collectSearchConsole();
      break;
    }
    case "ga4": {
      const { collectGa4 } = await import("./collectors/ga4.js");
      result = await collectGa4();
      break;
    }
    case "ssl": {
      const { collectSslCheck } = await import("./collectors/ssl-check.js");
      result = await collectSslCheck();
      break;
    }
    case "pagespeed": {
      const { collectPagespeed } = await import("./collectors/pagespeed.js");
      result = await collectPagespeed();
      break;
    }
    case "robots": {
      const { collectRobotsMonitor } = await import("./collectors/robots-monitor.js");
      result = await collectRobotsMonitor();
      break;
    }
    case "freshness": {
      const { collectContentFreshness } = await import(
        "./collectors/content-freshness.js"
      );
      result = await collectContentFreshness();
      break;
    }
    case "business-profile": {
      const { collectBusinessProfile } = await import(
        "./collectors/business-profile.js"
      );
      result = await collectBusinessProfile();
      break;
    }
    default:
      console.error(
        `Unknown source: ${name}\n` +
          "Valid sources: uptime, search-console, ga4, ssl, pagespeed, robots, freshness, business-profile"
      );
      process.exit(1);
  }

  await writeResultToSheets(result);
  console.log(`[collect] ${name} complete`);
}

// ---------------------------------------------------------------------------
// Analyzer dispatch
// ---------------------------------------------------------------------------

async function runAnalyzer(name: string): Promise<void> {
  let result: CollectorResult;

  switch (name) {
    case "cannibalization": {
      const { analyzeCannibalization } = await import(
        "./analyzers/cannibalization.js"
      );
      result = await analyzeCannibalization();
      break;
    }
    case "snippets": {
      const { analyzeSnippetOpportunities } = await import(
        "./analyzers/snippet-finder.js"
      );
      result = await analyzeSnippetOpportunities();
      break;
    }
    case "gaps": {
      const { analyzeKeywordGaps } = await import(
        "./analyzers/keyword-gaps.js"
      );
      result = await analyzeKeywordGaps();
      break;
    }
    default:
      console.error(
        `Unknown analyzer: ${name}\n` +
          "Valid types: cannibalization, snippets, gaps"
      );
      process.exit(1);
  }

  // Print summary to stdout
  console.log(`\n[analyze] ${name} results:`);
  console.log(`  Source: ${result.source}`);
  console.log(`  Rows: ${result.rows.length}`);
  if (result.metadata) {
    console.log(`  Metadata: ${JSON.stringify(result.metadata)}`);
  }
  if (result.rows.length > 0) {
    console.log(`  Top 5:`);
    for (const row of result.rows.slice(0, 5)) {
      console.log(`    ${row.join(" | ")}`);
    }
  }

  await writeResultToSheets(result);
}

// ---------------------------------------------------------------------------
// Manual alert check
// ---------------------------------------------------------------------------

async function runAlerts(): Promise<void> {
  const { evaluateAlerts } = await import("./alerts/evaluator.js");
  const { sendDiscordAlert } = await import("./alerts/discord.js");
  const { logAlerts } = await import("./alerts/history.js");

  const alerts = await evaluateAlerts();

  if (alerts.length === 0) {
    console.log("[alerts] No alerts triggered");
    return;
  }

  console.log(`[alerts] ${alerts.length} alert(s) triggered:`);
  for (const alert of alerts) {
    console.log(`  [${alert.severity}] ${alert.title}: ${alert.description}`);

    try {
      await sendDiscordAlert({
        severity: alert.severity,
        title: alert.title,
        description: alert.description,
        fields: alert.fields,
      });
    } catch (err) {
      console.error(`  Failed to send Discord alert for ${alert.ruleId}:`, err);
    }
  }

  await logAlerts(alerts);
  console.log("[alerts] Alerts logged to history");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  switch (mode) {
    case "scheduler": {
      const { startScheduler } = await import("./scheduler.js");
      startScheduler();
      break;
    }
    case "collect": {
      if (!source) {
        console.error(
          "Missing --source flag.\n" +
            "Usage: tsx src/run.ts --mode=collect --source=uptime|ga4|search-console|ssl|pagespeed|robots|freshness|business-profile"
        );
        process.exit(1);
      }
      await runCollector(source);
      break;
    }
    case "analyze": {
      if (!type) {
        console.error(
          "Missing --type flag.\n" +
            "Usage: tsx src/run.ts --mode=analyze --type=cannibalization|snippets|gaps"
        );
        process.exit(1);
      }
      await runAnalyzer(type);
      break;
    }
    case "alerts": {
      await runAlerts();
      break;
    }
    default:
      console.log(
        "SEO Pipeline CLI\n\n" +
          "Usage:\n" +
          "  tsx src/run.ts --mode=scheduler\n" +
          "  tsx src/run.ts --mode=collect --source=uptime|ga4|search-console|ssl|pagespeed|robots|freshness|business-profile\n" +
          "  tsx src/run.ts --mode=analyze --type=cannibalization|snippets|gaps\n" +
          "  tsx src/run.ts --mode=alerts"
      );
      break;
  }
}

main().catch((err) => {
  console.error("[run] Fatal error:", err);
  process.exit(1);
});
