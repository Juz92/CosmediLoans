import { createServer } from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..", "..", "..");

const CREDENTIALS_PATH = path.join(ROOT_DIR, "google-oauth-credentials.json");
const TOKEN_PATH = path.join(ROOT_DIR, "google-token.json");
const REDIRECT_URI = "http://localhost:3001";

const DEFAULT_SCOPES = [
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/indexing",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/business.manage",
];

function readOAuthClient() {
  const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const creds = raw.installed || raw.web;
  if (!creds?.client_id || !creds?.client_secret) {
    throw new Error(`Invalid OAuth credentials at ${CREDENTIALS_PATH}`);
  }

  return new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    REDIRECT_URI
  );
}

function readExistingScopes() {
  if (!fs.existsSync(TOKEN_PATH)) return DEFAULT_SCOPES;

  try {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    const scopes = String(token.scope ?? "")
      .split(/\s+/)
      .map((scope) => scope.trim())
      .filter(Boolean);
    return scopes.length > 0 ? Array.from(new Set([...DEFAULT_SCOPES, ...scopes])) : DEFAULT_SCOPES;
  } catch {
    return DEFAULT_SCOPES;
  }
}

async function main() {
  const client = readOAuthClient();
  const scopes = readExistingScopes();
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent select_account",
    scope: scopes,
  });

  console.log("Google OAuth reauthorization");
  console.log("");
  console.log("1. Open this URL in your browser:");
  console.log(authUrl);
  console.log("");
  console.log("2. Approve access. This script will save google-token.json after Google redirects to localhost:3001.");

  const server = createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url ?? "/", REDIRECT_URI);
      const code = requestUrl.searchParams.get("code");
      const error = requestUrl.searchParams.get("error");

      if (error) {
        throw new Error(`Google OAuth returned error: ${error}`);
      }

      if (!code) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Waiting for Google OAuth callback...");
        return;
      }

      const { tokens } = await client.getToken(code);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Google authorization complete. You can return to Codex.");

      console.log("");
      console.log(`Saved refreshed token to ${TOKEN_PATH}`);
      server.close();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(message);
      console.error(message);
      server.close();
      process.exitCode = 1;
    }
  });

  server.listen(3001, () => {
    console.log("");
    console.log("Listening on http://localhost:3001 ...");
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
