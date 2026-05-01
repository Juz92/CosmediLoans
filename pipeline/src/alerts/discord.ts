import { getDiscordWebhookUrl } from "../config/credentials.js";
import type { AlertSeverity } from "../config/alert-rules.js";

const COLORS: Record<AlertSeverity, number> = {
  CRITICAL: 0xff0000,
  WARNING: 0xff8c00,
  OPPORTUNITY: 0x2ecc71,
};

interface AlertMessage {
  severity: AlertSeverity;
  title: string;
  description: string;
  fields?: { name: string; value: string; inline?: boolean }[];
}

export async function sendDiscordAlert(alert: AlertMessage): Promise<void> {
  const webhookUrl = getDiscordWebhookUrl();

  const embed = {
    title: `${alert.severity} - Fresh Folds`,
    description: alert.title,
    color: COLORS[alert.severity],
    fields: [
      { name: "Details", value: alert.description },
      ...(alert.fields ?? []),
    ],
    timestamp: new Date().toISOString(),
    footer: { text: "SEO Pipeline | freshfolds.com.au" },
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
}

export async function sendDiscordDigest(
  severity: AlertSeverity,
  title: string,
  items: string[]
): Promise<void> {
  const webhookUrl = getDiscordWebhookUrl();
  const description = items.map((item) => `• ${item}`).join("\n");

  const embed = {
    title: `${severity} DIGEST - Fresh Folds`,
    description: title,
    color: COLORS[severity],
    fields: [{ name: "Items", value: description.slice(0, 1024) }],
    timestamp: new Date().toISOString(),
    footer: { text: "SEO Pipeline | freshfolds.com.au" },
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
}
