---
name: CosmediLoans
description: Medical procedure financing broker-matching website for Australian patients
colors:
  primary: "#0d2b5c"
  primary-light: "#0e9fb2"
  primary-wash: "#eaf7fb"
  primary-deep: "#1e3a8a"
  surface: "#ffffff"
  background: "#f8fafc"
  border: "#e2e8f0"
  text-dark: "#0f172a"
  text-body: "#475569"
  text-muted: "#64748b"
  success: "#22c55e"
  error: "#ef4444"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.5px"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  button: "8px"
  card: "16px"
  pill: "9999px"
spacing:
  section-x: "60px"
  section-y: "80px"
  card: "28px"
  form: "32px"
  field-x: "16px"
  field-y: "12px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  button-primary-large:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-body}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  field-standard:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.button}"
    padding: "12px 16px"
  badge-trust:
    backgroundColor: "{colors.primary-wash}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
---

# Design System: CosmediLoans

## Overview

**Creative North Star: "The Clear Funding Desk"**

CosmediLoans is a clinical-financial brand surface: serious enough for regulated lending context, warm enough for sensitive treatment decisions, and direct enough to convert. The current system uses a restrained blue trust palette, Inter typography, rounded white cards, and soft shadows to make medical financing feel orderly rather than intimidating.

The site is built as a conversion and SEO machine, so the design must keep trust and action close together. Forms, calculators, procedure cards, comparison pages, and FAQ content should feel like one coherent desk where a patient can understand cost, compare options, and take the next step without pressure.

The system explicitly rejects the anti-references in PRODUCT.md: cold bank site, payday-loan or BNPL gimmick, crypto or neon fintech dashboard, generic medical clinic, generic SaaS landing-page cliches, dark-mode finance tropes, purple gradients, over-polished stock imagery, fear-based urgency, and anything that makes sensitive medical procedures feel transactional or exploitative.

**Key Characteristics:**
- Restrained blue and cool neutral palette, with green reserved for approval and confidence.
- Rounded, well-lit surfaces that make forms and financial content feel manageable.
- Dense but plain-language trust signals: 20+ lenders, soft credit check, no patient fee, Australia-wide.
- Conversion-first layout that still gives medical topics room to breathe.

## Colors

The palette is calm clinical blue on cool financial neutrals, with success green used sparingly for reassurance.

### Primary
- **Deep Navy**: The main brand color for CTAs, active states, headings, links, hero emphasis, and the calculator result panel.
- **Ocean Teal**: The controlled accent for logo contrast, focus rings, link highlights, and health-first motifs.
- **Sky Mist**: The pale teal-blue tint for badges, icon circles, gentle section fills, and low-pressure affordances.
- **Deep Approval Blue**: The darker gradient endpoint for final CTAs and calculator result surfaces.

### Secondary
- **Approval Green**: The only non-blue accent. Use it for successful submission, "no credit impact", approval confidence, and favorable calculator zones.
- **Error Red**: Use only for validation errors and destructive feedback.

### Neutral
- **Paper Surface**: The card and form surface token. It keeps the site bright and low-friction.
- **Cool Page Background**: The page background and input fill. It separates surfaces without heavy shadow.
- **Slate Border**: Dividers, input borders, card separators, nav borders, and subtle structure.
- **Ink Heading**: High-confidence headings and primary data.
- **Slate Body**: Paragraph text, navigation labels, and explanatory copy.
- **Muted Slate**: Captions, placeholders, helper text, and low-priority metadata.

### Named Rules

**The Blue Is Proof Rule.** Primary blue should signal trust, comparison, or action. Do not use it as decoration where it does not clarify a decision.

**The Green Has To Earn It Rule.** Green is reserved for positive financial or process states. Do not use it for generic decoration.

**The No Neon Rule.** Purple gradients, neon accents, and crypto-dashboard colors are prohibited.

## Typography

**Display Font:** Inter, loaded through `next/font/google`, with system fallbacks.
**Body Font:** Inter, loaded through `next/font/google`, with system fallbacks.
**Label/Mono Font:** None. The site does not use a separate mono voice.

**Character:** Inter gives the current site a plain, practical, broker-desk tone. It is not distinctive on its own, so hierarchy, spacing, and copy discipline must carry the brand.

### Hierarchy
- **Display** (700, 48px, 1.15 line-height, -0.5px tracking): Homepage and major page H1s. Use only for first-screen promises and high-value SEO landing pages.
- **Headline** (700, 36px, 1.2 line-height): Section headings and conversion blocks.
- **Title** (600, 16px, 1.4 line-height): Card titles, benefit titles, form headings, and compact component headers.
- **Body** (400, 16px, 1.6 line-height): Explanatory text, SEO copy, form support copy, and FAQ answers. Keep long reading blocks below 75ch.
- **Label** (600, 14px, 1.5 line-height): Form labels, nav-adjacent badges, small buttons, and filter pills.

### Named Rules

**The Plain-English Rate Rule.** Financial values can be large and bold, but the supporting copy must explain them in direct language.

**The No Decorative Type Rule.** Do not add serif, script, mono, or novelty fonts unless the brand direction is deliberately changed. The current system gets its authority from clarity.

## Elevation

CosmediLoans uses a soft-shadow hybrid. Cards and forms are lifted enough to separate conversion surfaces from the page, while most content sections rely on tonal bands and borders. Shadows should feel like daylight on paper, not glossy app chrome.

### Shadow Vocabulary
- **Card Lift** (`box-shadow: 0 4px 24px rgba(0,0,0,0.06)`): Standard cards, procedure tiles, and small content blocks.
- **Form Lift** (`box-shadow: 0 8px 32px rgba(0,0,0,0.08)`): Lead forms, success states, and high-conversion panels.
- **Blue Hover Lift** (`box-shadow: 0 8px 24px rgba(30,64,175,0.1)`): Interactive cards that should feel selectable.
- **Dropdown Lift** (`box-shadow: 0 8px 32px rgba(0,0,0,0.12)`): Navigation dropdowns and floating menus.

### Named Rules

**The Trust Before Drama Rule.** Shadows support scanability and touch affordance. They must never make the page feel like a glossy loan app.

**The Lift Means Action Rule.** Static content can be flat. Lifted surfaces should contain a form, link, comparison, calculator, or CTA.

## Components

### Buttons
- **Shape:** Soft rectangular action controls (8px radius).
- **Primary:** Deep Navy background with Paper Surface text, medium padding at 12px 24px and large CTA padding at 16px 32px.
- **Hover / Focus:** Primary hover darkens through opacity; focus uses an Ocean Teal ring with offset. Transitions run at 200ms.
- **Secondary / Ghost:** Secondary buttons reverse to white with navy text and a border. Ghost buttons are text-led and use Sky Mist on hover.

### Chips
- **Style:** Badges and filters use pill geometry, 14px semibold type, and Sky Mist backgrounds.
- **State:** Selected filters invert to Deep Navy with white text. Unselected filters stay pale blue and become navy on hover.

### Cards / Containers
- **Corner Style:** Rounded card corners (16px radius).
- **Background:** Cards use Paper Surface on Cool Page Background or section bands.
- **Shadow Strategy:** Standard cards use Card Lift. Lead forms use Form Lift. Interactive procedure cards add Blue Hover Lift and a slight upward transform.
- **Border:** Borders are used for section separators, dropdowns, and secondary buttons, not for every card.
- **Internal Padding:** Standard cards use 28px. Lead forms use 32px.

### Inputs / Fields
- **Style:** Fields use Cool Page Background, Slate Border, 8px radius, 12px 16px padding, and Ink Heading text.
- **Focus:** Border changes to Ocean Teal with a low-opacity teal ring.
- **Error / Disabled:** Errors use Error Red for border and message text. Disabled buttons lower opacity and use a not-allowed cursor.

### Navigation

The navigation is sticky, translucent white, and lightly blurred, with a thin Slate Border bottom edge. Desktop navigation uses 15px medium labels, a procedure dropdown with three-column procedure links, and a compact primary CTA. Mobile uses a right-side drawer with 44px minimum touch targets and the same logo lockup.

### Lead Form

The lead form is the primary conversion object. It should stay compact, calm, and complete: heading, reassurance line, five labeled fields, large primary CTA, validation errors, and a small trust footer. Do not split it into a multi-step flow unless conversion data proves the current form is too heavy.

### Procedure Card

Procedure cards combine an icon, title, cost range, rate line, and arrow affordance. Their job is browsable confidence, not decoration. Keep the card height stable and let the hover state reinforce clickability.

### Calculator Result Card

The calculator result card is the system's strongest color moment: a Deep Navy to Deep Approval Blue panel, white type, bold monthly repayment, supporting totals, and a white secondary CTA. Use this treatment only for high-confidence financial summaries.

## Do's and Don'ts

Concrete guardrails for future screens and AI-generated variants.

### Do:
- **Do** keep Deep Navy tied to trust, lender comparison, form action, or active navigation.
- **Do** keep forms visually calm: labeled fields, clear helper text, visible errors, and one obvious CTA.
- **Do** use real medical-financing proof points near conversion moments: 20+ lenders, soft credit check, no patient fee, Australia-wide context.
- **Do** preserve WCAG 2.2 AA contrast, visible keyboard focus, and 44px mobile touch targets.
- **Do** use imagery that feels helpful and human, especially for procedures and process explanations.

### Don't:
- **Don't** make CosmediLoans feel like a cold bank site.
- **Don't** make it feel like a payday-loan or BNPL gimmick.
- **Don't** use crypto or neon fintech dashboard styling.
- **Don't** make it feel like a generic medical clinic.
- **Don't** rely on generic SaaS landing-page cliches, identical icon-card grids, or oversized hero-metric templates.
- **Don't** introduce dark-mode finance tropes, purple gradients, glassmorphism, or gradient text.
- **Don't** use over-polished stock imagery that makes sensitive medical procedures feel transactional or exploitative.
- **Don't** use fear-based urgency, scarcity pressure, or shame-driven medical copy.
- **Don't** use side-stripe borders as card accents.
