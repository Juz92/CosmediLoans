import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Stethoscope, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";
import { HomeHero } from "@/components/content/HomeHero";
import { HowItWorks } from "@/components/content/HowItWorks";
import { PartnerLogos } from "@/components/content/PartnerLogos";
import { ProcessVideo } from "@/components/content/ProcessVideo";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { ProcedureBrowseDropdown } from "@/components/procedures/ProcedureBrowseDropdown";
import { TestimonialGrid } from "@/components/content/TestimonialGrid";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { StickyMobileCTA } from "@/components/lead-capture/StickyMobileCTA";
import { ScrollCTA } from "@/components/lead-capture/ScrollCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { LoanFeatures } from "@/components/content/LoanFeatures";
import { procedures } from "@/data/procedures";
import { absoluteUrl, BRAND, SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* ── Procedure Grid Data (curated 8) ────────────────────────────── */
const featuredSlugs = [
  "dental-loans",
  "ivf-financing",
  "breast-augmentation-loans",
  "cosmetic-surgery-loans",
  "hair-transplant-loans",
  "lasik-loans",
  "bariatric-surgery-loans",
  "vet-bill-loans",
];
const featuredProcedures = featuredSlugs
  .map((slug) => procedures.find((p) => p.slug === slug))
  .filter(Boolean) as typeof procedures;

/* ── Why Choose Us Benefits ─────────────────────────────────────── */
const benefits = [
  {
    icon: Stethoscope,
    title: "Broker-Matched, Not Bank-Locked",
    description:
      "Unlike going direct to a bank, our brokers compare 20+ lenders to find the most competitive rate for your specific situation.",
  },
  {
    icon: Heart,
    title: "Built for Medical",
    description:
      "We specialise exclusively in medical procedure financing. Our brokers understand the costs, timelines, and urgency involved.",
  },
  {
    icon: DollarSign,
    title: "Broker-Matched Savings",
    description:
      "We're paid by lenders, not by you. No hidden fees, ever.",
  },
  {
    icon: Clock,
    title: "Approved in Minutes",
    description:
      "Most patients receive a decision within hours. Same-day approvals are common, so you can book your procedure sooner.",
  },
];

/* ── Loan Example Cards ─────────────────────────────────────────── */
const loanExamples = [
  {
    procedure: "Dental Work",
    amount: "$5,000",
    rate: "6.99%",
    term: "3 years",
    monthly: "$99",
  },
  {
    procedure: "IVF Treatment",
    amount: "$15,000",
    rate: "7.99%",
    term: "5 years",
    monthly: "$297",
  },
  {
    procedure: "Cosmetic Surgery",
    amount: "$30,000",
    rate: "8.99%",
    term: "7 years",
    monthly: "$589",
  },
];

/* ── FAQ Items ───────────────────────────────────────────────────── */
const faqItems = [
  {
    question: "What is CosmediLoans?",
    answer:
      "CosmediLoans is a broker-matching service that helps Australian patients find the lowest interest rates on medical procedure financing. We compare offers from 20+ lenders to find the best deal for your situation.",
  },
  {
    question: "How much does it cost to use CosmediLoans?",
    answer:
      "There are no fees charged to you. We are paid by the lenders in our network, so there's never a hidden cost.",
  },
  {
    question: "Will checking my rate affect my credit score?",
    answer:
      "No. Our initial rate check uses a soft credit inquiry which does not impact your credit score. A hard inquiry only occurs if you choose to proceed with a formal application.",
  },
  {
    question: "What procedures can I finance?",
    answer:
      "We finance virtually any medical or cosmetic procedure including dental implants, veneers, IVF, breast augmentation, rhinoplasty, LASIK, bariatric surgery, hair transplants, and more. If your procedure is not listed, select 'Other' and we will still help.",
  },
  {
    question: "How quickly can I get approved?",
    answer:
      "Most patients receive a pre-approval decision within hours. Once you accept an offer, funds are typically disbursed within 1-3 business days, with some lenders offering same-day funding.",
  },
  {
    question: "What interest rates can I expect?",
    answer:
      "Rates start from 6.99% p.a. depending on your credit profile, loan amount, and term. Because we compare 20+ lenders, you are more likely to find a competitive rate than going to a single bank.",
  },
  {
    question: "Do I need a good credit score to apply?",
    answer:
      "We work with a range of credit profiles. While better credit scores typically receive lower rates, our broker network includes lenders who specialise in various credit situations.",
  },
  {
    question: "How much can I borrow?",
    answer:
      "Loan amounts typically range from $2,000 to $100,000 depending on the procedure and your financial situation. Terms range from 1 to 7 years.",
  },
  {
    question: "Is CosmediLoans a lender?",
    answer:
      "No. CosmediLoans is a lead generation and broker-matching service. We connect you with licensed finance brokers who then compare offers from their lender panels to find your best rate.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Most lenders in our network allow early repayment with no penalty or reduced fees. Your broker will confirm the specific early repayment terms before you accept any offer.",
  },
];

/* ── Organization Schema ─────────────────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: BRAND,
  url: SITE_ORIGIN,
  description:
    "Compare medical procedure financing rates from 20+ lenders. Broker-matched quotes for dental, IVF, cosmetic surgery and more.",
  areaServed: {
    "@type": "Country",
    name: "Australia",
  },
  // sameAs intentionally omitted: no verified social/profile URLs exist in
  // this repo yet. Add real profile URLs here (and in the footer) when the
  // owner provides them — never fabricate.
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: BRAND,
          url: SITE_ORIGIN,
          potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/procedures")}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <HomeHero />

      {/* ── AEO DEFINITION BLOCK, extractable by AI search ──────── */}
      <QuickAnswer
        id="what-is-cosmediloans"
        title="What is CosmediLoans?"
        facts={[
          { label: "Service", value: "Broker matching" },
          { label: "Panel", value: "20+ lenders" },
          { label: "Credit check", value: "Soft inquiry" },
        ]}
      >
        <p>
          CosmediLoans is an Australian broker-matching service that compares
          medical procedure loans from 20+ licensed lenders for dental, IVF,
          cosmetic surgery, orthopaedic, veterinary, and elective medical
          treatment. Patients can borrow $2,000 to $100,000 over terms of up to
          7 years at rates from 6.99% p.a., with a single soft-credit inquiry
          that does not affect credit score. The service is free to patients:
          brokers are paid by lenders on settlement, and brokers on the panel
          hold Australian Credit Licences under the National Consumer Credit
          Protection Act 2009.
        </p>
      </QuickAnswer>

      {/* ── PARTNER LOGOS ─────────────────────────────────────────── */}
      <PartnerLogos />

      {/* ── RATE CHECK VIDEO ──────────────────────────────────────── */}
      <ProcessVideo />

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── PROCEDURE GRID ────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Procedures We Finance
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              From dental implants to cosmetic surgery, we help Australians
              finance the care they need at rates they can afford.
            </p>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-4 md:overflow-visible md:snap-none md:pb-0">
            {featuredProcedures.map((proc) => (
              <div key={proc.slug} className="min-w-[220px] snap-start md:min-w-0">
                <ProcedureCard
                  slug={proc.slug}
                  icon={proc.icon}
                  title={proc.title}
                  avgCostRange={proc.avgCostRange}
                  rateFrom={proc.rateFrom}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/procedures"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Don&apos;t see your procedure? We finance all medical treatments
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="hidden sm:inline text-text-muted text-sm">·</span>
            <ProcedureBrowseDropdown />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Why Choose CosmediLoans
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              We&apos;re not a bank. We&apos;re your shortcut to the best
              medical loan rate in Australia.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <benefit.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-card-h4 text-text-dark mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOAN FEATURES ─────────────────────────────────────────── */}
      <LoanFeatures />

      {/* ── MEDICAL LOANS OVERVIEW ────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-4 text-center">
            Medical Loans for Dental, Cosmetic and Vet Care
          </h2>
          <div className="space-y-4 text-body text-text-body">
            <p>
              A medical loan is a personal loan used to pay for treatment, and
              it is not limited to one kind of care. The same broker-matched
              loan that covers{" "}
              <Link
                href="/procedures/dental-loans"
                className="text-primary font-semibold hover:underline"
              >
                dental work and payment plan alternatives
              </Link>{" "}
              also funds{" "}
              <Link
                href="/procedures/cosmetic-surgery-loans"
                className="text-primary font-semibold hover:underline"
              >
                cosmetic and plastic surgery
              </Link>
              , elective hospital procedures, and even{" "}
              <Link
                href="/procedures/vet-bill-loans"
                className="text-primary font-semibold hover:underline"
              >
                vet bills
              </Link>{" "}
              when the patient has four legs.
            </p>
            <p>
              Because the funds are paid to you rather than the provider, the
              loan works at any clinic, hospital, dentist, or vet in Australia,
              with one fixed repayment instead of a different payment plan at
              every door. If your treatment doesn&apos;t fit a category, our{" "}
              <Link
                href="/procedures/medical-loan"
                className="text-primary font-semibold hover:underline"
              >
                medical loans page
              </Link>{" "}
              covers how financing works for any procedure.
            </p>
          </div>
        </div>
      </section>

      {/* ── LOAN EXAMPLES ─────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Example Repayments
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              See what your repayments could look like. Rates vary by lender and
              credit profile, use our{" "}
              <Link
                href="/calculator"
                className="text-primary font-semibold hover:underline"
              >
                calculator
              </Link>{" "}
              for a personalised estimate.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {loanExamples.map((example) => (
              <Card key={example.procedure} className="text-center">
                <p className="text-sm font-semibold text-primary mb-1">
                  {example.procedure}
                </p>
                <p className="text-3xl font-bold text-text-dark mb-1">
                  {example.monthly}
                  <span className="text-base font-normal text-text-muted">
                    /mo
                  </span>
                </p>
                <div className="flex justify-center gap-3 text-xs text-text-muted mt-2">
                  <span>{example.amount}</span>
                  <span>&middot;</span>
                  <span>{example.rate} p.a.</span>
                  <span>&middot;</span>
                  <span>{example.term}</span>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted mt-6">
            Repayment examples are illustrative only. Actual rates and terms
            depend on your credit profile and lender.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <TestimonialGrid />

      {/* ── FAQ SECTION ───────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body text-text-body">
              Everything you need to know about medical procedure financing.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── CONVERSION COMPONENTS ─────────────────────────────────── */}
      <StickyMobileCTA />
      <ScrollCTA />
    </>
  );
}
