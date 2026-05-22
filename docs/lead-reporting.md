# Organic Lead Reporting

The lead API now sends one row-shaped payload for every successful lead submission.
This gives the sales sheet enough context to judge organic traffic by lead quality,
not only by form count.

## Core Columns

Use these columns in the Google Sheet or CRM view:

| Column | Purpose |
|---|---|
| `submittedAt` | Submission timestamp from the server. |
| `source` / `formSource` | Form placement, such as `hero-form`, `inline-form`, `contact-form`, or `calculator-email`. |
| `landingPage` | First page seen in the session. |
| `currentPage` | Page where the form was submitted. |
| `landingPageType` | Inferred type: `procedure`, `guide`, `guide_hub`, `location_procedure`, `comparison`, `calculator`, and so on. |
| `trafficChannel` | Inferred channel from UTM and referrer data. |
| `referrer` | Browser referrer when available. |
| `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm` | Campaign attribution. |
| `procedure`, `procedureSlug`, `locationSlug` | User-selected procedure and page-inferred SEO context. |
| `fullName`, `email`, `phone`, `amount`, `message` | Contact and enquiry details. |
| `leadStatus` | Starts as `new`; update to contacted, booked, quoted, funded, lost, or spam. |
| `leadQuality` | Starts as `unreviewed`; update to high, medium, low, unqualified, or spam. |
| `bookedCallAt` | Add the booked call time when known. |
| `fundedOutcome`, `fundedAmount` | Add the finance outcome when known. |
| `owner`, `notes` | Broker owner and follow-up notes. |

## Recommended Weekly View

Group leads by:

- `landingPageType`
- `landingPage`
- `procedureSlug`
- `trafficChannel`
- `leadQuality`
- `fundedOutcome`

The main SEO question should be: which pages produce high-quality booked or funded leads?
Do not prioritise new content based on impressions alone.
