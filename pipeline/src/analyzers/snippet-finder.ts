import { readRange } from "../sheets/reader.js";
import { getSiteConfig } from "../config/site.js";
import { alertRules } from "../config/alert-rules.js";
import type { CollectorResult } from "../collectors/types.js";

/**
 * Featured snippet / title-tag opportunity finder.
 *
 * Reads Search Console data and identifies queries with:
 *   - Position 1-5  (ranking well)
 *   - CTR below 5%  (but not getting clicks)
 *   - Impressions > 50  (meaningful volume)
 *
 * These are prime candidates for improving title tags, meta descriptions,
 * or structuring content to capture featured snippets.
 *
 * Sheet row format (from `search-console` collector): [timestamp, query, clicks, impressions, ctr, position]
 * ctr is stored as a decimal (0.05 = 5%). alertRules.ctrThreshold is a percentage (5 = 5%).
 */
export async function analyzeSnippetOpportunities(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const rows = await readRange(config.sheetId, "search-queries", "A:F");
  const dataRows = rows.length > 0 ? rows : [];

  const { maxPosition, ctrThreshold, minImpressions } =
    alertRules.snippetOpportunity;

  const timestamp = new Date().toISOString();
  const resultRows: string[][] = [];

  for (const row of dataRows) {
    const query = (row[1] ?? "").trim();
    const impressions = parseInt(row[3] ?? "0", 10);
    const ctrPercent = parseFloat(row[4] ?? "0") * 100;
    const position = parseFloat(row[5] ?? "0");

    if (!query) continue;

    if (
      position >= 1 &&
      position <= maxPosition &&
      ctrPercent < ctrThreshold &&
      impressions > minImpressions
    ) {
      resultRows.push([
        timestamp,
        query,
        position.toFixed(1),
        ctrPercent.toFixed(2),
        String(impressions),
      ]);
    }
  }

  resultRows.sort(
    (a, b) => parseInt(b[4], 10) - parseInt(a[4], 10)
  );

  console.log(
    `[snippet-finder] Found ${resultRows.length} snippet opportunities`
  );

  return {
    source: "snippet-opportunities",
    timestamp,
    rows: resultRows,
    metadata: { totalOpportunities: resultRows.length },
  };
}
