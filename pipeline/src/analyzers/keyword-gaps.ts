import { readRange } from "../sheets/reader.js";
import { getSiteConfig } from "../config/site.js";
import { alertRules } from "../config/alert-rules.js";
import type { CollectorResult } from "../collectors/types.js";

/**
 * Keyword gap analyzer.
 *
 * Reads Search Console data and finds queries with high impressions
 * but very low CTR. These queries show Google is presenting the page
 * but users are not clicking, indicating the title tag, meta description
 * or content does not match user intent well enough.
 *
 * Sheet row format (from `search-console` collector): [timestamp, query, clicks, impressions, ctr, position]
 * ctr is stored as a decimal (0.02 = 2%). alertRules.maxCtr is a percentage (2 = 2%).
 */
export async function analyzeKeywordGaps(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const rows = await readRange(config.sheetId, "search-queries", "A:F");
  const dataRows = rows.length > 0 ? rows : [];

  const { minImpressions, maxCtr } = alertRules.keywordGap;

  const timestamp = new Date().toISOString();
  const resultRows: string[][] = [];

  for (const row of dataRows) {
    const query = (row[1] ?? "").trim();
    const clicks = parseInt(row[2] ?? "0", 10);
    const impressions = parseInt(row[3] ?? "0", 10);
    const ctrPercent = parseFloat(row[4] ?? "0") * 100;
    const position = parseFloat(row[5] ?? "0");

    if (!query) continue;

    if (impressions > minImpressions && ctrPercent < maxCtr) {
      resultRows.push([
        timestamp,
        query,
        String(impressions),
        String(clicks),
        ctrPercent.toFixed(2),
        position.toFixed(1),
      ]);
    }
  }

  resultRows.sort(
    (a, b) => parseInt(b[2], 10) - parseInt(a[2], 10)
  );

  console.log(
    `[keyword-gaps] Found ${resultRows.length} keyword gap opportunities`
  );

  return {
    source: "keyword-gaps",
    timestamp,
    rows: resultRows,
    metadata: { totalGaps: resultRows.length },
  };
}
