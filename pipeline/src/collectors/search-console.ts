import { google } from "googleapis";
import type { CollectorResult } from "./types.js";
import { getAuthClient } from "../config/credentials.js";
import { getSiteConfig } from "../config/site.js";

/**
 * Google Search Console collector: fetches the top 100 queries
 * by clicks for the last 7 days.
 * Row format: [timestamp, query, clicks, impressions, ctr, position]
 */
export async function collectSearchConsole(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();

  try {
    const auth = await getAuthClient();
    const searchconsole = google.searchconsole({ version: "v1", auth });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const response = await searchconsole.searchanalytics.query({
      siteUrl: config.gscProperty,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ["query"],
        rowLimit: 100,
        type: "web",
      },
    });

    const rows: string[][] = (response.data.rows ?? []).map((row) => [
      timestamp,
      row.keys?.[0] ?? "",
      String(row.clicks ?? 0),
      String(row.impressions ?? 0),
      String(Number(row.ctr ?? 0).toFixed(4)),
      String(Number(row.position ?? 0).toFixed(1)),
    ]);

    return {
      source: "search-console",
      timestamp,
      rows,
      metadata: {
        queryCount: rows.length,
        dateRange: `${formatDate(startDate)} to ${formatDate(endDate)}`,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "search-console",
      timestamp,
      rows: [[timestamp, "ERROR", "0", "0", "0", message]],
      metadata: { error: message },
    };
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
