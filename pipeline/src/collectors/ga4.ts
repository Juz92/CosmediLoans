import { google } from "googleapis";
import type { CollectorResult } from "./types.js";
import { getAuthClient } from "../config/credentials.js";
import { getSiteConfig } from "../config/site.js";

/**
 * Google Analytics 4 collector: fetches daily sessions, users,
 * page views, average session duration, and bounce rate for the last 7 days.
 * Row format: [date, sessions, users, pageViews, avgSessionDuration, bounceRate]
 */
export async function collectGa4(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();

  try {
    const auth = await getAuthClient();
    const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const response = await analyticsdata.properties.runReport({
      property: `properties/${config.ga4PropertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      },
    });

    const rows: string[][] = (response.data.rows ?? []).map((row) => {
      const date = row.dimensionValues?.[0]?.value ?? "";
      const metrics = row.metricValues ?? [];
      return [
        formatGa4Date(date),
        metrics[0]?.value ?? "0",
        metrics[1]?.value ?? "0",
        metrics[2]?.value ?? "0",
        Number(metrics[3]?.value ?? 0).toFixed(1),
        Number(metrics[4]?.value ?? 0).toFixed(4),
      ];
    });

    return {
      source: "ga4",
      timestamp,
      rows,
      metadata: {
        propertyId: config.ga4PropertyId,
        dateRange: `${formatDate(startDate)} to ${formatDate(endDate)}`,
        rowCount: rows.length,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "ga4",
      timestamp,
      rows: [[timestamp, "0", "0", "0", "0", message]],
      metadata: { error: message },
    };
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** GA4 returns dates as YYYYMMDD; convert to YYYY-MM-DD */
function formatGa4Date(raw: string): string {
  if (raw.length !== 8) return raw;
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}
