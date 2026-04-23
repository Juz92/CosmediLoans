import * as crypto from "crypto";
import type { CollectorResult } from "./types.js";
import { getSiteConfig } from "../config/site.js";

/**
 * Robots.txt monitor: fetches /robots.txt, hashes the content,
 * and compares against the last known hash (stored in metadata).
 * Row format: [timestamp, changed, hash, content_preview]
 */

let lastKnownHash: string | null = null;

export async function collectRobotsMonitor(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();

  try {
    const robotsUrl = `${config.url}/robots.txt`;
    const response = await fetch(robotsUrl, {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();
    const hash = crypto.createHash("sha256").update(content).digest("hex");

    const changed = lastKnownHash !== null && lastKnownHash !== hash;
    const previousHash = lastKnownHash;
    lastKnownHash = hash;

    // Truncate content preview to first 200 chars for the row
    const preview = content.replace(/\n/g, " ").slice(0, 200);

    return {
      source: "robots-monitor",
      timestamp,
      rows: [
        [timestamp, String(changed), hash, preview],
      ],
      metadata: {
        previousHash,
        currentHash: hash,
        contentLength: content.length,
        changed,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "robots-monitor",
      timestamp,
      rows: [[timestamp, "error", "", message]],
      metadata: { error: message },
    };
  }
}

/**
 * Allows external callers (e.g. persistence layer) to set
 * the last known hash on startup.
 */
export function setLastKnownHash(hash: string | null): void {
  lastKnownHash = hash;
}
