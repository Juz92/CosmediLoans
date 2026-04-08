# CosmediLoans Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js 14 lead generation website for medical procedure financing in Australia with programmatic SEO, a loan calculator, and full conversion architecture.

**Architecture:** Next.js App Router with static generation for SEO pages. Procedure and comparison pages generated from TypeScript data files via `generateStaticParams()`. Lead forms submit to API routes that validate and forward to a webhook. Blog powered by MDX.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Radix UI, React Hook Form, Zod, MDX, next/font (Inter)

**Design Reference:** `docs/plans/2026-03-30-cosmediloans-design.md`

---

## Phase 1: Project Scaffold & Design System

### Task 1: Initialise Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Create Next.js app with TypeScript and Tailwind**

```bash
cd /c/Cosmedi && npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

If the directory is not empty, move the `docs` and `variants` folders out first, run the command, then move them back.

**Step 2: Install dependencies**

```bash
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast react-hook-form @hookform/resolvers zod lucide-react
```

**Step 3: Install dev dependencies**

```bash
npm install -D @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

**Step 4: Verify it runs**

```bash
npm run dev
```

Expected: App runs on localhost:3000 with default Next.js page.

**Step 5: Commit**

```bash
git init && git add -A && git commit -m "chore: initialise Next.js 14 project with dependencies"
```

---

### Task 2: Configure Tailwind Design Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Update Tailwind config with design tokens**

Replace `tailwind.config.ts` contents:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e40af",
          light: "#3b82f6",
          wash: "#eff6ff",
        },
        surface: "#ffffff",
        background: "#f8fafc",
        border: "#e2e8f0",
        success: "#22c55e",
        text: {
          dark: "#0f172a",
          body: "#475569",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-h1": ["48px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.5px" }],
        "section-h2": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-h4": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        form: "0 8px 32px rgba(0,0,0,0.08)",
        hover: "0 8px 24px rgba(30,64,175,0.1)",
      },
      borderRadius: {
        card: "16px",
        button: "8px",
      },
      spacing: {
        "section-x": "60px",
        "section-y": "80px",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Update globals.css with base styles**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-body antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-text-dark;
  }
}

@layer components {
  .section-padding {
    @apply px-6 py-16 md:px-section-x md:py-section-y;
  }

  .container-narrow {
    @apply mx-auto max-w-7xl;
  }
}
```

**Step 3: Configure Inter font in root layout**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CosmediLoans | Medical Procedure Financing Australia",
    template: "%s | CosmediLoans",
  },
  description:
    "Compare rates from 20+ lenders for dental, IVF, cosmetic surgery and any medical procedure. Free broker-matched quotes in 60 seconds.",
  metadataBase: new URL("https://cosmedloans.com.au"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

**Step 4: Verify fonts and colours render**

```bash
npm run dev
```

Check localhost:3000 — should show Inter font and #f8fafc background.

**Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: configure design tokens and Inter font"
```

---

### Task 3: Build Base UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Accordion.tsx`

**Step 1: Create Button component**

Create `src/components/ui/Button.tsx`:

```typescript
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
  secondary: "bg-white text-primary border border-border hover:bg-primary-wash",
  ghost: "text-text-body hover:text-text-dark hover:bg-primary-wash",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-semibold rounded-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
```

**Step 2: Create Input component**

Create `src/components/ui/Input.tsx`:

```typescript
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-semibold text-text-dark">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border border-border rounded-button bg-background text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
```

**Step 3: Create Select component**

Create `src/components/ui/Select.tsx`:

```typescript
import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-semibold text-text-dark">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-3 border border-border rounded-button bg-background text-text-dark focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all appearance-none ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export { Select };
```

**Step 4: Create Badge component**

Create `src/components/ui/Badge.tsx`:

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-primary-wash text-primary",
    success: "bg-green-50 text-green-700",
    outline: "border border-border text-text-body",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

**Step 5: Create Card component**

Create `src/components/ui/Card.tsx`:

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-card p-7 shadow-card ${
        hover ? "transition-all duration-200 hover:shadow-hover hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 6: Create Accordion component**

Create `src/components/ui/Accordion.tsx`:

```typescript
"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  return (
    <RadixAccordion.Root type="multiple" className={className}>
      {items.map((item, i) => (
        <RadixAccordion.Item
          key={i}
          value={`item-${i}`}
          className="border-b border-border"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="flex w-full items-center justify-between py-5 text-left text-base font-semibold text-text-dark hover:text-primary transition-colors group">
              {item.question}
              <ChevronDown className="h-5 w-5 text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="pb-5 text-text-body leading-relaxed">
              {item.answer}
            </p>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
```

**Step 7: Add accordion animation to Tailwind config**

Add to `tailwind.config.ts` inside `theme.extend`:

```typescript
keyframes: {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
},
animation: {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
},
```

**Step 8: Create barrel export**

Create `src/components/ui/index.ts`:

```typescript
export { Button } from "./Button";
export { Input } from "./Input";
export { Select } from "./Select";
export { Badge } from "./Badge";
export { Card } from "./Card";
export { Accordion } from "./Accordion";
```

**Step 9: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 10: Commit**

```bash
git add src/components/ui/ tailwind.config.ts
git commit -m "feat: add base UI components (Button, Input, Select, Badge, Card, Accordion)"
```

---

## Phase 2: Layout & Navigation

### Task 4: Build Navbar Component

**Files:**
- Create: `src/components/layout/Navbar.tsx`

**Step 1: Create Navbar**

Create `src/components/layout/Navbar.tsx`:

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";

const navLinks = [
  { href: "/procedures", label: "Procedures" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:px-section-x">
        <Link href="/" className="text-[22px] font-bold text-primary">
          Cosmedi<span className="text-primary-light">Loans</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-text-body hover:text-text-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" asChild>
            <Link href="/apply">Get Your Rate</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-body"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-text-body hover:text-primary py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full mt-2" asChild>
            <Link href="/apply">Get Your Rate</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Fix Button to support `asChild` pattern**

Update `src/components/ui/Button.tsx` — add a `asChild` check. For simplicity, if `asChild` is passed, render children directly with button styling applied via className. The simplest approach: just accept `asChild` as a prop and when true, use a `span` wrapper instead. Actually, the cleanest approach for Next.js is to just use the Button's className on the Link directly. Remove `asChild` from Button and instead just apply className directly in Navbar:

Update the Navbar CTA to:

```typescript
<Link
  href="/apply"
  className="inline-flex items-center justify-center font-semibold rounded-button transition-all duration-200 bg-primary text-white hover:bg-primary/90 shadow-sm px-4 py-2 text-sm"
>
  Get Your Rate
</Link>
```

**Step 3: Verify Navbar renders**

Add Navbar to `src/app/layout.tsx` body, above `{children}`:

```typescript
import { Navbar } from "@/components/layout/Navbar";

// In the body:
<Navbar />
{children}
```

```bash
npm run dev
```

Expected: Sticky navbar with logo, links, and CTA button. Mobile hamburger toggles drawer.

**Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/app/layout.tsx
git commit -m "feat: add sticky Navbar with mobile drawer"
```

---

### Task 5: Build Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Create Footer**

Create `src/components/layout/Footer.tsx`:

```typescript
import Link from "next/link";

const footerColumns = [
  {
    title: "Procedures",
    links: [
      { href: "/procedures/dental-loans", label: "Dental Loans" },
      { href: "/procedures/ivf-financing", label: "IVF Financing" },
      { href: "/procedures/breast-augmentation-loans", label: "Cosmetic Surgery" },
      { href: "/procedures/lasik-loans", label: "LASIK Loans" },
      { href: "/procedures/bariatric-surgery-loans", label: "Bariatric Surgery" },
      { href: "/procedures", label: "View All →" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/calculator", label: "Loan Calculator" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/guides", label: "Guides" },
      { href: "/compare", label: "Compare Options" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-text-dark text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-section-x">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance */}
        <div className="border-t border-white/10 pt-8 space-y-4">
          <p className="text-xs leading-relaxed">
            CosmediLoans is a lead generation service that connects consumers with
            licensed finance brokers. We do not provide credit, financial advice, or
            act as a lender. All loan applications are subject to lender assessment
            and approval. Rates and terms vary based on individual circumstances.
          </p>
          <p className="text-xs leading-relaxed">
            [PLACEHOLDER: Credit Representative Number] | [PLACEHOLDER: Australian
            Credit Licence Number] | [PLACEHOLDER: Credit Guide Link]
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} CosmediLoans. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Add Footer to layout**

Add to `src/app/layout.tsx` body, after `{children}`:

```typescript
import { Footer } from "@/components/layout/Footer";

// In the body:
<Navbar />
{children}
<Footer />
```

**Step 3: Verify**

```bash
npm run dev
```

Expected: Dark footer with 4 columns and compliance section.

**Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/layout.tsx
git commit -m "feat: add Footer with nav columns and compliance placeholders"
```

---

## Phase 3: Data Layer & Core Libraries

### Task 6: Create Procedure Data

**Files:**
- Create: `src/data/procedures.ts`

**Step 1: Create the procedures data file**

Create `src/data/procedures.ts` with the full typed dataset. This is the programmatic SEO engine — every procedure page is generated from this file.

```typescript
export interface CostRow {
  subProcedure: string;
  costRange: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Procedure {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  icon: string;
  avgCostRange: string;
  rateFrom: string;
  maxTerm: string;
  costTable: CostRow[];
  repaymentExamples: { amount: number; rate: number; term: number }[];
  faqs: FAQ[];
  relatedSlugs: string[];
  blogCategory: string;
  financingDescription: string;
  benefits: Benefit[];
}

export const procedures: Procedure[] = [
  {
    slug: "dental-loans",
    title: "Dental Loans",
    h1: "Dental Loan Financing Australia",
    metaTitle: "Dental Loans Australia | Finance From 6.99% | CosmediLoans",
    metaDescription:
      "Compare dental loan rates from 20+ lenders. Finance implants, veneers, crowns & more. Free quotes in 60 seconds. No credit impact.",
    heroDescription:
      "Dental work can be expensive — but it doesn't have to be out of reach. Whether you need implants, veneers, or a full restoration, our brokers compare 20+ lenders to find you the lowest dental loan rate in Australia.",
    icon: "🦷",
    avgCostRange: "$3,000 – $50,000",
    rateFrom: "6.99%",
    maxTerm: "7 years",
    costTable: [
      { subProcedure: "Single Dental Implant", costRange: "$3,000 – $6,500" },
      { subProcedure: "Full Mouth Implants (All-on-4)", costRange: "$20,000 – $50,000" },
      { subProcedure: "Porcelain Crown", costRange: "$1,200 – $2,000" },
      { subProcedure: "Dental Bridge (3 units)", costRange: "$2,500 – $5,000" },
      { subProcedure: "Root Canal Treatment", costRange: "$800 – $1,500" },
    ],
    repaymentExamples: [
      { amount: 5000, rate: 6.99, term: 3 },
      { amount: 15000, rate: 7.99, term: 5 },
      { amount: 35000, rate: 8.99, term: 7 },
    ],
    faqs: [
      {
        question: "How much do dental implants cost in Australia?",
        answer: "A single dental implant in Australia costs between $3,000 and $6,500 depending on the dentist, location, and complexity. Full mouth implants (All-on-4) range from $20,000 to $50,000 per arch.",
      },
      {
        question: "Can I finance dental work with bad credit?",
        answer: "Yes. Our broker network includes lenders who work with a range of credit profiles. While rates may be higher, many patients with imperfect credit still qualify for dental financing.",
      },
      {
        question: "Is dental financing interest-free?",
        answer: "Some dental clinics offer interest-free payment plans for smaller amounts. For larger procedures, a broker-matched personal loan often provides better value with competitive rates from 6.99% p.a.",
      },
      {
        question: "How long does dental loan approval take?",
        answer: "Most dental loan applications receive a decision within hours. Some lenders provide same-day approval, with funds disbursed within 1-3 business days.",
      },
      {
        question: "Can I finance multiple dental procedures at once?",
        answer: "Absolutely. You can bundle multiple procedures into a single loan — for example, combining implants with crowns or veneers into one financing plan.",
      },
      {
        question: "What's the minimum loan amount for dental work?",
        answer: "Most lenders in our network offer dental loans starting from $2,000. For smaller amounts, a buy-now-pay-later option may be more suitable.",
      },
      {
        question: "Do I need a deposit for dental financing?",
        answer: "No deposit is required for most dental loans through our broker network. The full amount can typically be financed.",
      },
      {
        question: "Can I pay off my dental loan early?",
        answer: "Most lenders allow early repayment with no penalty or reduced fees. Your broker will confirm the early repayment terms before you accept.",
      },
    ],
    relatedSlugs: ["veneers-financing", "invisalign-financing", "medical-loan"],
    blogCategory: "dental",
    financingDescription:
      "The most common way to finance dental work in Australia is through a personal loan matched by a broker. This gives you a fixed rate, fixed term, and predictable repayments — unlike credit cards or BNPL which can have hidden costs.",
    benefits: [
      {
        title: "Specialist Dental Financing",
        description: "We help patients finance dental work every day and understand the costs involved.",
      },
      {
        title: "Rates From 6.99% p.a.",
        description: "Our 20+ lender network means more competition and lower rates for your dental loan.",
      },
      {
        title: "Finance $2,000 – $100,000",
        description: "From a single crown to full mouth reconstruction — we cover it all.",
      },
      {
        title: "Same-Day Decisions",
        description: "Most patients hear back within hours so you can book your appointment sooner.",
      },
    ],
  },
  {
    slug: "ivf-financing",
    title: "IVF Financing",
    h1: "IVF & Fertility Financing Australia",
    metaTitle: "IVF Financing Australia | Fertility Loans From 6.99% | CosmediLoans",
    metaDescription:
      "Finance your IVF treatment with rates from 6.99%. Compare 20+ lenders in 60 seconds. No credit impact. Loans from $5,000 to $100,000.",
    heroDescription:
      "Starting a family shouldn't be limited by finances. IVF and fertility treatments are a significant investment, and our brokers help you find the most affordable way to fund your journey — comparing 20+ lenders for the best rate.",
    icon: "👶",
    avgCostRange: "$5,000 – $60,000",
    rateFrom: "6.99%",
    maxTerm: "7 years",
    costTable: [
      { subProcedure: "Single IVF Cycle", costRange: "$8,000 – $15,000" },
      { subProcedure: "IVF with ICSI", costRange: "$10,000 – $18,000" },
      { subProcedure: "Egg Freezing (per cycle)", costRange: "$5,000 – $8,000" },
      { subProcedure: "Frozen Embryo Transfer", costRange: "$3,000 – $5,000" },
      { subProcedure: "IUI Treatment", costRange: "$1,500 – $4,000" },
      { subProcedure: "Donor Egg IVF", costRange: "$15,000 – $30,000" },
    ],
    repaymentExamples: [
      { amount: 10000, rate: 6.99, term: 3 },
      { amount: 20000, rate: 7.99, term: 5 },
      { amount: 45000, rate: 8.99, term: 7 },
    ],
    faqs: [
      {
        question: "How much does IVF cost in Australia?",
        answer: "A single IVF cycle in Australia typically costs between $8,000 and $15,000 out of pocket after Medicare rebates. Multiple cycles can bring total costs to $30,000-$60,000.",
      },
      {
        question: "Can I get a loan for IVF treatment?",
        answer: "Yes. IVF financing is one of the most common medical loans we arrange. Our brokers compare 20+ lenders to find competitive rates for fertility treatment loans.",
      },
      {
        question: "Does Medicare cover IVF costs?",
        answer: "Medicare provides rebates for some IVF costs, but significant out-of-pocket expenses remain. A fertility loan can bridge the gap between Medicare rebates and total treatment costs.",
      },
      {
        question: "Can I finance multiple IVF cycles?",
        answer: "Yes. Many patients borrow enough to cover 2-3 cycles upfront, reducing the stress of reapplying if additional cycles are needed.",
      },
      {
        question: "What if my IVF treatment costs change?",
        answer: "If your treatment plan changes and you need additional funding, your broker can help you adjust your loan or apply for a top-up.",
      },
      {
        question: "Is IVF financing available with bad credit?",
        answer: "Our network includes lenders who consider a range of credit profiles. While approval isn't guaranteed, many patients with less-than-perfect credit find suitable options.",
      },
      {
        question: "How quickly can I get approved for IVF financing?",
        answer: "Most applications receive a decision within hours. Funds are typically available within 1-3 business days of acceptance.",
      },
      {
        question: "Can I include medication costs in my IVF loan?",
        answer: "Yes. Your loan can cover all fertility-related expenses including medication, consultations, procedures, and related medical costs.",
      },
    ],
    relatedSlugs: ["fertility-treatment-loans", "medical-loan", "dental-loans"],
    blogCategory: "fertility",
    financingDescription:
      "A personal loan through a broker is the most popular way to finance IVF in Australia. It provides a lump sum at a fixed rate, letting you focus on your treatment without financial stress.",
    benefits: [
      {
        title: "Specialist Fertility Financing",
        description: "We understand the emotional and financial weight of IVF. Our brokers handle the finance so you can focus on treatment.",
      },
      {
        title: "Rates From 6.99% p.a.",
        description: "Multiple lenders competing means a better rate for your fertility loan.",
      },
      {
        title: "Cover Multiple Cycles",
        description: "Borrow enough for 2-3 cycles upfront so you're financially prepared for your full journey.",
      },
      {
        title: "Fast, Sensitive Service",
        description: "Same-day decisions with a process that respects the personal nature of fertility treatment.",
      },
    ],
  },
  // REMAINING PROCEDURES — same structure, populated at build time.
  // For initial implementation, add stub entries for all 16 remaining procedures.
  // Each stub has the same shape but with placeholder content marked [TODO].
];

// Helper to get a procedure by slug
export function getProcedureBySlug(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}

// Helper to get all slugs for generateStaticParams
export function getAllProcedureSlugs(): string[] {
  return procedures.map((p) => p.slug);
}
```

Note: The file should include full data for dental-loans and ivf-financing as examples. For the remaining 16 procedures, add stub entries following the exact same type shape. Each stub should have realistic `metaTitle`, `metaDescription`, and `h1` values but can use `[TODO: Write unique content]` for longer text fields. These will be filled in during the content phase.

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No type errors.

**Step 3: Commit**

```bash
git add src/data/procedures.ts
git commit -m "feat: add procedure data layer with types and 2 complete entries"
```

---

### Task 7: Create Comparison Data

**Files:**
- Create: `src/data/comparisons.ts`

**Step 1: Create comparisons data file**

Create `src/data/comparisons.ts` with full typed dataset for all 11 comparison pages. Include 2 complete entries (Afterpay, personal-loan) and stubs for the rest.

Structure mirrors the design doc: `ComparisonRow[]` for the feature table, `chooseUs`/`chooseThem` bullet arrays, and `faqs`.

```typescript
export interface ComparisonRow {
  feature: string;
  us: string;
  them: string;
}

export interface ComparisonFAQ {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  competitorName: string;
  competitorType: "bnpl" | "lender" | "generic";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  verdict: string;
  features: ComparisonRow[];
  howWeWork: string;
  howTheyWork: string;
  chooseUs: string[];
  chooseThem: string[];
  faqs: ComparisonFAQ[];
  lastReviewed: string;
  relatedProcedureSlugs: string[];
}

export const comparisons: Comparison[] = [
  {
    slug: "cosmediloans-vs-afterpay",
    competitorName: "Afterpay",
    competitorType: "bnpl",
    h1: "CosmediLoans vs Afterpay: Which Is Better for Medical Financing?",
    metaTitle: "CosmediLoans vs Afterpay (2025) | Medical Financing Compared",
    metaDescription:
      "Compare CosmediLoans broker-matched medical loans vs Afterpay BNPL. See which is better for dental, IVF, cosmetic surgery & more.",
    verdict:
      "CosmediLoans compares 20+ lenders to find personalised rates for any medical procedure up to $100,000. Afterpay offers interest-free instalments but with a $2,000 limit for most users. CosmediLoans is better for any procedure over $2,000 or where you want the lowest long-term cost. Afterpay suits small cosmetic treatments you can repay in 6 weeks.",
    features: [
      { feature: "Maximum Amount", us: "$2,000 – $100,000", them: "Up to $2,000 (standard)" },
      { feature: "Interest Rate", us: "From 6.99% p.a. (personalised)", them: "0% (but late fees apply)" },
      { feature: "Repayment Term", us: "1 – 7 years (flexible)", them: "4 fortnightly payments (6 weeks)" },
      { feature: "Procedure Coverage", us: "All medical procedures", them: "Select retail partners" },
      { feature: "Credit Check", us: "Soft pull (no impact)", them: "Soft pull" },
      { feature: "Approval Speed", us: "Same day", them: "Instant (for small amounts)" },
      { feature: "Late Fees", us: "None (fixed repayments)", them: "Up to $68 per missed payment" },
      { feature: "Best For", us: "Larger procedures ($2K+)", them: "Small purchases under $2K" },
    ],
    howWeWork:
      "CosmediLoans connects you with a personal broker who compares rates from 20+ lenders. You fill out one application, and your broker finds the lowest rate for your specific procedure and financial situation. It's free, there's no credit impact for the initial check, and you get a dedicated person managing your application.",
    howTheyWork:
      "Afterpay is a buy-now-pay-later service that splits your purchase into 4 fortnightly payments with no interest. It's available at select retail partners and medical providers who have partnered with Afterpay. The standard limit is around $2,000, though long-term users may get higher limits.",
    chooseUs: [
      "Your procedure costs more than $2,000",
      "You want the lowest possible interest rate across multiple lenders",
      "You need flexible repayment terms (1-7 years)",
      "You want a personal broker managing your application",
      "You're financing IVF, major dental work, or surgery",
    ],
    chooseThem: [
      "Your treatment costs under $2,000",
      "You can comfortably repay in 6 weeks",
      "Your provider accepts Afterpay",
      "You want instant approval for a small amount",
    ],
    faqs: [
      {
        question: "Is CosmediLoans better than Afterpay for medical procedures?",
        answer: "For procedures over $2,000, CosmediLoans typically offers better value through competitive loan rates and flexible terms. Afterpay is better suited to smaller treatments under $2,000 that you can repay quickly.",
      },
      {
        question: "Can I use Afterpay for dental implants?",
        answer: "Afterpay's standard limit of ~$2,000 makes it unsuitable for most dental implant procedures, which cost $3,000-$50,000. A broker-matched loan through CosmediLoans is a better fit.",
      },
      {
        question: "Does Afterpay charge interest?",
        answer: "Afterpay doesn't charge interest, but it does charge late fees of up to $68 per missed payment. For larger amounts with longer repayment needs, a personal loan with a fixed rate can be more predictable.",
      },
      {
        question: "Can I use both Afterpay and CosmediLoans?",
        answer: "Yes. Some patients use Afterpay for minor follow-up treatments and a CosmediLoans-matched loan for the main procedure.",
      },
      {
        question: "Which has a faster approval process?",
        answer: "Afterpay offers instant approval for small amounts. CosmediLoans provides same-day decisions for larger loans, with funds typically available within 1-3 business days.",
      },
      {
        question: "What's the maximum I can borrow with each?",
        answer: "Afterpay: typically $2,000 (up to $4,000 for long-term users). CosmediLoans: $2,000 to $100,000 depending on your financial situation.",
      },
    ],
    lastReviewed: "2025-03-01",
    relatedProcedureSlugs: ["dental-loans", "ivf-financing", "breast-augmentation-loans"],
  },
  // Add remaining 10 comparison stubs following the same structure...
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/data/comparisons.ts
git commit -m "feat: add comparison data layer with Afterpay complete entry"
```

---

### Task 8: Create Calculator Library and Lead Submission API

**Files:**
- Create: `src/lib/calculator.ts`
- Create: `src/lib/utm.ts`
- Create: `src/lib/leads.ts`
- Create: `src/app/api/leads/route.ts`

**Step 1: Create calculator logic**

Create `src/lib/calculator.ts`:

```typescript
export interface AmortisationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface CalculationResult {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  schedule: AmortisationRow[];
}

export function calculateRepayment(
  principal: number,
  annualRate: number,
  termYears: number
): CalculationResult {
  if (principal <= 0 || termYears <= 0) {
    return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0, schedule: [] };
  }

  const numPayments = termYears * 12;

  // Handle 0% interest rate
  if (annualRate === 0) {
    const monthlyPayment = principal / numPayments;
    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalRepayment: principal,
      totalInterest: 0,
      schedule: Array.from({ length: numPayments }, (_, i) => ({
        month: i + 1,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(monthlyPayment * 100) / 100,
        interest: 0,
        balance: Math.round((principal - monthlyPayment * (i + 1)) * 100) / 100,
      })),
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const schedule: AmortisationRow[] = [];
  let balance = principal;

  for (let i = 1; i <= numPayments; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance -= principalPaid;

    schedule.push({
      month: i,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    });
  }

  const totalRepayment = monthlyPayment * numPayments;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    totalInterest: Math.round((totalRepayment - principal) * 100) / 100,
    schedule,
  };
}
```

**Step 2: Create UTM utility**

Create `src/lib/utm.ts`:

```typescript
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type UTMParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>;

const STORAGE_KEY = "cosmedi_utm";

export function captureUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }

  return utm;
}

export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
```

**Step 3: Create lead submission library**

Create `src/lib/leads.ts`:

```typescript
import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  procedure: z.string().min(1, "Please select a procedure"),
  amount: z.string().min(1, "Please enter an amount"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  pageOrigin: z.string().optional(),
});

export type LeadData = z.infer<typeof leadSchema>;
```

**Step 4: Create API route**

Create `src/app/api/leads/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const lead = result.data;

    // TODO: Forward to webhook/CRM
    // For now, log and return success
    console.log("New lead received:", lead);

    // Placeholder for webhook forwarding:
    // const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(lead),
    //   });
    // }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add src/lib/ src/app/api/
git commit -m "feat: add calculator lib, UTM tracking, lead schema, and API route"
```

---

## Phase 4: Homepage

### Task 9: Build Homepage Sections

**Files:**
- Create: `src/components/lead-capture/HeroLeadForm.tsx`
- Create: `src/components/content/TrustBar.tsx`
- Create: `src/components/content/HowItWorks.tsx`
- Create: `src/components/procedures/ProcedureCard.tsx`
- Create: `src/components/content/TestimonialGrid.tsx`
- Create: `src/components/content/FAQAccordion.tsx`
- Create: `src/components/seo/JsonLd.tsx`
- Modify: `src/app/page.tsx`

This is a large task. Build each component individually, then compose them on the homepage. Implement each component following the design doc Section 6.1 specifications exactly. Key requirements:

- **HeroLeadForm**: 5 fields (name, phone, email, procedure dropdown, amount), Zod validation via react-hook-form, submits to `/api/leads`, captures UTM params, shows success state, pre-selects procedure if `procedure` prop passed
- **TrustBar**: 4 stat items with icons (use Lucide icons not emoji in production): Building2 (20+ Lenders), Zap (60-Second Quotes), ShieldCheck (No Credit Impact), BadgeCheck ($50M+ Funded)
- **HowItWorks**: 3 numbered step cards with title + description
- **ProcedureCard**: Icon, title, tagline, links to `/procedures/[slug]`, hover lift effect
- **TestimonialGrid**: 3 cards with star rating, quote, author, procedure. Placeholder content.
- **FAQAccordion**: Wrapper around the `Accordion` UI component that also injects FAQPage JSON-LD schema
- **JsonLd**: Generic component that renders a `<script type="application/ld+json">` tag

Compose all sections on `src/app/page.tsx` in the order specified in the design doc. Include the hero gradient background, section padding, and responsive grid layouts.

**Step 1:** Build each component file one at a time.
**Step 2:** Compose on `src/app/page.tsx`.
**Step 3:** Run `npm run dev` and visually verify all sections render correctly.
**Step 4:** Run `npm run build` to verify no build errors.
**Step 5:** Commit.

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: build complete homepage with all sections"
```

---

### Task 10: Build Sticky Mobile CTA and Scroll-Triggered CTA

**Files:**
- Create: `src/components/lead-capture/StickyMobileCTA.tsx`
- Create: `src/components/lead-capture/ScrollCTA.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create StickyMobileCTA**

Fixed bottom bar, visible only on mobile (`md:hidden`), contains "Get Your Rate →" button linking to `/apply`. Has a small top shadow to separate from content.

**Step 2: Create ScrollCTA**

Client component that listens to scroll position. At 60% page depth, slides in a banner at the bottom of the viewport with: "Still researching? Get a free rate check — no commitment →" and a dismiss button. Sets a cookie on dismiss so it doesn't re-appear.

**Step 3:** Add both to `layout.tsx` inside the body.
**Step 4:** Verify on mobile viewport in dev tools.
**Step 5:** Commit.

```bash
git add src/components/lead-capture/ src/app/layout.tsx
git commit -m "feat: add sticky mobile CTA and scroll-triggered CTA banner"
```

---

## Phase 5: Procedure Pages (Programmatic SEO)

### Task 11: Build Procedure Page Template and Generate Static Pages

**Files:**
- Create: `src/app/procedures/page.tsx` (hub page)
- Create: `src/app/procedures/[slug]/page.tsx` (template)
- Create: `src/components/procedures/ProcedureHero.tsx`
- Create: `src/components/procedures/ProcedureCostTable.tsx`
- Create: `src/components/procedures/ProcedureFAQ.tsx`
- Create: `src/components/lead-capture/InlineLeadForm.tsx`
- Create: `src/components/seo/BreadcrumbSchema.tsx`

**Step 1: Create the `[slug]/page.tsx` template**

This is the programmatic SEO engine. Key requirements:

- Uses `generateStaticParams()` from `getAllProcedureSlugs()` to generate all 18 pages at build time
- Uses `generateMetadata()` for per-page meta title, description, canonical, OG tags
- Renders all 12 sections from design doc Section 6.2 in order
- Pre-selects procedure in the HeroLeadForm based on current page slug
- Includes BreadcrumbList + FAQPage + MedicalProcedure JSON-LD schema
- Auto-calculates repayment examples using `calculateRepayment()` from the procedure's `repaymentExamples` data

```typescript
// src/app/procedures/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProcedureBySlug, getAllProcedureSlugs } from "@/data/procedures";

export function generateStaticParams() {
  return getAllProcedureSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const procedure = getProcedureBySlug(params.slug);
  if (!procedure) return {};

  return {
    title: procedure.metaTitle,
    description: procedure.metaDescription,
    alternates: { canonical: `/procedures/${procedure.slug}` },
    openGraph: {
      title: procedure.metaTitle,
      description: procedure.metaDescription,
      url: `/procedures/${procedure.slug}`,
    },
  };
}

export default function ProcedurePage({ params }: { params: { slug: string } }) {
  const procedure = getProcedureBySlug(params.slug);
  if (!procedure) notFound();

  return (
    <>
      {/* Breadcrumb */}
      {/* ProcedureHero with lead form */}
      {/* Cost Table */}
      {/* Financing Options */}
      {/* Repayment Examples */}
      {/* How It Works (contextualised) */}
      {/* Why Finance With Us */}
      {/* ProcedureFAQ */}
      {/* Related Procedures */}
      {/* Inline CTA */}
      {/* JSON-LD schemas */}
    </>
  );
}
```

**Step 2: Create the hub page** (`/procedures`) — grid of all ProcedureCards with filter pills.

**Step 3:** Build `ProcedureHero`, `ProcedureCostTable`, `ProcedureFAQ`, `InlineLeadForm`, `BreadcrumbSchema` components.

**Step 4:** Verify build generates all static pages:

```bash
npm run build
```

Expected: Build output shows `/procedures/dental-loans`, `/procedures/ivf-financing`, etc. as static pages.

**Step 5:** Commit.

```bash
git add src/app/procedures/ src/components/procedures/ src/components/lead-capture/InlineLeadForm.tsx src/components/seo/BreadcrumbSchema.tsx
git commit -m "feat: add programmatic procedure pages with SSG (18 pages)"
```

---

## Phase 6: Calculator, Comparison & Supporting Pages

### Task 12: Build Calculator Page

**Files:**
- Create: `src/app/calculator/page.tsx`
- Create: `src/components/calculator/LoanCalculator.tsx`
- Create: `src/components/calculator/RepaymentTable.tsx`

**Step 1:** Build `LoanCalculator.tsx` as a client component with:
- Procedure dropdown (auto-adjusts amount range on selection)
- Amount slider + input ($1,000–$100,000)
- Rate slider + input (5.99%–15.99%, default 7.99%)
- Term button group (1/2/3/5/7 years)
- Live results card (monthly payment, total, interest)
- "Get This Rate →" CTA button
- Debounced updates (60ms)
- Uses `calculateRepayment()` from `src/lib/calculator.ts`

**Step 2:** Build `RepaymentTable.tsx` — expandable full amortisation schedule.

**Step 3:** Build `src/app/calculator/page.tsx` with all sections from design doc 6.4: hero, calculator, email capture, repayment schedule, rate comparison visual, SEO content, FAQ, CTA.

**Step 4:** Verify interactivity works.
**Step 5:** Commit.

```bash
git add src/app/calculator/ src/components/calculator/
git commit -m "feat: add interactive loan calculator with amortisation schedule"
```

---

### Task 13: Build Comparison Pages

**Files:**
- Create: `src/app/compare/page.tsx` (hub)
- Create: `src/app/compare/[slug]/page.tsx` (template)
- Create: `src/components/compare/ComparisonTable.tsx`
- Create: `src/components/compare/ComparisonHero.tsx`

Follow the same `generateStaticParams` pattern as procedures. Build the hub page with summary matrix. Build the template with all sections from design doc 6.3.

**Step 1:** Build components.
**Step 2:** Build pages.
**Step 3:** Verify static generation.
**Step 4:** Commit.

```bash
git add src/app/compare/ src/components/compare/
git commit -m "feat: add comparison pages with static generation (11 pages)"
```

---

### Task 14: Build Supporting Pages

**Files:**
- Create: `src/app/how-it-works/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/apply/page.tsx`
- Create: `src/app/thank-you/page.tsx`
- Create: `src/app/faq/page.tsx`
- Create: `src/app/privacy-policy/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/disclaimer/page.tsx`
- Create: `src/app/not-found.tsx` (custom 404)

Build each page per the design doc Section 6.6 and 6.7 specs. Each page should have proper `metadata` exports.

Key implementations:
- `/faq`: Client-side search filter across 34 items, 5 tabbed categories, FAQPage schema, "didn't find your answer?" form at bottom
- `/apply`: Full-width HeroLeadForm with extra trust signals
- `/thank-you`: Conversion pixel placeholder (GTM dataLayer push), confirmation message
- `/contact`: 2-column layout, contact form + details
- Legal pages: Complete documents with `[PLACEHOLDER]` fields

**Step 1:** Build all pages.
**Step 2:** Verify all routes resolve.
**Step 3:** Commit.

```bash
git add src/app/how-it-works/ src/app/about/ src/app/contact/ src/app/apply/ src/app/thank-you/ src/app/faq/ src/app/privacy-policy/ src/app/terms/ src/app/disclaimer/ src/app/not-found.tsx
git commit -m "feat: add all supporting pages (how-it-works, about, contact, faq, legal, 404)"
```

---

## Phase 7: Blog System

### Task 15: Configure MDX and Build Blog Infrastructure

**Files:**
- Modify: `next.config.mjs`
- Create: `src/lib/blog.ts` (MDX loader + helpers)
- Create: `src/app/blog/page.tsx` (index)
- Create: `src/app/blog/[slug]/page.tsx` (post template)
- Create: `src/app/blog/category/[category]/page.tsx` (category filter)
- Create: `src/components/content/BlogCard.tsx`
- Create: `src/components/content/NewsletterSignup.tsx`
- Create: `src/content/blog/` (directory for MDX posts)

**Step 1:** Configure MDX in `next.config.mjs`.

**Step 2:** Create `src/lib/blog.ts` — functions to read MDX files from `src/content/blog/`, parse frontmatter (title, date, category, excerpt, readTime), sort by date, filter by category.

**Step 3:** Create 2 sample blog posts as MDX files to test the system:
- `src/content/blog/how-much-do-dental-implants-cost-australia.mdx`
- `src/content/blog/how-to-finance-ivf-treatment.mdx`

**Step 4:** Build blog index, post template, and category pages. Include:
- Blog index: category filter pills, 3-column grid, pagination
- Post template: breadcrumb, TOC, MDX rendering, related posts, CTA
- Category page: filtered grid with intro text

**Step 5:** Build `BlogCard` and `NewsletterSignup` components.

**Step 6:** Verify blog pages render with sample posts.
**Step 7:** Commit.

```bash
git add next.config.mjs src/lib/blog.ts src/app/blog/ src/content/ src/components/content/BlogCard.tsx src/components/content/NewsletterSignup.tsx
git commit -m "feat: add MDX blog system with index, categories, and 2 sample posts"
```

---

## Phase 8: SEO Infrastructure & Polish

### Task 16: Add Sitemaps, RSS, robots.txt, and Schema Markup

**Files:**
- Create: `src/app/sitemap.ts` (dynamic sitemap generation)
- Create: `src/app/blog-sitemap.xml/route.ts` (blog sitemap)
- Create: `src/app/robots.ts`
- Create: `src/app/blog/rss.xml/route.ts` (RSS feed)
- Modify: `src/app/layout.tsx` (add Organization schema)

**Step 1:** Create `src/app/sitemap.ts` using Next.js sitemap generation. Include all static pages, all procedure pages, all comparison pages, all blog posts. Set appropriate `changeFrequency` and `priority` values.

**Step 2:** Create blog-specific sitemap at `/blog-sitemap.xml`.

**Step 3:** Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you", "/apply", "/api/"],
    },
    sitemap: "https://cosmedloans.com.au/sitemap.xml",
  };
}
```

**Step 4:** Create RSS feed route that generates XML from blog posts.

**Step 5:** Add Organization JSON-LD to root layout.

**Step 6:** Verify sitemap, robots.txt, and RSS render correctly:

```bash
npm run build && npm run start
# Check: localhost:3000/sitemap.xml
# Check: localhost:3000/robots.txt
# Check: localhost:3000/blog/rss.xml
```

**Step 7:** Commit.

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/blog-sitemap.xml/ src/app/blog/rss.xml/ src/app/layout.tsx
git commit -m "feat: add sitemap, robots.txt, RSS feed, and Organization schema"
```

---

### Task 17: Analytics and UTM Tracking Components

**Files:**
- Create: `src/components/analytics/UTMCapture.tsx`
- Create: `src/components/analytics/ConversionPixel.tsx`
- Modify: `src/app/layout.tsx` (add UTMCapture)
- Modify: `src/app/thank-you/page.tsx` (add ConversionPixel)

**Step 1:** Build `UTMCapture.tsx` — client component that runs `captureUTMParams()` on mount.

**Step 2:** Build `ConversionPixel.tsx` — client component that pushes a conversion event to `window.dataLayer` on mount (for GTM). Include placeholder for GA4 event.

**Step 3:** Add UTMCapture to root layout.
**Step 4:** Add ConversionPixel to thank-you page.
**Step 5:** Commit.

```bash
git add src/components/analytics/ src/app/layout.tsx src/app/thank-you/
git commit -m "feat: add UTM tracking and conversion pixel components"
```

---

### Task 18: Final Build Verification and Cleanup

**Step 1: Full production build**

```bash
npm run build
```

Expected: All pages generate successfully. No TypeScript errors. No build warnings.

**Step 2: Verify page count**

Check build output for total static pages generated. Should include:
- 1 homepage
- 1 procedures hub + 18 procedure pages
- 1 compare hub + 11 comparison pages
- 1 calculator
- 8 supporting pages (how-it-works, about, contact, apply, thank-you, faq, privacy, terms, disclaimer)
- 1 blog index + 2 sample posts + category pages
- 1 404 page

**Step 3: Run production server and spot-check**

```bash
npm run start
```

Check:
- Homepage loads with all sections
- Lead form submits and redirects to /thank-you
- Calculator sliders work and update live
- Procedure pages have unique content and working forms
- Comparison pages render feature tables
- Blog posts render MDX content
- FAQ search filters work
- Sitemap.xml lists all pages
- robots.txt renders correctly
- Mobile responsive at 375px viewport

**Step 4: Commit final state**

```bash
git add -A
git commit -m "chore: final build verification and cleanup"
```

---

## Summary

| Phase | Tasks | What It Delivers |
|-------|-------|-----------------|
| 1: Scaffold | Tasks 1-3 | Next.js project, design tokens, UI components |
| 2: Layout | Tasks 4-5 | Navbar, Footer, site shell |
| 3: Data | Tasks 6-8 | Procedure data, comparison data, calculator lib, API route |
| 4: Homepage | Tasks 9-10 | Complete homepage with all sections, mobile CTAs |
| 5: Procedures | Task 11 | 18 programmatic SEO procedure pages |
| 6: Features | Tasks 12-14 | Calculator, comparisons, all supporting pages |
| 7: Blog | Task 15 | MDX blog system with sample posts |
| 8: SEO | Tasks 16-18 | Sitemaps, RSS, schema, analytics, final verification |

**Total: 18 tasks across 8 phases.**
