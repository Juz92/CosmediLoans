import { appendRows } from "../sheets/writer.js";
import { getSiteConfig } from "../config/site.js";
import type { TriggeredAlert } from "./evaluator.js";

/**
 * Log triggered alerts to the alerts Sheet for historical tracking.
 * Each alert becomes a row: [timestamp, severity, ruleId, title, description]
 */
export async function logAlerts(alerts: TriggeredAlert[]): Promise<void> {
  if (alerts.length === 0) return;

  const config = getSiteConfig();
  const rows = alerts.map((a) => [
    new Date().toISOString(),
    a.severity,
    a.ruleId,
    a.title,
    a.description,
  ]);

  const result = await appendRows(config.alertsSheetId, "alert-history", rows);
  console.log(
    `[history] Logged ${result.updatedRows} alert(s) to alert-history sheet`
  );
}
