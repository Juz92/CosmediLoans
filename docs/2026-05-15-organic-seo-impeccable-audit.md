# CosmediLoans Organic Growth + Impeccable Audit

Date: 2026-05-15  
Site: https://www.cosmediloans.com.au  
Scope: SEO, technical UX quality, crawl/indexation, on-page CTR opportunities, and organic lead growth.

## API Status

Search Console and GA4 API access is currently blocked by the saved OAuth token.

- `google-token.json` expired at `2026-04-24T00:11:39.716Z`.
- Refresh failed with Google OAuth `invalid_grant`.
- Token scopes include Search Console, Analytics, Indexing, Sheets, and Business Profile, so the intended API access exists but must be re-authorized.
- PageSpeed Insights API returned daily quota exceeded, so performance evidence below comes from Lighthouse CLI instead.

This means the audit could not pull current Search Console clicks, impressions, CTR, or average positions. Recommendations below are based on live crawl, Lighthouse, local source audit, and known organic-growth mechanics. Once OAuth is refreshed, rerun a GSC query-level and page-level analysis before prioritizing title changes.

## Verification Summary

- `npm run lint`: passed, no warnings.
- `npm run build`: passed, 693 static pages generated.
- Live sitemap: 500 indexable URLs.
- Live sitemap location-procedure URLs: 420.
- Live crawled pages had valid canonical URLs on `www.cosmediloans.com.au`.
- Procedure pages now emit `FinancialProduct`, not `MedicalProcedure`.
- Location-procedure pages suppress repeated FAQ schema with `emitSchema={false}`.
- Brand typo/domain issues from the April audit appear fixed in active source and live pages.

## Impeccable Audit Score

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 3/4 | Lighthouse homepage 100, dental page 90. Dental page fails contrast, color-only link distinction, and an unlabeled select in the inline form. |
| Performance | 3/4 | Lighthouse mobile: homepage 92, dental 98. Homepage LCP is 3.4s, with image delivery and unused JS savings. |
| Responsive Design | 3/4 | Mobile Lighthouse passed viewport/tap basics. Build and live render are stable, but 693 SSG pages and card-heavy templates need careful mobile QA before expansion. |
| Theming | 2/4 | Design tokens exist, but global CSS still uses hard-coded hex colors and the system has many gradient sections/cards. |
| Anti-Patterns | 2/4 | The site no longer has the worst AI-pattern issues, but repeated gradient/card sections and 420 location-procedure templates still feel template-driven. |
| Total | 13/20 | Acceptable, with strong SEO foundations but material a11y, content-scale, and indexing risks. |

## Highest-Impact SEO Findings

### P1: Too Many Near-Duplicate Location-Procedure URLs Remain Indexable

Evidence:
- Build output generated `/locations/[location]/[procedure]` with 600 paths.
- Live sitemap includes 420 location-procedure URLs.
- `src/lib/location-procedure-indexing.ts` indexes 14 procedures across all 30 locations.
- Rendered text similarity remains high across same-procedure city variants:
  - Sydney dental vs Melbourne dental: 0.842 five-word shingle similarity.
  - Sydney dental vs Brisbane dental: 0.848.
  - Sydney IVF vs Melbourne IVF: 0.843.

Impact:
Google may treat these as scaled, low-uniqueness doorway/local pages. This can suppress the very pages that should drive leads: dental, IVF, cosmetic and comparison pages.

Fix:
Reduce indexed location-procedure pages to a defensible set, such as 6 major metros x 6-8 highest-value procedures, or add real local content per city/procedure before indexing. Keep the rest noindexed and out of the sitemap.

Primary files:
- `src/lib/location-procedure-indexing.ts`
- `src/app/sitemap.ts`
- `src/app/locations/[location]/[procedure]/page.tsx`

### P1: Search Console/GA4 Pipeline Cannot Produce Current Growth Opportunities

Evidence:
- OAuth refresh returns `invalid_grant`.
- `.env.local` does not include `SITE_URL`, `GSC_PROPERTY`, `GA4_PROPERTY_ID`, `SHEET_ID`, or `SHEET_ID_ALERTS`, so pipeline commands cannot run from local env as-is.
- The Search Console collector only fetches query-level rows for the last 7 days, not query + page rows, comparison windows, or landing-page performance.

Impact:
You cannot reliably identify the pages with high impressions, low CTR, position 4-20, decaying clicks, or cannibalized query/page combinations. Those are the most direct levers for position, impressions and clicks.

Fix:
Re-authorize OAuth, populate the pipeline env vars, then extend the GSC collector to pull:
- 28-day and previous-28-day query + page data.
- Query opportunities where position is 4-20 and impressions are rising.
- CTR opportunities where position is 1-8 and CTR under expected CTR.
- Page opportunities grouped by landing page, clicks, impressions, CTR, and average position.
- Cannibalization where one query maps to multiple URLs.

### P1: Location and Calculator Meta Descriptions Are Too Long for CTR Control

Evidence from live crawl:
- `/locations/sydney/dental-loans`: 170 characters.
- `/locations/sydney/debt-consolidation`: 180 characters.
- `/calculator`: 179 characters.

Impact:
Google will likely rewrite or truncate these, weakening control over the click promise. For lead generation, the snippet should state the outcome and safety promise quickly.

Fix:
Target 145-155 characters on templates. Example location pattern:
`Compare {procedure} finance in {city}. Check broker-matched rates from 20+ lenders with a soft-credit inquiry and no obligation.`

Primary files:
- `src/app/locations/[location]/[procedure]/page.tsx`
- `src/app/calculator/page.tsx`

### P1: Dental Procedure Page Has Accessibility Regressions

Evidence:
Lighthouse on `/procedures/dental-loans` scored accessibility 90 and flagged:
- Contrast failure: `No impact to your credit score · Takes 60 seconds` in `InlineLeadForm`.
- Link in text block relies on color: `Use our calculator`.
- Select has no associated label in `InlineLeadForm`.

Impact:
This is a WCAG AA issue and also affects the lead form, which is the core conversion path.

Fix:
Add a visible or screen-reader label to the inline procedure select, darken the reassurance line color, and underline text links by default inside content blocks.

Primary files:
- `src/components/lead-capture/InlineLeadForm.tsx`
- `src/components/ui/Select.tsx`
- `src/app/procedures/[slug]/page.tsx`

### P2: Homepage LCP Is Borderline

Evidence:
Lighthouse mobile homepage:
- Performance 92.
- LCP 3.4s.
- FCP 1.2s.
- TBT 10ms.
- CLS 0.
- Image delivery savings: 86 KiB.
- Unused JavaScript savings: 31 KiB.

Impact:
LCP over 2.5s can hold back Core Web Vitals if field data matches lab data. The homepage is a broad organic and brand entry page, so it should be safely under 2.5s on mobile.

Fix:
Optimize the hero art/background images, ensure the LCP asset is appropriately sized and preloaded if above the fold, and remove unused client JS from the homepage where practical.

Primary files:
- `src/components/content/HomeHero.tsx`
- `public/Images/hero-art.webp`
- homepage imported client components.

### P2: Topical Authority Is Still Thin

Evidence:
- Only 2 blog posts are present.
- Core procedure pages are solid, but the site still lacks enough supporting articles/tools for dental, IVF, cosmetic, LASIK, vet, and debt-consolidation clusters.
- Author schema exists, which is good, but `sameAs` is empty for the author profile.

Impact:
The site has good landing pages but limited supporting authority. This restricts impressions for informational and mid-funnel terms that can later convert into procedure-finance leads.

Fix:
Publish supporting content in clusters:
- Dental implants cost and payment plan guides.
- IVF cost and Medicare rebate guides by state.
- Cosmetic surgery loan vs BNPL and credit card pages.
- Early super release for medical treatment.
- Vet emergency bill financing.
- Credit-score requirements for medical loans.

Add verified `sameAs` links for the named author where available.

### P2: Design System Still Relies on Hard-Coded Colors and Repeated Gradients

Evidence:
- `tailwind.config.ts` defines tokens.
- `src/app/globals.css` still contains multiple hard-coded hex and rgba values in hero classes.
- Many page templates use repeated `bg-gradient-to-*` patterns.

Impact:
The brand is coherent, but pages can start to feel generic and template-made. This matters for trust in a sensitive finance/medical category.

Fix:
Move the remaining hard-coded hero styles into tokens or scoped component classes, reduce repeated gradient sections, and reserve the strongest color treatments for conversion-critical or finance-summary moments.

## Positive Findings

- Canonical domain and brand consistency are now clean in active source.
- Sitemap no longer includes all 600 location-procedure URLs, only the currently indexed subset.
- Procedure schema moved to `FinancialProduct`, which better matches the business.
- FAQ schema duplication on location-procedure pages is fixed.
- Robots.txt includes crawler controls and keeps `/apply`, `/thank-you`, and `/api/` out of crawl.
- Procedure pages have AEO-style definition blocks and `Last reviewed` treatment.
- Author `Person` schema exists for blog Article schema.
- Lighthouse SEO score was 100 on homepage and dental page.

## Organic Growth Priority Order

1. Restore Search Console and GA4 API access. Without this, CTR/title work is guessing.
2. Reduce the location-procedure sitemap footprint or make those pages genuinely local.
3. Pull query + page GSC data for last 28 days vs previous 28 days.
4. Prioritize pages with position 4-20 and rising impressions for content expansion/internal links.
5. Prioritize pages with position 1-8 and weak CTR for title/meta rewrites.
6. Fix the dental page lead-form accessibility issues.
7. Optimize homepage LCP under 2.5s on mobile.
8. Publish cluster content around dental, IVF, cosmetic, vet and medical-loan affordability.
9. Add stronger internal links from posts/comparison pages into procedure pages using descriptive anchors.
10. Add verified author `sameAs` links and refresh dates as content changes.

## Data Needed After OAuth Refresh

Pull these from Search Console before making final CTR/page-position edits:

- Queries by page for the last 28 days and previous 28 days.
- Query, page, clicks, impressions, CTR, position.
- Device split, especially mobile.
- Country filter: Australia.
- Branded vs non-branded queries.
- Top pages with impressions but zero clicks.
- Pages with average position 4-20 and impressions above threshold.
- Pages where average position improved but CTR fell.
- Queries appearing across multiple landing pages.

