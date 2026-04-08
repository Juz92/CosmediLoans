# CosmediLoans — Full Design Document

**Date:** 2026-03-30
**Status:** Approved
**Stack:** Next.js 14 (App Router) + Tailwind CSS + Radix UI + MDX

---

## 1. Project Overview

**CosmediLoans** is a lead generation website for medical procedure financing in Australia. The site captures patient enquiries and connects them with expert brokers who shop 20+ lenders for the best rate.

**Business Model:** Lead generation — captures leads via forms, passes them to brokers. The site does NOT position itself as a broker or credit provider.

**Primary Goals:**
- Eye-catching, trustworthy design (Variant A — clinical/professional)
- Strong organic traffic via programmatic SEO on procedure pages
- High lead conversion via short hero form + calculator page

**Market:** Australia-wide (national, no city-specific pages)

---

## 2. Site Architecture

```
cosmedloans.com.au

CORE PAGES
├── /                              Homepage — hero lead form, procedure grid, trust, social proof
├── /apply                         Dedicated lead form — for ad campaigns & direct links
├── /calculator                    Interactive loan calculator — SEO asset
├── /how-it-works                  3-step process + detailed explainer
├── /about                         Brand story, mission, trust signals
├── /contact                       Contact form + details
├── /thank-you                     Post-submission — conversion tracking fires here

PROCEDURE PAGES (Programmatic SEO — shared template, unique content)
├── /procedures                    Category landing — "All procedures we finance"
│   ├── /dental-loans
│   ├── /veneers-financing
│   ├── /invisalign-financing
│   ├── /ivf-financing
│   ├── /fertility-treatment-loans
│   ├── /breast-augmentation-loans
│   ├── /rhinoplasty-financing
│   ├── /tummy-tuck-loans
│   ├── /liposuction-financing
│   ├── /facelift-financing
│   ├── /lasik-loans
│   ├── /bariatric-surgery-loans
│   ├── /weight-loss-surgery-loans
│   ├── /hair-transplant-loans
│   ├── /orthopedic-surgery-loans
│   ├── /dermatology-financing
│   ├── /mommy-makeover-financing
│   └── /medical-loan              Catch-all for unlisted procedures

COMPARISON PAGES (Bottom-of-funnel SEO)
├── /compare                       Hub page — "How we compare"
│   ├── /cosmediloans-vs-carecredit
│   ├── /cosmediloans-vs-afterpay
│   ├── /cosmediloans-vs-zip-pay
│   ├── /cosmediloans-vs-humm
│   ├── /cosmediloans-vs-latitude
│   ├── /cosmediloans-vs-moneyme
│   ├── /cosmediloans-vs-plenti
│   ├── /cosmediloans-vs-societyone
│   ├── /medical-loan-vs-personal-loan
│   ├── /medical-loan-vs-credit-card
│   └── /medical-loan-vs-buy-now-pay-later

RESOURCES & GUIDES (Mid-funnel content)
├── /guides                        Hub page
│   ├── /guides/how-to-finance-dental-implants
│   ├── /guides/ivf-costs-australia
│   ├── /guides/plastic-surgery-costs-australia
│   ├── /guides/what-credit-score-do-i-need
│   └── ...                        Expandable

BLOG (Top-of-funnel SEO — topical clusters)
├── /blog                          Blog index with categories
│   ├── /blog/category/dental
│   ├── /blog/category/fertility
│   ├── /blog/category/cosmetic
│   ├── /blog/category/finance-tips
│   └── /blog/[slug]

FAQ
├── /faq                           Master FAQ page — 34 items with schema

LEGAL
├── /privacy-policy
├── /terms
├── /disclaimer

UTILITY
├── /sitemap.xml
├── /blog-sitemap.xml
├── /robots.txt
├── /blog/rss.xml
└── /404                           Custom 404
```

**Total indexed pages at launch:** ~50-60 (scales to 100+ with blog content)

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSG for procedure pages, great SEO primitives, ISR for blog |
| Styling | Tailwind CSS | Fast to build, consistent with clinical aesthetic |
| UI Components | Radix UI primitives | Accessible, unstyled — styled to match Variant A |
| Forms | React Hook Form + Zod | Lightweight validation, good UX |
| CMS (Blog) | MDX files | No external dependency, easy to author |
| Calculator | Custom React component | Interactive, no third-party dependency |
| Analytics | Google Analytics 4 + Google Tag Manager | Conversion tracking on /thank-you |
| SEO | Next.js Metadata API + JSON-LD schema | Structured data for every page type |
| Deployment | Vercel | Zero-config Next.js hosting, edge CDN |
| Email/Leads | API route → webhook to CRM/email | Flexible pipeline |

---

## 4. Design Tokens (Variant A — Clinical & Trustworthy)

```
COLORS
  Primary:          #1e40af    Deep blue — trust, authority
  Primary Light:    #3b82f6    Bright blue — accents, links
  Primary Wash:     #eff6ff    Blue tint backgrounds
  Text Dark:        #0f172a    Headings
  Text Body:        #475569    Body copy
  Text Muted:       #94a3b8    Captions, notes
  Surface:          #ffffff    Cards, forms
  Background:       #f8fafc    Page background
  Border:           #e2e8f0    Dividers
  Success:          #22c55e    Approval indicators

TYPOGRAPHY
  Font:             Inter (400, 500, 600, 700)
  Hero H1:          48px / 700 / -0.5px tracking
  Section H2:       36px / 700
  Card H4:          16px / 600
  Body:             16px / 400 / 1.6 line-height
  Small:            14px / 500

SPACING
  Section padding:  80px vertical, 60px horizontal
  Card padding:     28px
  Card radius:      16px
  Button radius:    8px

SHADOWS
  Card:             0 4px 24px rgba(0,0,0,0.06)
  Form:             0 8px 32px rgba(0,0,0,0.08)
  Hover:            0 8px 24px rgba(30,64,175,0.1)
```

---

## 5. Component Architecture

```
components/
├── layout/
│   ├── Navbar.tsx                Sticky nav, logo, links, CTA button
│   ├── Footer.tsx                Disclaimers, sitemap links, compliance placeholders
│   └── PageWrapper.tsx           Consistent max-width, padding, meta
│
├── lead-capture/
│   ├── HeroLeadForm.tsx          Name, phone, email, procedure, amount + UTM capture
│   ├── InlineLeadForm.tsx        Compact version for mid-content
│   ├── StickyMobileCTA.tsx       Fixed bottom bar on mobile
│   └── FormSuccess.tsx           Inline success state before redirect
│
├── calculator/
│   ├── LoanCalculator.tsx        Sliders + live repayment output
│   └── RepaymentTable.tsx        Full amortisation schedule
│
├── procedures/
│   ├── ProcedureHero.tsx         Name, description, cost range, lead form
│   ├── ProcedureCostTable.tsx    Sub-procedure cost breakdown
│   ├── ProcedureFAQ.tsx          Accordion with schema
│   └── ProcedureCard.tsx         Grid card for homepage/hub
│
├── compare/
│   ├── ComparisonTable.tsx       Side-by-side feature comparison
│   └── ComparisonHero.tsx        vs. page header
│
├── content/
│   ├── HowItWorks.tsx            3-step visual process
│   ├── TrustBar.tsx              Stats bar
│   ├── TestimonialGrid.tsx       Review cards
│   ├── FAQAccordion.tsx          Reusable accordion + JSON-LD
│   ├── BlogCard.tsx              Post preview card
│   └── NewsletterSignup.tsx      Email capture for blog
│
├── analytics/
│   ├── UTMCapture.tsx            Reads/stores UTM params
│   ├── ConversionPixel.tsx       GA4 + GTM events on /thank-you
│   └── ABTestWrapper.tsx         Simple variant toggle via cookie
│
├── seo/
│   ├── JsonLd.tsx                Generic JSON-LD injector
│   ├── BreadcrumbSchema.tsx      Auto breadcrumbs from path
│   ├── FAQSchema.tsx             FAQ structured data
│   └── SitemapGenerator.ts       Auto-generates sitemap.xml
│
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    ├── Select.tsx
    ├── Badge.tsx
    ├── Card.tsx
    ├── Accordion.tsx
    ├── Skeleton.tsx
    ├── ErrorBoundary.tsx
    └── Toast.tsx

lib/
├── utm.ts                        Parse & persist UTM parameters
├── leads.ts                      Validate, enrich with UTM, forward to webhook
└── calculator.ts                 Amortisation calculation (pure function)

data/
├── procedures.ts                 All procedure data for programmatic generation
├── comparisons.ts                Competitor data
└── blog/
    └── *.mdx                     Blog posts
```

---

## 6. Page Specifications

### 6.1 Homepage

**Sections (top to bottom):**

1. **Navbar** (sticky) — Logo, nav links, "Get Your Rate" CTA. Mobile: hamburger drawer.
2. **Hero** — 2-column: left content (badge, H1, subtext, trust indicators) + right lead form (5 fields + CTA). Background: CSS gradient #f0f5ff → #e0ecff. Lead form pre-renders server-side for fast LCP.
   - H1: "Finance Any Medical Procedure. **Find Your Lowest Rate.**"
   - Fields: Full Name, Phone, Email, Procedure (dropdown), Estimated Amount
   - CTA: "Check My Rate →"
3. **Trust Bar** — 4 stats: 20+ Lenders, 60-Second Quotes, No Credit Impact, $50M+ Funded
4. **Partner Logos** — "Lenders in Our Network" — row of lender logo placeholders
5. **How It Works** — 3 numbered cards with connector line: Submit → Broker Shops → Get Funded
6. **Procedure Grid** — 4x2 grid of ProcedureCards linking to /procedures/[slug]. "Don't see your procedure?" link below.
7. **Why Choose Us** — 2x2 benefit cards:
   - "Broker-Matched, Not Bank-Locked"
   - "Built for Medical"
   - "Zero Cost, Zero Catch"
   - "Approved in Minutes"
8. **Loan Examples** — 3 cards: $5K dental ($99/mo), $15K IVF ($297/mo), $30K cosmetic ($589/mo). Link to /calculator.
9. **Testimonials** — 3 review cards (placeholder content)
10. **FAQ** — 10 accordion items with FAQPage schema
11. **Scroll-Triggered CTA** — Slide-in banner at 60% scroll: "Still researching? Get a free rate check →"
12. **Final CTA** — Blue gradient, "Ready to Find Your Best Rate?" → /apply
13. **Footer** — 4 columns (Procedures, Company, Legal, Resources), compliance placeholders, disclaimer

**Mobile adaptations:**
- Sticky bottom CTA bar: "Get Your Rate"
- Hero stacks vertically (content → form)
- Procedure grid: 2x4 tablet, scrollable row mobile
- Nav: hamburger with slide-out drawer

### 6.2 Procedure Page Template

**URL:** `/procedures/[slug]` — 18 pages generated from `procedures.ts` via `generateStaticParams()`

**Sections:**
1. Breadcrumb (schema-marked)
2. Procedure Hero — H1 "[Procedure] Financing Australia", stats row, lead form with procedure pre-selected
3. Cost Table — "How Much Does [Procedure] Cost in Australia?" with sub-procedure breakdown
4. Financing Options — 3 cards: Medical Loan (recommended), BNPL, Credit Card
5. Featured Snippet Box — Quick answer targeting "[procedure] financing Australia" queries
6. Repayment Examples — 3 auto-calculated from procedure cost range
7. How It Works — Contextualised 3-step with procedure name
8. Why Finance With Us — 4 procedure-specific benefits
9. Procedure FAQ — 8 unique FAQs per procedure with schema
10. Related Procedures — 4 ProcedureCards for internal linking
11. Inline CTA — "Ready to Finance Your [Procedure]?"
12. Related Blog Posts — 3 cards auto-pulled by category

**Data type:**
```typescript
type Procedure = {
  slug: string
  title: string
  h1: string
  metaTitle: string
  metaDescription: string
  heroDescription: string
  icon: string
  avgCostRange: string
  rateFrom: string
  maxTerm: string
  costTable: { subProcedure: string; costRange: string }[]
  repaymentExamples: { amount: number; rate: number; term: number }[]
  faqs: { question: string; answer: string }[]
  relatedSlugs: string[]
  blogCategory: string
  financingDescription: string
  benefits: { title: string; description: string }[]
}
```

**SEO per page:** Canonical URL, OG tags, auto-generated OG image, MedicalProcedure schema, FAQPage schema, BreadcrumbList schema, lastModified date.

### 6.3 Comparison Pages

**URL:** `/compare/[slug]` — 11 pages from `comparisons.ts`

**Two types:**
- **Brand comparisons** (us vs competitor): logo pair, feature table, verdict, "who should use which" cards
- **Generic comparisons** (loan vs credit card): icon pair, pros/cons cards, verdict

**Sections:**
1. Breadcrumb
2. Comparison Hero — H1 "CosmediLoans vs [X]: Which Is Better for Medical Financing?"
3. Quick Verdict Box (featured snippet bait)
4. Side-by-Side Feature Table (8-10 rows)
5. Detailed Breakdown — how each option works
6. Who Should Use Which — two honest recommendation cards
7. Internal links to relevant procedure pages
8. FAQ — 6 items with schema
9. CTA → /apply

**Hub page (`/compare`):** Summary matrix of all competitors with ItemList schema. H1: "Compare Medical Financing Options in Australia"

**Freshness:** "Last reviewed: [date]" badge per page.

### 6.4 Calculator Page

**URL:** `/calculator`

**Sections:**
1. Hero — H1 "Medical Loan Repayment Calculator"
2. Calculator — 2-column: inputs (procedure dropdown, amount slider, rate slider, term buttons) + live results card (monthly payment, total, interest, CTA). Procedure selection auto-adjusts amount range. Rate slider shows "broker range" vs "bank range" zones.
3. Email capture — "Email me these results" below calculator
4. Repayment Schedule — Expandable full amortisation table
5. Rate Comparison Visual — Same loan at 3 different rates showing interest savings
6. SEO Content — "5 Ways to Get a Lower Medical Loan Rate in Australia"
7. FAQ — 8 items with schema
8. CTA → /apply

**Calculator logic:** Pure client-side amortisation function. Server-rendered default state for SEO. Handles 0% rate edge case. Debounced slider updates (60ms).

### 6.5 Blog System

**Index (`/blog`):** Category filter pills, 3-column grid, 12 posts per page (numbered pagination), sidebar with popular posts + newsletter + CTA.

**Category (`/blog/category/[cat]`):** Filtered grid with unique intro paragraph per category.

**Post (`/blog/[slug]`):** Breadcrumb, H1, meta line, auto-generated TOC (sticky sidebar), MDX body with custom components (CalloutBox, CostTable, RepaymentExample, LeadFormInline, RelatedProcedure), mid-article CTA at 40% depth, share buttons, related posts, final CTA. Article schema.

**Infrastructure:** RSS at `/blog/rss.xml`, separate blog sitemap, newsletter signup component.

**Launch content plan — 20 posts across 5 topical clusters:**
- Dental (4): implant costs, financing options, payment plans, implants vs veneers
- Fertility (4): IVF costs, financing IVF, success rates ROI, egg freezing costs
- Cosmetic (4): financing plastic surgery, breast augmentation cost, rhinoplasty cost, mommy makeover cost
- Finance Education (4): medical vs personal loan, credit score requirements, how brokers work, questions before borrowing
- Broad Medical (4): LASIK cost, bariatric cost, hair transplant cost, financing elective surgery

**Word count targets:** Informational: 1,500-2,000w. Guides: 2,000-2,500w. Comparisons: 1,200-1,800w.

### 6.6 FAQ Hub

**URL:** `/faq`

Search bar (client-side filter) + 5 tabbed categories:
- General (8 items)
- Loans & Rates (8 items)
- Eligibility (6 items)
- Procedures (6 items)
- Process & Payment (6 items)

**Total:** 34 FAQ items. FAQPage schema. "Didn't find your answer?" contact form at bottom (doubles as lead capture).

### 6.7 Supporting Pages

**How It Works (`/how-it-works`):** Expanded 3-step process, timeline visual, broker vs bank comparison, inline lead form, FAQ subset.

**About (`/about`):** Mission, by-the-numbers stats, differentiators, compliance placeholder section.

**Contact (`/contact`):** 2-column form + details, response time expectation, chatbot placeholder.

**Apply (`/apply`):** Dedicated lead form page for campaigns. Same HeroLeadForm, larger layout, more trust signals.

**Thank You (`/thank-you`):** Confirmation message, conversion pixel fires, next steps, related content links.

**Legal:** Privacy policy (Australian Privacy Act/APPs), Terms, Disclaimer. Complete docs with `[PLACEHOLDER]` fields for compliance details.

**404:** Custom page with search, procedure links, main CTA.

---

## 7. SEO Strategy

### Programmatic SEO
- 18 procedure pages generated from data at build time
- Each page: unique content (~1,500-2,000 words), unique FAQs, unique meta tags
- MedicalProcedure + FAQPage + BreadcrumbList schema per page
- Internal linking: related procedures, blog posts, calculator, comparisons

### Schema Markup
- Homepage: Organization, WebSite with SearchAction
- Procedure pages: MedicalProcedure, FAQPage, BreadcrumbList
- Comparison pages: Article, ItemList (hub)
- Blog posts: Article
- FAQ page: FAQPage
- All pages: BreadcrumbList

### Technical SEO
- SSG for all procedure/comparison pages (fast TTFB)
- Auto-generated sitemap.xml + blog-sitemap.xml
- Canonical URLs on every page
- OG + Twitter card meta per page
- robots.txt excluding /thank-you and /apply
- next/font for font preloading (no CLS)
- Next.js Image for WebP/AVIF auto-format
- Priority LCP: H1 text on all pages

### Content Strategy
- 20 blog posts at launch across 5 topical clusters
- Each cluster supports a procedure page (internal linking)
- Featured snippet targeting via "Quick Answer" boxes
- Long-tail keyword capture via procedure-specific FAQs
- Newsletter signup for email list building
- RSS feed for syndication

---

## 8. Conversion Architecture

**Lead capture points:**
1. Hero lead form (homepage, procedure pages, /apply)
2. Sticky mobile CTA bar (all pages)
3. Inline lead form (mid-content on procedure pages, blog posts)
4. Calculator email capture ("Email me these results")
5. Scroll-triggered slide-in CTA (homepage, 60% depth)
6. Final CTA section (homepage, procedure pages, calculator, blog posts)
7. Newsletter signup (blog sidebar, blog footer, /faq)
8. FAQ escape hatch contact form (/faq bottom)

**Lead data captured:**
- Full name, phone, email, procedure type, estimated amount
- UTM parameters (source, medium, campaign, content, term)
- Page of origin
- Timestamp

**Lead pipeline:** Form → API route (validate + enrich with UTM) → webhook → CRM/email

**Tracking:** GA4 + GTM. Conversion event fires on /thank-you page load. UTM attribution preserved through session.

**A/B testing:** Cookie-based variant toggle for form experiments (headline, CTA copy, field order).

---

## 9. Mobile Design

- Sticky bottom CTA bar on all pages: "Get Your Rate" — always visible
- Hero stacks vertically: content on top, form below
- Procedure grid: 2-column tablet, horizontal scroll mobile
- Nav: hamburger with slide-out drawer
- Calculator: stacked layout, results below inputs
- Blog: single column, no sidebar (newsletter moves to footer)
- Touch targets: minimum 44px
- Font sizes: body 16px minimum (no zoom on iOS)
