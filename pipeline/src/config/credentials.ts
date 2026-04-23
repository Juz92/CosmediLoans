import "dotenv/config";
import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "..", "google-oauth-credentials.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "..", "google-token.json");

let oAuth2Client: InstanceType<typeof google.auth.OAuth2> | null = null;

export async function getAuthClient() {
  if (oAuth2Client) return oAuth2Client;

  const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const creds = raw.installed || raw.web;
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));

  oAuth2Client = new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    "http://localhost:3001"
  );
  oAuth2Client.setCredentials(token);

  oAuth2Client.on("tokens", (newTokens) => {
    const merged = { ...token, ...newTokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
  });

  return oAuth2Client;
}

export function getDiscordWebhookUrl(): string {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) throw new Error("Missing required env var: DISCORD_WEBHOOK_URL");
  return url;
}
