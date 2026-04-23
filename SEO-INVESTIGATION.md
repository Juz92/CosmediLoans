# CosmediLoans — Deep Organic-Traffic Investigation

**Date:** 2026-04-23
**Scope:** SEO + AEO + GEO opportunity assessment for cosmediloans.com.au
**Skills applied:** `seo`, `ai-seo`, `seo-geo`, `seo-pipeline`, `marketing-ideas`, `karpathy-guidelines`
**Repo commit at time of audit:** `504ae20`

---

## 1. Executive Summary

CosmediLoans is structurally well-built for a Next.js lead-gen site — server-rendered App Router pages, programmatic routes, JSON-LD on most templates, a sitemap, `llms.txt`, a calculator, comparison pages, and a procedure taxonomy. The foundation is there.

But organic upside is currently **capped by four preventable failures**, each of which is cheaper to fix than it is to live with:

| # | Failure | Traffic cost | Fix effort |
|---|---------|--------------|------------|
| 1 | **Typo'd canonical domain** (`cosmedloans.com.au`) and **three brand spellings** (CosmediLoans / CosmodiLoans / cosmedloans) shipped in schema, metadata, and copy | Entity confusion — Google + LLMs can't establish a single brand entity. Kills AI citations and brand SERP. | 2 hours |
| 2 | **600 near-duplicate location×procedure pages** (30 cities × 20 procedures) with no city-specific content | Triggers thin-content filter + cannibalisation. Quality-gate HARD STOP per `seo` skill. | Strategic: either kill 510 of them, or inject genuine local content |
| 3 | **Duplicate `FAQPage` JSON-LD across 600+ pages** (same FAQs emitted per city) | Violates Google FAQPage guidance; risks schema being ignored or penalising AI trust. | 4 hours |
| 4 | **Thin content engine** — 2 blog posts total, no author bylines, no Person schema, no original data | No E-E-A-T signal, nothing citable for Perplexity/ChatGPT/AI Overviews. Princeton GEO study: citations + stats = +40% AI visibility. | Weeks, but each post is high-leverage |

**If we fix (1)–(3) in a week and ship a content/authorship programme over 90 days, realistic organic upside is 3–5× baseline traffic** by month 6, anchored by: dental-cost queries (huge volume, clinic-dominated SERPs with weak patient-finance angle), AI citations in cosmetic-finance comparison queries (where 47% of AIO citations come from pos 6-10), and bottom-funnel city+procedure pages done right.

**Current SEO Health Score: 54 / 100** — broken by brand-consistency and thin-content penalties that mask genuinely strong on-page structure.

---

## 2. Current State — Site Map

| Route | Count | SSR | JSON-LD | Unique copy per page | AEO-ready |
|-------|-------|-----|---------|----------------------|-----------|
| `/` | 1 | ✅ | Organization + WebSite | ✅ | ⚠️ No definition block in first 60 words |
| `/procedures/[slug]` | 20 | ✅ | MedicalProcedure + FAQPage + Breadcrumb | ✅ | ✅ Featured-snippet box exists |
| `/compare` + `/compare/[slug]` | ~10+ | ✅ | Article + FAQPage | ✅ | ✅ Structured tables — strongest asset |
| `/locations/[location]` | 30 | ✅ | FinancialService | ⚠️ Hero + procedure grid, ~0% unique per city | ❌ |
| `/locations/[location]/[procedure]` | **600** | ✅ | FinancialService + shared FAQPage | ❌ Identical content, only city name swapped | ❌ |
| `/blog/[slug]` | **2** | ✅ | Article | ✅ | ⚠️ Author = Organization (no Person) |
| `/calculator`, `/how-it-works`, `/about`, `/faq`, `/contact`, `/apply`, `/thank-you` | 7 | ✅ | Mixed | ✅ | Mixed |

**Total indexable URLs:** ~670, of which ~540 are at thin-content risk.

---

## 3. Critical Blockers (ship within 7 days)

### 3.1 Domain + Brand Consistency — 🛑 CRITICAL

Three spellings of the brand ship simultaneously:

| Correct | Wrong — in code | Impact |
|---------|-----------------|--------|
| `cosmediloans.com.au` | `cosmedloans.com.au` — `src/app/api/leads/route.ts:36-37`, `src/app/blog/[slug]/page.tsx:82,84`, `src/app/blog/rss.xml/route.ts:3`, `src/app/calculator/page.tsx:99`, `src/app/compare/page.tsx:60`, `src/app/compare/[slug]/page.tsx:78`, `src/app/locations/[location]/page.tsx:14`, `src/app/locations/[location]/[procedure]/page.tsx:13`, `src/app/procedures/[slug]/page.tsx:114` | Schema references a domain that doesn't resolve — breaks entity linking |
| "CosmediLoans" | "CosmodiLoans" — both location page files, some schema `name` fields | Knowledge Graph can't disambiguate. Fatal for AI citation — LLMs won't reliably emit your brand name. |
| `www.cosmediloans.com.au` (metadataBase) | `cosmediloans.com.au` (Organization schema url in `page.tsx:150`) | Mixed www vs apex — split signals |

**Fix:** Single `SITE_URL` constant imported everywhere. Single brand spelling via a `BRAND = "CosmediLoans"` constant. One canonical (apex *or* www — pick one, redirect the other).

Also: `public/llms.txt` line 29 — `Email: hello@qldcarbrokers.com.au` belongs to the QLD Car Brokers business, not CosmediLoans. LLMs will attribute CosmediLoans to the wrong contact.

### 3.2 Thin Location+Procedure Pages — 🛑 HARD STOP

`src/app/locations/[location]/[procedure]/page.tsx` emits 600 URLs. Each page's body content is **bytes-identical** except for city name substitution. The `seo` skill's quality gate is explicit:

> 🛑 HARD STOP at 50+ location pages (require user justification)
> Enforce 60%+ unique content per location page.

**Three options, ranked:**

1. **Recommended — Collapse to state pages (8 URLs).** Replace 30 city pages with 8 state pages (NSW, VIC, QLD, WA, SA, TAS, ACT, NT) that contain genuinely useful state-specific information: state health insurance rebate specifics, major hospital networks, typical procedure price ranges for the state, list of top cities served. Retain `locations/[city]/[procedure]` only for the 6 major metros (Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast) × top 8 procedures = 48 pages — each backed by a uniquely-written 400+ word city+procedure paragraph.
2. **Keep all 30 but inject per-city data.** Build a `cityData` table: avg procedure cost in that city, top 3 clinics (no endorsement — just "commonly cited" list), state-specific health insurance notes, local "how to finance in {city}" paragraph. Minimum 250 words of unique copy per page. Expensive to author (30 × 20 = 600 unique blocks) — consider LLM-assisted drafting from verifiable data sources.
3. **Noindex the 600 location+procedure pages, keep only city pages.** Cleanest short-term option while you decide content strategy.

Until resolved, set `robots: { index: false }` on `/locations/[location]/[procedure]` in `generateMetadata` to prevent Google from filing the whole site under "thin content" and suppressing the healthy pages too.

### 3.3 Duplicate FAQPage Schema — 🛑 CRITICAL

`ProcedureFAQ` → `FAQAccordion` emits `FAQPage` JSON-LD. It's rendered on:
- 20 procedure pages (unique FAQs — OK)
- 600 location×procedure pages with **identical FAQs** duplicated 30× per procedure

Google's FAQPage policy (Sept 2023 update): FAQPage rich results are restricted to government/health sites; duplicate FAQPage across many URLs is treated as spam signal. Even if it doesn't trigger a manual action, it dilutes what IS useful.

**Fix:** Emit `FAQPage` schema only on `/procedures/[slug]` and `/faq`. On location pages, either omit the FAQ section entirely or render it as visible text without the JSON-LD.

### 3.4 Wrong Schema Type on Procedure Pages

`src/app/procedures/[slug]/page.tsx:110` declares `@type": "MedicalProcedure"`. You do not perform the procedure — you finance it. `MedicalProcedure` schema is for healthcare providers. Google may ignore it; worse, it can trigger misleading-content review.

**Fix:** Replace with `FinancialProduct` + nested `Service`. Keep the price `AggregateOffer` but scope it to `FinancialProduct.offers`, not to a fictional medical procedure.

---

## 4. High-Impact Opportunities (30 days)

### 4.1 AEO / GEO — The Biggest Untapped Lever

The `seo-geo` skill's Dec 2025 data: **brand mentions correlate 3× more strongly with AI visibility than backlinks**. Only 11% of domains get cited by both ChatGPT and AI Overviews for the same query — platform-specific optimisation is essential.

**Quick wins, all under 1 day of work each:**

1. **Add 40–60 word definition block at the top of every procedure page.** Current hero jumps straight to marketing copy. LLMs extract the first self-contained paragraph. Pattern:
   > "{Procedure} financing in Australia is a broker-matched personal loan used to cover the cost of {procedure}, typically ranging {cost range} with rates from {rate}% p.a. over terms up to 7 years. Borrowers compare 20+ lender offers through a single soft-credit application."

2. **Switch to optimal passage length.** Princeton/GEO research: 134–167 word self-contained passages get cited most. Current procedure `financingDescription` is ~60 words — too short. Target 150 words, lead with a direct answer, end with a cite-worthy stat.

3. **Add `dateModified` + `datePublished` to every page.** Currently only blog posts have dates. AI search weights recency heavily — undated pages lose. Add a "Last reviewed: {date}" line in visible copy + `dateModified` in schema on every procedure, comparison, and location page.

4. **Add `Person` schema with credentials for content authors.** Blog Article schema author is currently `Organization`. AI search heavily favours Person-authored content. Create 1–2 named author profiles (even if it's the founder) with credentials (e.g., "Licensed broker, AFCA member"), LinkedIn `sameAs`, and `jobTitle`. Apply to all blog posts.

5. **Author comparison-page differences as quotable lines.** Comparison pages are CosmediLoans' single strongest AEO asset — structured, balanced, citation-friendly format. But the verdict paragraphs read as marketing, not as citable facts. Rewrite each verdict to lead with an extractable 2-sentence claim (e.g., *"Afterpay's $2,000 cap makes it unsuitable for procedures over $2,000, where broker-matched personal loans at 6.99–12% p.a. are typically cheaper over 3+ years. CosmediLoans compares 20+ lenders versus Afterpay's single fixed-term product."*)

6. **Ship `dateModified` in `sitemap.ts` per page, not `now` for all.** Currently every URL reports the same `lastModified = now`. Google-Extended and GPTBot both use this. True per-page dates cause freshness re-crawls on updated pages only.

### 4.2 Expand robots.txt + AI Crawler Allowlist (10 minutes)

Current robots.txt is a wildcard allow. Better: explicitly allow AI bots you want to cite you and crawl-delay the ones you don't.

```ts
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
    "anthropic-ai",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/thank-you", "/apply", "/api/"] },
      ...aiBots.map((bot) => ({ userAgent: bot, allow: "/" })),
      { userAgent: "CCBot", disallow: "/" }, // common crawl — training only, low citation value
    ],
    sitemap: "https://www.cosmediloans.com.au/sitemap.xml",
  };
}
```

Explicit allow entries outrank wildcard and signal intent to AI-bot operators logging their compliance.

### 4.3 Upgrade `llms.txt`

Current file is functional but shallow. The emerging `llms.txt` spec expects:

- Correct contact (fix `hello@qldcarbrokers.com.au`)
- Key facts that AI can quote directly (e.g., "Broker network: 20+ lenders", "Regulator: ACL holders under NCCP Act 2009", "ABN: 14 693 894 558", "Service area: All Australian states and territories")
- Structured `## Procedures` section linking to each procedure page with 1-line description
- RSL 1.0 licensing statement (Dec 2025 standard backed by Cloudflare/Reddit/Yahoo)

### 4.4 Internal Linking — Build Topic Clusters

Currently the site is a hub-and-spoke (homepage → procedures) with almost no cross-cluster linking. Missing:

- Blog → procedure pages (blog posts already reference procedures in copy but don't internal-link to them with keyword anchors)
- Procedure → related blog posts (`blogCategory` exists in procedures data, but `/procedures/[slug]` doesn't query and surface matching blog posts)
- Comparison → procedure (each comparison already has `relatedProcedureSlugs` but the page doesn't render those links prominently — verify)
- Location → blog (state-level posts like "Financing Dental Implants in NSW" would anchor location pages with unique content)

Cluster template: for each procedure slug, ensure there are 3+ pages linking IN to it with keyword anchors (not just "learn more"). Build a `/data/internal-links.ts` map that each template consumes.

---

## 5. Content Strategy — The Biggest Long-Term Gap

**Current blog:** 2 posts. Both ~1000 words. Both reasonably well-structured but lack:
- Named authors with credentials
- Primary data or original surveys
- Expert quotes
- Dated "last updated" stamps
- Internal links to product pages with keyword anchors

Per `marketing-ideas` skill, the highest-ROI plays for a lead-gen finance site at this stage:

### 5.1 Engineering as Marketing — Ship 2 More Free Tools

You already have a Calculator (✅). Three more tools would each earn their own keyword cluster and be highly citable by AI:

1. **Dental Treatment Cost Estimator** — input procedure + state → cost range, insurance rebate estimate, monthly repayment. Targets "how much does X cost" queries (huge volume, currently dominated by clinics). *Citation-bait for ChatGPT/Perplexity.*
2. **IVF Funding Options Planner** — Medicare Safety Net estimate + out-of-pocket + financing split. Highly cited because IVF data is scattered and hard to aggregate.
3. **Medical Loan Affordability Calculator** — disposable income → safe max loan amount. Ranks for "how much medical loan can I afford".

Each tool = a canonical URL, a useful embeddable widget, a piece of original data (aggregated queries become a proprietary dataset within a year), and a citable reference.

### 5.2 Original Research — The Single Highest-Value Move

AI search cites statistics with sources (+37% visibility boost per Princeton GEO). You have a unique vantage: **applications by procedure × state**. Once you have 500+ applications, publish an annual report:

> *"The 2026 Australian Medical Financing Report: What Australians Borrow for Their Bodies"* — aggregated anonymous data on loan sizes, top procedures by state, approval rates, avg interest rates. Pitch to AFR, News.com.au, SMH, Women's Health, Mamamia.

One PR-grade report, done well, generates:
- Direct organic traffic to the report page
- 20–50 high-quality backlinks from news sites and industry blogs
- AI citations for the next 2+ years ("According to the 2026 Australian Medical Financing Report...")
- Wikipedia-eligible citations (Wikipedia is 47.9% of ChatGPT citations)

### 5.3 Content Plan — Next 90 Days

Prioritise by search volume × commercial intent × citation potential:

| Priority | Topic | Format | Target queries |
|----------|-------|--------|----------------|
| 1 | How to finance dental implants in Australia | Guide + embedded calculator | "finance dental implants australia", "dental implant payment plan" |
| 2 | IVF cost breakdown by cycle (NSW/VIC/QLD) | Data-heavy guide | "how much does IVF cost australia", "ivf cost per cycle" |
| 3 | Cosmetic surgery loans vs medical credit cards | Comparison | "cosmetic surgery loan" (Finder dominates — extractable passages can steal AI citations) |
| 4 | Medicare vs private health for elective surgery | Explainer | "does medicare cover cosmetic surgery" |
| 5 | What credit score do you need for a medical loan | FAQ-style | "credit score medical loan australia" |
| 6 | Early release of super for medical treatment — when it's allowed | Explainer | "early release super medical" (high volume, underserved) |
| 7 | BNPL for dental vs dental loan — which is cheaper? | Decision tool | Targets Afterpay/Humm comparison intent |
| 8 | Hair transplant cost Australia 2026 | Cost guide | "hair transplant cost australia" (under-served vs male-grooming blogs) |

Each post: 1500–2500 words, named author with credentials, `datePublished` + `dateModified`, ≥3 primary-source citations, ≥2 statistics with dates, ≥1 comparison table, FAQ block at bottom. Target to ship 2/week = 16 posts in 90 days.

### 5.4 Competitor Pages — Scale What's Already Working

Your comparison pages are the strongest asset. Extend the pattern:

- Missing entries — MediPay, OurMoneyMarket, Humm, Plenti (already done?), SocietyOne (already done?), Latitude, MoneyMe, TLC, Jacaranda Finance, Fair Go
- Alternatives pages — "CosmediLoans alternatives", "Best alternatives to Afterpay for dental"
- Category decision pages — "Dental payment plan vs dental loan", "Medical credit card vs personal loan for surgery"

Per `ai-seo` skill: comparison articles = ~33% of all AI citations. This is the single highest-citation format that exists.

---

## 6. Off-Site / Brand Mentions — Where AI Actually Looks

Per `seo-geo` skill Dec 2025 data, correlation with AI visibility:
- YouTube mentions: 0.737 (strongest)
- Reddit/Wikipedia: High
- Backlinks (traditional): 0.266 (weak)

**Action list:**

1. **Reddit presence** — 47% of Perplexity citations come from Reddit. Auth sub-by-sub. Target: `r/AusFinance` (500k members), `r/Dentistry`, `r/AustralianDental`, `r/IVF`, `r/Australia`, `r/PersonalFinanceAU`. Don't spam. Show up as a named broker answering finance questions. Consistent handle = brand entity in AI training data. 3-month ramp to recognised commenter.
2. **Wikipedia** — Not the company page yet (too small). Instead: edit existing pages on "Medical finance in Australia", "Cosmetic surgery in Australia", "Dental implant" — add a citation to your data-backed blog posts. Wikipedia edits stick if verifiable and neutral.
3. **YouTube** — 2 videos/month:
   - "How much does [procedure] cost in Australia, and how to finance it" — tied to each procedure page
   - Customer-story format (anonymised) — "I financed $18,000 of IVF — here's what I paid"
   YouTube transcripts are indexed by Google AI Overviews and Perplexity.
4. **Quora** — Answer every top "cost" / "finance" / "loan" question in the medical space. Link sparingly. 3–4 answers/week for 6 months = hundreds of AI-citable mentions.
5. **News PR** — Use the 2026 Australian Medical Financing Report (§5.2) as the pitch. Target health + finance journalists at AFR, News.com.au, SMH, 9News Finance, ABC News, Women's Agenda.
6. **Review sites** — Productreview.com.au profile, Trustpilot. AI search cites these directly for "is X legit" queries.
7. **G2 / Capterra** — less relevant for B2C finance, skip.

---

## 7. Measurement — 90-Day KPI Dashboard

Set up (since `seo-pipeline` skill is scoped to car-brokers, this needs to be rebuilt for CosmediLoans):

| Metric | Tool | Baseline | Target @ 90 days |
|--------|------|----------|------------------|
| Organic sessions | GA4 | TBD | 3–5× baseline |
| Indexed URLs | Search Console | TBD | Up ~200 (clean) vs ~600 (polluted) |
| AI citations (manual check) | Monthly run of top-20 queries through ChatGPT, Perplexity, Google AIO | 0 | Cited for ≥3 queries |
| Form submissions (leads) | GA4 event + CRM | TBD | 2× |
| Organic impressions on comparison pages | GSC | TBD | 5× |
| Branded search volume | Google Trends + GSC | TBD | 3× (signal of entity recognition) |
| Reddit brand mentions | Manual/F5Bot | 0 | 20+/month |
| Backlinks (Ahrefs/Majestic) | External tool | TBD | +50 DR-30+ |

**Monthly manual AI-visibility check** — test these 20 queries in ChatGPT, Perplexity, Google AI Overviews, and log whether CosmediLoans is cited:

1. best medical loan Australia
2. how much do dental implants cost Australia
3. how to finance IVF Australia
4. cosmetic surgery loan comparison
5. Afterpay vs personal loan for dental
6. medical finance broker Australia
7. can I use super for dental
8. dental implants payment plan Australia
9. rhinoplasty cost and financing
10. LASIK eye surgery loan
11. bariatric surgery loan Australia
12. medical credit card vs loan
13. hair transplant cost Australia
14. breast augmentation financing
15. dental loan for bad credit
16. elective surgery finance Australia
17. IVF cost per cycle Australia
18. Humm medical vs personal loan
19. veneers payment plan
20. tummy tuck loan Australia

---

## 8. Prioritised Roadmap

### Week 1 (ship this week) — unblock everything else

- [ ] Single `SITE_URL` + `BRAND` constants, replace every hardcoded spelling. Covers ~10 files. (~2h)
- [ ] Fix `llms.txt` contact email. (~2m)
- [ ] Fix `MedicalProcedure` → `FinancialProduct` schema on `/procedures/[slug]`. (~30m)
- [ ] Stop emitting `FAQPage` schema on `/locations/*`. (~30m)
- [ ] Decide on location strategy (§3.2). If in doubt, `noindex` the 600 location+procedure pages today. (~15m)
- [ ] Expand `robots.ts` with explicit AI bot allowlist. (~10m)
- [ ] Replace `lastModified: now` in `sitemap.ts` with per-page `dateModified`. Requires adding a date field to procedures/comparisons data. (~2h)

### Week 2–4 (high-impact on-page AEO)

- [ ] Add 134–167 word definition blocks (lead with direct answer) to every procedure page hero. Store in `procedures.ts` as `definitionBlock`.
- [ ] Add `dateModified` + visible "Last reviewed {date}" to every page template.
- [ ] Create 1–2 named authors with Person schema; backfill onto both existing blog posts.
- [ ] Write 4 new blog posts from §5.3 priorities 1–4.
- [ ] Rewrite comparison verdicts as citable 2-sentence claims.
- [ ] Extend `comparisons.ts` with MediPay, OurMoneyMarket, TLC, Plenti, MoneyMe (whichever are missing).
- [ ] Stand up AI-visibility monthly manual dashboard (§7).

### Month 2 (content + off-site)

- [ ] Ship 8 more blog posts (§5.3 priorities 5–8 + 4 more from extended list).
- [ ] Ship 2 new free tools (§5.1).
- [ ] Begin Reddit presence rollout (§6.1) — named handle, 3 answers/week.
- [ ] Launch 1 YouTube video on highest-volume procedure query ("dental implant cost Australia").
- [ ] Begin aggregating data for the 2026 report (§5.2).
- [ ] Decide on final location strategy; execute (either collapse or inject unique content).
- [ ] Backlink outreach: pitch 3 finance journalists with expert commentary offer.

### Month 3 (authority + scale)

- [ ] Ship the 2026 Australian Medical Financing Report with PR push.
- [ ] 8 more blog posts.
- [ ] Wikipedia edits on 3 relevant public pages.
- [ ] Review AI-visibility dashboard; double down on queries where you're cited; refine queries where you're not.
- [ ] Evaluate programmatic expansion to: procedure-by-city pages *with* real local data, or alternatives pages.

---

## 9. What to Expect

**Rough baseline expectations if the week-1 fixes ship plus the 90-day roadmap executes:**

| Timeframe | Expected lift | Driver |
|-----------|---------------|--------|
| Week 2 | 10–20% recovery | Domain/brand fixes + noindex cleanup → Google trusts the site |
| Month 1 | 1.5–2× | Fresh content + dateModified + AEO extractability |
| Month 3 | 2–3× | Content cluster maturing + comparison pages + tools |
| Month 6 | 3–5× | AI citations compound, data report hits, Reddit/YouTube authority |

Critical assumption: domain + brand consistency is fixed week 1. Nothing else compounds until the entity is unambiguous to Google + LLMs.

---

## 10. Skill Application Summary

- **Karpathy:** Surgical changes only — each item traces directly to a measurable gain. No speculative refactors.
- **`seo` + `seo-technical`:** Applied quality-gates (HARD STOP on 50+ location pages, schema-type correctness, canonical + metadata consistency).
- **`ai-seo`:** Three-pillar model — Structure (definition blocks, passage length), Authority (Person schema, stats), Presence (Reddit/YouTube/Wikipedia).
- **`seo-geo`:** Dec 2025 Ahrefs data — brand mentions 3× backlinks. Passage length 134–167 words. Platform-specific (ChatGPT vs AIO) optimisation.
- **`marketing-ideas`:** Engineering-as-marketing (free tools), original research (report), comparison pages (#11), viral content via PR.
- **`seo-pipeline`:** Workflow and alerting model applies, but needs to be re-scoped from the car-broker sites to CosmediLoans before it's useful.

---

## Appendix A — Exact File Locations for Week-1 Fixes

| Fix | Files |
|-----|-------|
| Domain typo | `src/app/api/leads/route.ts:36-37`, `src/app/blog/[slug]/page.tsx:82,84`, `src/app/blog/rss.xml/route.ts:3`, `src/app/calculator/page.tsx:99`, `src/app/compare/page.tsx:60`, `src/app/compare/[slug]/page.tsx:78`, `src/app/locations/[location]/page.tsx:14`, `src/app/locations/[location]/[procedure]/page.tsx:13`, `src/app/procedures/[slug]/page.tsx:114` |
| Brand typo "CosmodiLoans" | `src/app/locations/[location]/page.tsx:28,48`, `src/app/locations/[location]/[procedure]/page.tsx:30,48,129` |
| Schema type fix | `src/app/procedures/[slug]/page.tsx:108-124` |
| Duplicate FAQPage schema | `src/app/locations/[location]/[procedure]/page.tsx:150-163` (wrap FAQ in a variant that suppresses JSON-LD, OR emit `<dl>` not `<FAQAccordion>`) |
| llms.txt email | `public/llms.txt:29` |
| Robots allowlist | `src/app/robots.ts` |
| Sitemap dates | `src/app/sitemap.ts` + add `lastReviewed` to each procedure/comparison data entry |
| Noindex location+procedure (interim) | `src/app/locations/[location]/[procedure]/page.tsx` — `generateMetadata` returns `robots: { index: false, follow: true }` |

## Appendix B — Out-of-Scope / Future

- **Hreflang** — single market (AU), no i18n needed. Skip.
- **Core Web Vitals** — not measured in this audit; recommend running PageSpeed Insights on `/`, `/procedures/dental-loans`, `/compare/cosmediloans-vs-afterpay` and fixing any LCP >2.5s or INP >200ms.
- **Backlink audit** — needs Ahrefs/Majestic access. If available, check for: toxic links, lost referring domains, unlinked brand mentions (easy wins).
- **Conversion rate optimisation** — lead-form UX is a separate audit; use `page-cro` skill.
