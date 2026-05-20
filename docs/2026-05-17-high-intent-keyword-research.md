# High-Intent Keyword Research, Payment Plan Cluster

Date: 2026-05-17
Site: https://www.cosmediloans.com.au

## Summary

Search Console is showing early impressions but no clicks for procedure finance terms. The strongest new opportunity is not another broad "medical loans" page. It is a focused payment-plan cluster that answers high-intent queries where the user is already comparing ways to pay for a quote.

## GSC Evidence

Latest local GSC opportunity export:

- Range: 2026-04-17 to 2026-05-14
- Total rows: 533
- Impressions: 1,956
- Clicks: 0

Highest-signal terms and patterns:

- `dental loan`: 84 impressions across Sydney, Brisbane, and procedure pages
- `medical loans australia`: 68 impressions split between homepage and procedures hub
- `loans for dental work`: 49 impressions split across dental pages
- `ivf payment plan`: 46 impressions split across Melbourne IVF and procedure pages
- `dental loans`: 34 impressions across dental pages

Fresh 90-day Search Console query pull also surfaced:

- `dental payment / dental loan` variants: dental loan, dental loans Australia, personal loan for dental work, loans for dental work, dental loans bad credit
- `IVF payment plan` variants: IVF payment plan, fertility payment plans, IVF loans Australia, IVF cost Melbourne
- `cosmetic surgery finance` variants: cosmetic surgery finance Australia, cosmetic surgery loans Australia, loan for cosmetic surgery, breast implants payment plans
- `vet bill` variants: vet financing, vet bill loans
- `credit concern` variants: medical loans bad credit, dental loans bad credit, dental loans for bad credit Australia, no credit check dental finance

## Chosen Page Cluster

1. `/guides/dental-payment-plans-australia`
   - Primary intent: compare dental clinic plans, dental loans, BNPL, credit cards, and implant finance.
   - Why: the site already has impressions for dental loan terms, but it lacked a dedicated "payment plans" intent page.

2. `/guides/ivf-payment-plans-australia`
   - Primary intent: compare IVF payment plans, fertility loans, Medicare rebate timing, Safety Net, and early super considerations.
   - Why: `ivf payment plan` is already showing impressions, and IVF finance decisions are timing-sensitive.

3. `/guides/cosmetic-surgery-payment-plans-australia`
   - Primary intent: compare surgery finance, staged clinic payments, BNPL limits, and early super rules.
   - Why: GSC shows cosmetic surgery finance demand, and competitors often under-explain total quote structure.

4. `/guides/vet-bill-payment-plans-australia`
   - Primary intent: compare emergency vet payment plans, vet loans, dedicated vet finance, BNPL, and pet insurance limits.
   - Why: existing `vet-bill-loans` impressions make this a natural adjacent lead path.

5. `/guides/medical-loans-bad-credit-australia`
   - Primary intent: help imperfect-credit borrowers understand realistic options without guaranteed-approval claims.
   - Why: bad-credit queries are high intent, but copy must be careful and compliance-safe.

6. `/guides/no-credit-check-dental-finance-australia`
   - Primary intent: intercept no-credit-check searches and redirect them to realistic soft-check and bad-credit pathways.
   - Why: this query is commercially valuable but risky if handled with misleading promises.

## Source Checks Used

- Moneysmart, personal loans: https://moneysmart.gov.au/loans/personal-loans
- Moneysmart, buy now pay later: https://moneysmart.gov.au/other-ways-to-borrow/buy-now-pay-later-services
- Moneysmart, credit scores and reports: https://moneysmart.gov.au/managing-debt/credit-scores-and-credit-reports
- ASIC, BNPL credit licensing: https://www.asic.gov.au/regulatory-resources/credit/buy-now-pay-later-credit-contracts-credit-licensing/
- Services Australia, IVF and fertility Medicare coverage: https://www.servicesaustralia.gov.au/medicare-services-for-conceiving-pregnancy-and-birth
- Services Australia, Medicare Safety Nets: https://www.servicesaustralia.gov.au/medicare-safety-nets
- ATO, compassionate grounds early super: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/early-access-to-super/access-on-compassionate-grounds/access-on-compassionate-grounds-what-you-need-to-know
- ATO, early super warning for non-critical procedures: https://www.ato.gov.au/media-centre/separating-fact-from-fiction-on-accessing-your-super-early
- Ahpra, cosmetic procedure advertising guidelines: https://www.ahpra.gov.au/Resources/Cosmetic-surgery-hub/Cosmetic-procedure-advertising-guidelines.aspx
- CHOICE, vet costs and payment options: https://www.choice.com.au/outdoor/pets/health/articles/veterinarian-costs

## Pages Not Built First

- `dental finance broker south east qld`: likely broker-facing or location-specific, weaker patient lead intent.
- `facelift surgery sunshine coast` and `neck lift cost sunshine coast`: valuable, but they are procedure-location/cost content and should follow the payment-plan cluster after live indexation.
- Standalone `ivf cost melbourne`: useful later as a local cost page, but existing IVF location pages already cover local intent.

## Next SEO Moves

- Deploy the guide cluster. Done 2026-05-17.
- Confirm the live sitemap includes `/guides` and all six guide URLs. Done 2026-05-17, live sitemap total is 687 URLs.
- Submit the live sitemap in GSC after deployment. Attempted 2026-05-17, blocked by OAuth scope `Insufficient Permission`; refresh token with Search Console write scope, then rerun `npx tsx src/gsc-submit.ts`.
- Ping IndexNow after the live sitemap updates. Done 2026-05-17, IndexNow accepted 687 URLs.
- Monitor GSC after 14 and 28 days for impressions on payment-plan and bad-credit variants.
- If impressions appear without clicks, update titles and meta descriptions before adding more pages.
