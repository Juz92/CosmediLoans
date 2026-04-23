import { alertRules, type AlertSeverity } from "../config/alert-rules.js";
import { readLastNRows } from "../sheets/reader.js";
import { getSiteConfig } from "../config/site.js";

export interface TriggeredAlert {
  ruleId: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  fields?: { name: string; value: string; inline?: boolean }[];
}

/**
 * Evaluate all alert rules against collected data in Sheets.
 *
 * Checks:
 *  1. Uptime   - consecutive non-200 responses
 *  2. SSL      - certificate expiry within threshold
 *  3. Traffic  - week-over-week session drop
 *  4. PageSpeed - score below threshold
 *  5. Snippet  - opportunities found by analyzer
 *  6. Keyword  - gaps found by analyzer
 */
export async function evaluateAlerts(): Promise<TriggeredAlert[]> {
  const alerts: TriggeredAlert[] = [];
  const config = getSiteConfig();

  // --- 1. Check uptime (last 2 rows for consecutive failures) ---
  try {
    const uptimeRows = await readLastNRows(
      config.sheetId,
      "uptime",
      "A:D",
      alertRules.siteDown.consecutiveFailures
    );
    // Uptime row format: [timestamp, statusCode, responseMs, error]
    if (uptimeRows.length >= alertRules.siteDown.consecutiveFailures) {
      const allFailed = uptimeRows.every(
        (row) => row[1] !== "200" && row[1] !== "301" && row[1] !== "302"
      );
      if (allFailed) {
        const lastStatus = uptimeRows[uptimeRows.length - 1]?.[1] ?? "unknown";
        const lastError = uptimeRows[uptimeRows.length - 1]?.[3] ?? "";
        alerts.push({
          ruleId: alertRules.siteDown.id,
          severity: alertRules.siteDown.severity,
          title: alertRules.siteDown.name,
          description: alertRules.siteDown.description,
          fields: [
            { name: "Last Status", value: lastStatus, inline: true },
            {
              name: "Consecutive Failures",
              value: String(uptimeRows.length),
              inline: true,
            },
            ...(lastError
              ? [{ name: "Error", value: lastError, inline: false }]
              : []),
          ],
        });
      }
    }
  } catch (error) {
    console.warn("[evaluator] Failed to check uptime:", error);
  }

  // --- 2. Check SSL (days until expiry < 7) ---
  try {
    const sslRows = await readLastNRows(
      config.sheetId,
      "ssl-check",
      "A:D",
      1
    );
    // SSL row format: [timestamp, daysUntilExpiry, issuer, validTo]
    if (sslRows.length > 0) {
      const daysUntilExpiry = parseInt(sslRows[0][1] ?? "999", 10);
      if (daysUntilExpiry < alertRules.sslExpiring.daysThreshold) {
        alerts.push({
          ruleId: alertRules.sslExpiring.id,
          severity: alertRules.sslExpiring.severity,
          title: alertRules.sslExpiring.name,
          description: alertRules.sslExpiring.description,
          fields: [
            {
              name: "Days Until Expiry",
              value: String(daysUntilExpiry),
              inline: true,
            },
            {
              name: "Valid To",
              value: sslRows[0][3] ?? "unknown",
              inline: true,
            },
          ],
        });
      }
    }
  } catch (error) {
    console.warn("[evaluator] Failed to check SSL:", error);
  }

  // --- 3. Check traffic (compare this week vs last week) ---
  try {
    const trafficRows = await readLastNRows(
      config.sheetId,
      "ga4",
      "A:C",
      14
    );
    // GA4 row format: [timestamp, sessions, ...]
    if (trafficRows.length >= 14) {
      const lastWeek = trafficRows.slice(0, 7);
      const thisWeek = trafficRows.slice(7, 14);

      const sumSessions = (rows: string[][]) =>
        rows.reduce((acc, row) => acc + parseInt(row[1] ?? "0", 10), 0);

      const lastWeekSessions = sumSessions(lastWeek);
      const thisWeekSessions = sumSessions(thisWeek);

      if (lastWeekSessions > 0) {
        const dropPercent =
          ((lastWeekSessions - thisWeekSessions) / lastWeekSessions) * 100;

        if (dropPercent >= alertRules.trafficDrop.dropPercent) {
          alerts.push({
            ruleId: alertRules.trafficDrop.id,
            severity: alertRules.trafficDrop.severity,
            title: alertRules.trafficDrop.name,
            description: alertRules.trafficDrop.description,
            fields: [
              {
                name: "This Week",
                value: String(thisWeekSessions),
                inline: true,
              },
              {
                name: "Last Week",
                value: String(lastWeekSessions),
                inline: true,
              },
              {
                name: "Drop",
                value: `${dropPercent.toFixed(1)}%`,
                inline: true,
              },
            ],
          });
        }
      }
    }
  } catch (error) {
    console.warn("[evaluator] Failed to check traffic:", error);
  }

  // --- 4. Check PageSpeed (score < threshold) ---
  try {
    const psRows = await readLastNRows(
      config.sheetId,
      "pagespeed",
      "A:D",
      1
    );
    // PageSpeed row format: [timestamp, score, fcp, lcp]
    if (psRows.length > 0) {
      const score = parseInt(psRows[0][1] ?? "100", 10);
      if (score < alertRules.pageSpeedLow.scoreThreshold) {
        alerts.push({
          ruleId: alertRules.pageSpeedLow.id,
          severity: alertRules.pageSpeedLow.severity,
          title: alertRules.pageSpeedLow.name,
          description: alertRules.pageSpeedLow.description,
          fields: [
            { name: "Score", value: String(score), inline: true },
            {
              name: "Threshold",
              value: String(alertRules.pageSpeedLow.scoreThreshold),
              inline: true,
            },
          ],
        });
      }
    }
  } catch (error) {
    console.warn("[evaluator] Failed to check PageSpeed:", error);
  }

  // --- 5. Check snippet opportunities ---
  try {
    const snippetRows = await readLastNRows(
      config.sheetId,
      "snippet-opportunities",
      "A:F",
      50
    );
    // Snippet row format: [timestamp, query, position, ctr, impressions, page]
    const recentSnippets = snippetRows.filter((row) => {
      const ts = new Date(row[0] ?? "");
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return ts > oneDayAgo;
    });

    if (recentSnippets.length > 0) {
      alerts.push({
        ruleId: alertRules.snippetOpportunity.id,
        severity: alertRules.snippetOpportunity.severity,
        title: alertRules.snippetOpportunity.name,
        description: `${recentSnippets.length} queries ranking top-5 with low CTR`,
        fields: recentSnippets.slice(0, 5).map((row) => ({
          name: row[1] ?? "unknown",
          value: `Pos ${row[2]} | CTR ${row[3]}% | ${row[4]} impr`,
          inline: false,
        })),
      });
    }
  } catch (error) {
    console.warn("[evaluator] Failed to check snippet opportunities:", error);
  }

  // --- 6. Check keyword gaps ---
  try {
    const gapRows = await readLastNRows(
      config.sheetId,
      "keyword-gaps",
      "A:G",
      50
    );
    // Gap row format: [timestamp, query, impressions, clicks, ctr, position, page]
    const recentGaps = gapRows.filter((row) => {
      const ts = new Date(row[0] ?? "");
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return ts > oneDayAgo;
    });

    if (recentGaps.length > 0) {
      alerts.push({
        ruleId: alertRules.keywordGap.id,
        severity: alertRules.keywordGap.severity,
        title: alertRules.keywordGap.name,
        description: `${recentGaps.length} high-impression queries with CTR below ${alertRules.keywordGap.maxCtr}%`,
        fields: recentGaps.slice(0, 5).map((row) => ({
          name: row[1] ?? "unknown",
          value: `${row[2]} impr | ${row[3]} clicks | CTR ${row[4]}%`,
          inline: false,
        })),
      });
    }
  } catch (error) {
    console.warn("[evaluator] Failed to check keyword gaps:", error);
  }

  console.log(`[evaluator] ${alerts.length} alerts triggered`);
  return alerts;
}
