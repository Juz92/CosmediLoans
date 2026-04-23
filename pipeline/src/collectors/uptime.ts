import type { CollectorResult } from "./types.js";
import { getSiteConfig } from "../config/site.js";

/**
 * Uptime collector: HTTP HEAD request to the site, measuring
 * response time (ms) and HTTP status code.
 */
export async function collectUptime(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();
  const start = performance.now();
  try {
    const response = await fetch(config.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(10_000),
    });
    const responseMs = Math.round(performance.now() - start);
    return {
      source: "uptime",
      timestamp,
      rows: [[timestamp, String(response.status), String(responseMs), ""]],
    };
  } catch (error) {
    const responseMs = Math.round(performance.now() - start);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "uptime",
      timestamp,
      rows: [[timestamp, "0", String(responseMs), message]],
    };
  }
}
