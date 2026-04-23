import type { CollectorResult } from "./types.js";
import { getSiteConfig } from "../config/site.js";

/**
 * Content freshness collector: fetches /sitemap.xml, parses <loc> and
 * <lastmod> dates, and flags pages not updated within the last 90 days.
 * Row format: [timestamp, url, lastmod, daysSinceUpdate, stale]
 */

const STALE_THRESHOLD_DAYS = 90;

export async function collectContentFreshness(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();

  try {
    const sitemapUrl = `${config.url}/sitemap.xml`;
    const response = await fetch(sitemapUrl, {
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xml = await response.text();
    const entries = parseSitemap(xml);
    const now = new Date();

    const rows: string[][] = entries.map((entry) => {
      const lastmod = entry.lastmod || "";
      let daysSinceUpdate = -1;
      let stale = "unknown";

      if (lastmod) {
        const lastmodDate = new Date(lastmod);
        daysSinceUpdate = Math.floor(
          (now.getTime() - lastmodDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        stale = daysSinceUpdate > STALE_THRESHOLD_DAYS ? "true" : "false";
      }

      return [
        timestamp,
        entry.loc,
        lastmod,
        String(daysSinceUpdate),
        stale,
      ];
    });

    const staleCount = rows.filter((r) => r[4] === "true").length;

    return {
      source: "content-freshness",
      timestamp,
      rows,
      metadata: {
        totalPages: entries.length,
        stalePages: staleCount,
        thresholdDays: STALE_THRESHOLD_DAYS,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "content-freshness",
      timestamp,
      rows: [[timestamp, "", "", "0", message]],
      metadata: { error: message },
    };
  }
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
}

/**
 * Lightweight XML parser for sitemap entries using regex.
 * Avoids external XML dependencies for a simple sitemap structure.
 */
function parseSitemap(xml: string): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
  const locRegex = /<loc>([\s\S]*?)<\/loc>/;
  const lastmodRegex = /<lastmod>([\s\S]*?)<\/lastmod>/;

  let match: RegExpExecArray | null;
  while ((match = urlBlockRegex.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = locRegex.exec(block);
    const lastmodMatch = lastmodRegex.exec(block);

    if (locMatch) {
      entries.push({
        loc: locMatch[1].trim(),
        lastmod: lastmodMatch ? lastmodMatch[1].trim() : "",
      });
    }
  }

  return entries;
}
