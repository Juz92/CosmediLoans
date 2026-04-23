import type { CollectorResult } from "./types.js";
import { getSiteConfig } from "../config/site.js";

/**
 * PageSpeed Insights collector: tests key pages using Google's
 * free PSI REST API (no auth required). Strategy: mobile.
 * Row format: [timestamp, url, score, lcpMs, tbtMs, cls, speedIndex]
 */

const KEY_PAGES = [
  "/",
  "/procedures/dental-loans",
  "/procedures/ivf-financing",
  "/procedures/hair-transplant-loans",
  "/calculator",
  "/compare/cosmediloans-vs-afterpay",
];

interface LighthouseAudit {
  numericValue?: number;
}

interface PsiResponse {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number };
    };
    audits?: Record<string, LighthouseAudit>;
  };
  error?: { message?: string };
}

export async function collectPagespeed(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();
  const rows: string[][] = [];

  for (const pagePath of KEY_PAGES) {
    const fullUrl = `${config.url}${pagePath}`;
    try {
      const row = await testPage(timestamp, fullUrl);
      rows.push(row);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      rows.push([timestamp, fullUrl, "0", "0", "0", "0", message]);
    }
  }

  return {
    source: "pagespeed",
    timestamp,
    rows,
    metadata: {
      strategy: "mobile",
      pagesScanned: rows.length,
    },
  };
}

async function testPage(timestamp: string, url: string): Promise<string[]> {
  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("strategy", "MOBILE");
  apiUrl.searchParams.set("category", "PERFORMANCE");

  const response = await fetch(apiUrl.toString(), {
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`PSI API returned ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as PsiResponse;

  if (data.error) {
    throw new Error(data.error.message ?? "PSI API error");
  }

  const lighthouse = data.lighthouseResult;
  const score = Math.round((lighthouse?.categories?.performance?.score ?? 0) * 100);
  const audits = lighthouse?.audits ?? {};

  const lcpMs = Math.round(audits["largest-contentful-paint"]?.numericValue ?? 0);
  const tbtMs = Math.round(audits["total-blocking-time"]?.numericValue ?? 0);
  const cls = Number(audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3);
  const speedIndex = Math.round(audits["speed-index"]?.numericValue ?? 0);

  return [timestamp, url, String(score), String(lcpMs), String(tbtMs), cls, String(speedIndex)];
}
