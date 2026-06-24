# CosmediLoans — Follow-up Checklist (after 2026-06-24 SEO session)

Open items that need either a deploy, your action, or off-repo work. The code
changes from this session live on branch `seo/money-moves-2026-06-24`
(PR: https://github.com/Juz92/CosmediLoans/pull/new/seo/money-moves-2026-06-24).

## Operational (do soon — keeps the data spine alive)

- [ ] **Publish the Google OAuth app to production.** Google Cloud Console →
      APIs & Services → OAuth consent screen → **Publish app** (Testing → In
      production). Otherwise the pipeline refresh token dies again in ~7 days.
      Then run `cd pipeline && npm run auth:google` once. See `pipeline/REAUTH.md`.

## After the branch is deployed (Vercel)

- [ ] **Re-submit the sitemap** in GSC (Sitemaps → re-enter
      `https://www.cosmediloans.com.au/sitemap.xml`) so Google re-reads the
      updated `lastmod` dates. *(Done once on 2026-06-24, but the new content
      only goes live on deploy.)*
- [ ] **Request indexing** for the deepened money pages via GSC URL Inspection
      (limit ~10/day): `/procedures/ivf-financing`, `/procedures/cosmetic-surgery-loans`,
      `/procedures/hair-transplant-loans`, `/procedures` hub.
      *(dental-loans + medical-loan were already requested 2026-06-24.)*
- [ ] **GA4 key event:** once the first `lead_form_submission` is collected,
      GA4 → Admin → Events → Key events → click the star next to
      `lead_form_submission`. It can't be starred until it's been received once
      (no traffic yet; this GA4 build has no create-by-name option). The code
      fires exactly this event name (`src/lib/lead-client.ts`).
- [ ] **Verify in GA4 Realtime** that `lead_form_submission` actually arrives,
      and decide whether `qualify_lead` / `close_convert_lead` are fed from a CRM.

## Off-repo — the real ranking lever

- [ ] **Backlinks / citations / digital PR** to the three flagship money pages
      (`/procedures/medical-loan` pos ~49, `/procedures/ivf-financing` pos ~36,
      `/procedures/cosmetic-surgery-loans` pos ~57). The site is buried because
      it's young and low-authority — on-page is now solid; authority is the gap.
- [ ] **Named E-E-A-T reviewer** for cosmetic/medical pages — provide a real
      name + credential and it gets wired into `src/data/trust.ts` + templates.

## Recurring

- [ ] **Weekly:** `npx tsx pipeline/src/gsc-opportunities.ts --days=28 --out=docs/gsc-opportunities-<date>.json`
      and diff against `docs/2026-06-24-seo-money-moves.md` to catch new
      striking-distance pages or cannibalization shifts.
