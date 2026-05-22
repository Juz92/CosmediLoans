# CosmediLoans Organic SEO + Lead Audit

Date: 2026-05-22
Site: https://www.cosmediloans.com.au
Skills applied: `seo`, `seo-audit`, SEO technical/content/schema/sitemap/performance/geo/SXO passes, `impeccable audit`, and Matt Pocock `grill-me` follow-up.

## Executive Summary

CosmediLoans has a solid technical foundation: clean canonical domain handling, `robots.txt`, `llms.txt`, schema coverage, static rendering, a real sitemap, guide hubs, comparison pages, and Lighthouse scores of 100 for SEO/accessibility on the checked built pages.

The biggest traffic and lead problem at audit time was not basic SEO hygiene. It was that the site was publishing too many location-procedure pages while the lead capture stack was split across two APIs, one of which did not forward leads anywhere. That meant organic users could land on SEO pages, submit a form, and only hit a server log.

Implementation follow-up: the lead capture reliability recommendation was implemented later on 2026-05-22. `/api/leads` is now the shared durable submission path, `/api/submit-lead` delegates to the same handler, and the quote, contact, calculator, FAQ, and newsletter forms all submit through the shared client helper.

Sitemap follow-up: the location-procedure index recommendation was implemented later on 2026-05-22. The indexer now exposes 40 location-procedure URLs: 6 major metro locations x 6 priority procedures, plus 4 GSC-backed exceptions. Other location-procedure pages remain reachable but are marked `noindex` and excluded from the sitemap/static path list.

Completion follow-up: items 1-4 were completed and deployed on 2026-05-22. Lead submissions now include landing page, current page, referrer, UTM, inferred traffic channel, procedure/location context, and downstream sales report fields. FAQPage JSON-LD is restricted to `/faq` by default. Dental and IVF are the two priority authority clusters, with focused internal-link blocks added to their procedure, guide, and topic-hub pages. The production deploy was aliased to `https://www.cosmediloans.com.au`, the live sitemap was re-submitted to GSC with 0 warnings/errors, and IndexNow accepted the 138-URL sitemap.

SEO Health Score: 64/100
Impeccable Technical Score: 14/20, Good with serious conversion reliability risk

## Evidence Snapshot

- Refreshed Search Console range: 2026-04-22 to 2026-05-19.
- GSC result: 1 click, 2,742 impressions, 570+ query/page rows.
- Live sitemap at audit time: 698 URLs, including 600 `/locations/{city}/{procedure}` URLs.
- Local build at audit time: passed, 711 static pages generated, 600 from `/locations/[location]/[procedure]`.
- Post-fix local sitemap: 138 URLs, including 40 `/locations/{city}/{procedure}` URLs.
- Post-fix local build: passed, 151 static pages generated, 40 from `/locations/[location]/[procedure]`.
- Lighthouse on built local site:
  - Home: Performance 91, Accessibility 100, Best Practices 100, SEO 100, LCP 3.5s.
  - `/procedures/dental-loans`: Performance 91, Accessibility 100, SEO 100, LCP 3.5s.
  - `/locations/sydney/dental-loans`: Performance 96, Accessibility 100, SEO 100, LCP 2.7s.
- `npm run lint`: passed.
- `npm run build`: passed.

## P0: Organic Lead Capture Was Not Reliable

The highest-priority lead issue was the split lead API.

At audit time:

- `HeroLeadForm` posted to `/api/submit-lead`, which could send to the sheet webhook and Resend email.
- `InlineLeadForm` posted to `/api/leads`.
- `/api/leads` validated JSON, then only logged and had a TODO to forward to CRM/webhook.
- The calculator email form posted normal form data to `/api/leads`, but `/api/leads` required `application/json`.
- The FAQ question form only marked itself submitted locally and did not send anywhere.

Impact: organic pages and guides use `SeoLeadCaptureBlock`, which uses `InlineLeadForm`. A meaningful share of SEO-intent submissions may not become actual broker leads.

Fix: consolidate all lead forms onto one API path that forwards to the same destination, supports both JSON and form posts where needed, and emits one GA4 conversion event on successful persistence. Treat this as a release blocker before publishing more SEO pages.

Implementation status: fixed. `src/app/api/leads/route.ts` and `src/app/api/submit-lead/route.ts` both delegate to `src/lib/server/lead-submission.ts`. The shared client helper in `src/lib/lead-client.ts` is used by the hero, inline, contact, calculator, FAQ, and newsletter lead forms, and conversion events now fire only after the API succeeds.

## P1: 600 Location-Procedure Pages Are Back In The Sitemap

At audit time, the location indexer was indexing every city/procedure combination:

- `src/lib/location-procedure-indexing.ts:6`
- `src/lib/location-procedure-indexing.ts:17`
- `src/app/sitemap.ts:74`

GSC already shows cannibalization across these pages:

- `dental loan`: 120 impressions split across Sydney dental, Brisbane dental, and the canonical dental procedure page.
- `loans for dental work`: 94 impressions split across the same cluster.
- `dental loans`: 82 impressions split across Brisbane, canonical dental, and Sydney.
- `ivf payment plan`: 53 impressions split across canonical IVF and Melbourne IVF.

Impact: this resembles the doorway/local scale pattern Google warns about when substantially similar city pages funnel users toward the same service. It also dilutes internal signals away from the procedure pages that should become the strongest lead assets.

Fix: reduce indexed location-procedure pages to a defensible set. Recommended short-term cap: 6 major metros x 6 priority procedures = 36 pages, plus any pages with clear GSC traction such as Sunshine Coast facelift. Keep the rest `noindex` and out of sitemap until each has real local data or unique copy.

Implementation status: fixed in `src/lib/location-procedure-indexing.ts`. Current indexed set is 40 paths.

## P1: Current GSC Data Says Build Authority, Not CTR Tweaks

The refreshed GSC pull found no striking-distance or CTR rewrite opportunities because rankings are mostly too low. The strongest landing pages by impressions are still positions 38-90, not positions 4-20.

Recommended focus:

- Build one canonical dental finance cluster around `/procedures/dental-loans`, `/guides/dental-payment-plans-australia`, and selected city pages only.
- Build one IVF payment cluster around `/procedures/ivf-financing` and `/guides/ivf-payment-plans-australia`.
- Strengthen internal links from guide hubs and comparisons into the canonical procedure page with exact descriptive anchors.
- Add verified author `sameAs` links for the founder/author profile. The author schema exists, but no external proof URLs are present: `src/data/authors.ts:10`, `src/data/authors.ts:44`.

## P2: Schema Is Strong But FAQPage Is Overused

Google's current FAQ rich result guidance is limited to authoritative government or health-focused sites, and repetitive FAQ markup should only be marked up once across a site. CosmediLoans is a finance broker-matching site, not a government or health publisher.

Current FAQPage JSON-LD appears on the global FAQ page, comparison pages, guide pages, guide topic pages, and location-procedure pages:

- `src/app/faq/page.tsx:23`
- `src/app/compare/[slug]/page.tsx:105`
- `src/app/guides/[slug]/page.tsx:139`
- `src/app/guides/topics/[slug]/page.tsx:99`
- `src/app/locations/[location]/[procedure]/page.tsx:146`

Fix: keep visible FAQs where they help conversion, but restrict FAQPage JSON-LD to the primary FAQ page and truly unique health/authority-grade pages. Use Article, Breadcrumb, ItemList, FinancialProduct, WebApplication, and Organization schema as the main structured data set.

## P2: LCP Is Acceptable But Not Good Enough For A Lead-Gen Homepage

Built Lighthouse shows strong scores, but LCP is 3.5s on the homepage and dental page. Core Web Vitals "good" is <=2.5s for LCP at the 75th percentile.

Fix:

- Reduce unused JS on homepage/procedure pages by moving non-essential interactive components below the fold or lazy-loading them.
- Review the hero art and above-the-fold image sizing.
- Keep the mobile sticky CTA light; it is conversion-useful and not hurting CLS.

## Impeccable Audit

| Dimension | Score | Finding |
|---|---:|---|
| Accessibility | 4/4 | Lighthouse a11y is 100 on tested pages; labels and focus patterns are mostly sound. |
| Performance | 3/4 | Strong scores, but LCP is 2.7-3.5s and unused JS remains. |
| Theming | 2/4 | Tokens exist, but globals and components still contain hard-coded colors, rgba shadows, hard whites, and repeated gradients. |
| Responsive | 3/4 | Static checks and Lighthouse pass; post-fix indexed location-procedure pages are down to 40 and still need mobile spot checks before further scale. |
| Anti-patterns | 2/4 | The site is credible but visually template-heavy: repeated gradient sections, rounded card grids, white panels, and same CTA bands. |
| Total | 14/20 | Good, but conversion reliability and brand distinctiveness need attention. |

Anti-pattern verdict: not an AI-slop failure, but it still reads too much like a competent generated finance/medical landing-page system. The brand would gain trust from fewer repeated gradient-card blocks and more specific proof: broker credentials, real process screenshots, anonymised lead examples, lender comparison mechanics, and original treatment-cost data.

## Priority Roadmap

1. Done: fix lead capture reliability first. Merge `/api/leads` and `/api/submit-lead` behavior, support calculator form submissions, persist before success states, and fire one conversion event after persistence.
2. Done: cut the sitemap footprint. Noindex and remove most location-procedure URLs until they have defensible local uniqueness.
3. Choose canonical targets per query family. Dental finance should primarily strengthen `/procedures/dental-loans`, not split across every city.
4. Improve the high-intent clusters already deployed. Dental payment plans, IVF payment plans, bad-credit dental finance, and vet bill payment plans should get stronger internal links, expert proof, and original examples.
5. Reduce FAQPage JSON-LD footprint. Keep FAQs visible; avoid broad commercial FAQ schema spam.
6. Bring LCP under 2.5s on homepage and dental page.
7. Make the brand less generic. Replace repeated gradient/card systems with more concrete trust proof and fewer template sections.
8. Add external `sameAs` proof for the founder/author entity.
9. Start off-site authority only after lead capture is reliable: Reddit/AusFinance helpful answers, YouTube explainers, and a small Australian medical finance cost report.

## Sources

- Live homepage: https://www.cosmediloans.com.au/
- Live sitemap: https://www.cosmediloans.com.au/sitemap.xml
- Live robots: https://www.cosmediloans.com.au/robots.txt
- Google FAQ structured data guidance: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Google spam policies, doorway abuse: https://developers.google.com/search/docs/essentials/spam-policies?hl=en
- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds

## Grill-Me Start

Recommended answer to the first strategy question: fix lead capture before creating more SEO pages. More traffic is not useful if a major SEO form path only logs submissions.
