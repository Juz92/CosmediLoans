# Google OAuth Reauthorization Runbook

The SEO pipeline (GSC, GA4, Sheets, IndexNow/Indexing API) authenticates to Google
with a single OAuth token stored at the repo root: `google-token.json`.

When that token's **refresh token** dies, every Google-dependent step fails with:

```
GaxiosError: invalid_grant
response.data: { error: 'invalid_grant', error_description: 'Bad Request' }
```

This was the state on 2026-06-15 (see `docs/seo-monitor-2026-06-15/collect-search-console.log`
and `gsc-opportunities-28d.log`).

---

## Fast fix (2 minutes)

From the **`pipeline/`** directory:

```bash
npm run auth:google
```

This runs `src/auth/reauthorize-google.ts`, which:

1. Prints a Google consent URL — **open it in your browser**.
2. Starts a local server on `http://localhost:3001`.
3. After you approve, Google redirects to `localhost:3001`, and the script writes a
   fresh `google-token.json` (with a new `refresh_token`) to the repo root.

Scopes requested (so GSC, GA4, Sheets, Indexing, and Business Profile all work):
`webmasters`, `webmasters.readonly`, `analytics.readonly`, `indexing`,
`spreadsheets`, `business.manage`.

### Verify it worked

```bash
npm run gsc:opportunities      # should fetch rows, not throw invalid_grant
npm run collect -- --source=search-console
```

A clean run writes rows to Sheets and exits 0.

---

## Permanent fix (stop it expiring every 7 days)

`invalid_grant` on a refresh token almost always means the Google Cloud **OAuth
consent screen is still in "Testing" publishing status**. Google expires refresh
tokens issued by a Testing-status app after **7 days**, so the pipeline breaks
roughly weekly no matter how often you re-auth.

To stop that:

1. Google Cloud Console → **APIs & Services → OAuth consent screen**.
2. Under **Publishing status**, click **Publish app** (move Testing → In production).
3. If the app only uses your own Google account you can keep the user type as-is;
   you do not need full verification for internal use, but production status stops
   the 7-day refresh-token expiry.

After publishing, run `npm run auth:google` once more to mint a non-expiring
refresh token.

> Other, rarer causes of `invalid_grant`: the token was manually revoked at
> <https://myaccount.google.com/permissions>, the system clock is skewed, or the
> `google-oauth-credentials.json` client was replaced (client_id mismatch). Re-running
> `npm run auth:google` resolves all of these.

---

## Degraded mode (what happens while the token is dead)

The pipeline no longer hard-crashes on a dead token. As of this change
(`src/run.ts`):

- A failed Sheets write is caught. The collected rows are saved to
  `pipeline/degraded/<source>-<timestamp>.json` (git-ignored) so **no data is lost**,
  and the run continues with a clear `[degraded]` warning plus the reauth hint.
- The top-level error handler detects `invalid_grant` and prints the one-line fix
  instead of a raw Gaxios stack dump.

The auth-free signals (uptime, SSL, robots, PageSpeed, content-freshness) can still be
collected; only the Google API steps (GSC, GA4, Sheets, Indexing) need the token.
Until reauth, prioritise off the last good export: `docs/gsc-opportunities-latest.json`.

---

## Required env vars (`pipeline/.env`)

`src/config/site.ts` requires these — reauth does **not** fix a missing env var:

| Var | Purpose |
|---|---|
| `SITE_DOMAIN` | bare domain, e.g. `cosmediloans.com.au` |
| `SITE_URL` | `https://www.cosmediloans.com.au` |
| `GSC_PROPERTY` | `sc-domain:cosmediloans.com.au` |
| `GA4_PROPERTY_ID` | numeric GA4 property id |
| `SHEET_ID` | main reporting spreadsheet id |
| `SHEET_ID_ALERTS` | alerts spreadsheet id |
| `DISCORD_WEBHOOK_URL` | (alerts) Discord webhook |
