# CosmediLoans — SEO Money Moves (2026-06-24)

**Truth layer:** live GSC, 28 days to 2026-06-21 (`docs/gsc-opportunities-2026-06-24.json`).
**Prior baseline:** 28 days to 2026-05-17 (`docs/gsc-opportunities-latest.json`).
Optimised for **qualified leads**, not raw traffic.

## State of play (live)

| Metric | 28d to May 17 | 28d to Jun 21 | Read |
|---|---:|---:|---|
| Impressions | 2,429 | **4,961** | Demand growing fast (+104%) |
| Clicks | 1 | 2 | Still ~0 CTR — site is buried |
| Avg position (money pages) | ~70–90 | ~37–82 | Some pages climbing toward page 1 |

The constraint is **rankings, not CTR**. Nothing ranks high enough to earn clicks yet, so the work is to push the flagship money pages up — via consolidation, internal-link authority, and unique depth — and to keep the trickle that does arrive converting and compliant.

## Dominant pattern in the live data: hub cannibalises money pages

The `/procedures` hub (816 impr) is competing with the **better-positioned dedicated money pages** for high-intent commercial queries:

| Query | Hub pos | Money page | Money page pos |
|---|---:|---|---:|
| medical loans for surgery australia | 86.1 | /procedures/medical-loan | **48.9** |
| ivf loans australia | 79.1 | /procedures/ivf-financing | **36.2** |
| cosmetic surgery loan | 77.7 | /procedures/cosmetic-surgery-loans | **57.1** |
| medical loans australia | 91.8 | /procedures/medical-loan | **70.6** |

The dedicated pages deserve to win these. The fix is to funnel the hub's authority down to them and strengthen the pages themselves.

## Verified changes shipped this session

| # | Change | Data signal it addresses | Verified |
|---|---|---|---|
| 1 | Pipeline degrades gracefully on dead OAuth token + reauth runbook (`pipeline/REAUTH.md`) | Data spine was dead (invalid_grant) | Live run, exit 0; **reauth now restored** |
| 2 | Added in-depth `contentSections` to `ivf-financing` + `medical-loan` (thin flagships) | Both rank for commercial queries but were thin vs dental-loans | `next build` |
| 2 | Footer: rescued orphaned `medical-loan`, added `cosmetic-surgery-loans` | medical-loan had no inbound authority; both cannibalised by hub | `next build` |
| 3 | YMYL compliance: rate-eligibility + subject-to-approval caveats (all 20 procedure pages, home, calculator); softened absolute approval claims | NCCP/ASIC RG234 risk on money pages | `next build` |
| 3 | CRO: "what happens next / 1 business day" reassurance near forms | No reassurance near the lead form | `next build` |
| 4 | `/procedures` hub "Popular Finance Categories" block linking to dedicated money pages; bumped `LAST_REVIEWED` | Hub cannibalising money pages (live data) | `next build` (168 pages) |

## Next money moves (ranked by expected lead impact)

| # | Move | Why now (live data) | Effort |
|---|---|---|---|
| 1 | **Reauth is done — keep the weekly GSC export running** and re-rank monthly | Spine is the prioritisation engine; it expires if the OAuth app stays in "Testing" — publish it to production | Tiny |
| 2 | **Build authority/backlinks to the 3 flagship money pages** (medical-loan 48.9, ivf-financing 36.2, cosmetic-surgery-loans 57.1) | These are closest to page 1; rankings, not content, are now the ceiling | Ongoing |
| 3 | **Lean into the emerging hair-transplant cluster** | `locations/launceston/hair-transplant-loans` already at **pos 30.5**; "hair transplant financing australia" splits across 3 pages | Medium |
| 4 | **Nurture vet-bill-loans** (553 impr, pos 53, earned a click) | Rising commercial page with proven click | Low |
| 5 | **Add a named medical/finance reviewer** to cosmetic & medical pages | YMYL E-E-A-T gap; helps buried pages climb | Low |
| 6 | **Mobile form-first test** on procedure pages | Form sits below hero copy on mobile (most traffic) | Medium |

> No giant audit dump — these are the moves the live data justifies. Re-run `npx tsx pipeline/src/gsc-opportunities.ts --days=28 --out=docs/gsc-opportunities-<date>.json` weekly and diff against this file.
