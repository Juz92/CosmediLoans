import { readRange } from "../sheets/reader.js";
import { getSiteConfig } from "../config/site.js";
import type { CollectorResult } from "../collectors/types.js";

/**
 * Keyword cannibalization analyzer.
 *
 * Reads Search Console query data from the "search-queries" sheet and
 * identifies queries that rank on multiple pages. When two or more pages
 * compete for the same query Google may split authority, hurting both.
 *
 * Sheet row format: [timestamp, query, pageCount, pages_csv, totalImpressions]
 */
export async function analyzeCannibalization(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const rows = await readRange(config.sheetId, "search-queries", "A:F");
  const dataRows = rows.slice(1); // skip header

  // Group by query, collect unique pages per query
  const queryPages = new Map<string, Set<string>>();
  const queryImpressions = new Map<string, number>();

  for (const row of dataRows) {
    const query = (row[1] ?? "").trim().toLowerCase();
    const pagesCsv = row[3] ?? "";
    const impressions = parseInt(row[4] ?? "0", 10);

    if (!query) continue;

    if (!queryPages.has(query)) {
      queryPages.set(query, new Set());
      queryImpressions.set(query, 0);
    }

    // pages_csv may list multiple URLs separated by commas
    const pages = pagesCsv.split(",").map((p) => p.trim()).filter(Boolean);
    const existing = queryPages.get(query)!;
    for (const page of pages) {
      existing.add(page);
    }

    queryImpressions.set(
      query,
      (queryImpressions.get(query) ?? 0) + impressions
    );
  }

  // Find queries that appear on multiple pages (cannibalization)
  const timestamp = new Date().toISOString();
  const resultRows: string[][] = [];

  for (const [query, pages] of queryPages) {
    if (pages.size < 2) continue;
    const sortedPages = [...pages].sort();
    const impressions = queryImpressions.get(query) ?? 0;
    resultRows.push([
      timestamp,
      query,
      String(pages.size),
      sortedPages.join(", "),
      String(impressions),
    ]);
  }

  // Sort by impression count descending so the biggest issues surface first
  resultRows.sort(
    (a, b) => parseInt(b[4], 10) - parseInt(a[4], 10)
  );

  console.log(
    `[cannibalization] Found ${resultRows.length} cannibalized queries`
  );

  return {
    source: "cannibalization",
    timestamp,
    rows: resultRows,
    metadata: { totalCannibalized: resultRows.length },
  };
}
