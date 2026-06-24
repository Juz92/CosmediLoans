import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProcedureBySlug,
  getAllProcedureSlugs,
  procedures,
} from "@/data/procedures";
import { getGuidesForProcedure } from "@/data/high-intent-guides";
import { getPriorityClusterForProcedure } from "@/data/priority-seo-clusters";
import { calculateRepayment } from "@/lib/calculator";
import { getProcedureCopy } from "@/lib/procedure-copy";
import { absoluteUrl, BRAND, LAST_REVIEWED } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { LastReviewed } from "@/components/seo/LastReviewed";
import { AEODefinitionBlock } from "@/components/seo/AEODefinitionBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { PriorityClusterLinks } from "@/components/seo/PriorityClusterLinks";
import { ProcedureHero } from "@/components/procedures/ProcedureHero";
import { ProcedureCostTable } from "@/components/procedures/ProcedureCostTable";
import { ProcedureFAQ } from "@/components/procedures/ProcedureFAQ";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { InlineLeadForm } from "@/components/lead-capture/InlineLeadForm";
import { StickyMobileCTA } from "@/components/lead-capture/StickyMobileCTA";
import { Card, Badge, Button } from "@/components/ui";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  CreditCard,
  Landmark,
  ShoppingBag,
  Star,
  Zap,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllProcedureSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
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
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProcedurePage({
  params,
}: {
  params: { slug: string };
}) {
  const procedure = getProcedureBySlug(params.slug);
  if (!procedure) notFound();

  const copy = getProcedureCopy(procedure);

  // Pre-calculate repayment examples
  const repaymentResults = procedure.repaymentExamples.map((ex) => ({
    ...ex,
    result: calculateRepayment(ex.amount, ex.rate, ex.term),
  }));

  // Resolve related procedures
  const relatedProcedures = procedure.relatedSlugs
    .map((slug) => procedures.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4);
  const relatedGuides = getGuidesForProcedure(procedure.slug).slice(0, 3);
  const priorityCluster = getPriorityClusterForProcedure(procedure.slug);

  // Procedure form key for inline form
  const procedureFormMap: Record<string, string> = {
    "dental-loans": "dental",
    "veneers-financing": "veneers",
    "invisalign-financing": "invisalign",
    "ivf-financing": "ivf",
    "fertility-treatment-loans": "ivf",
    "breast-augmentation-loans": "breast-augmentation",
    "rhinoplasty-financing": "rhinoplasty",
    "tummy-tuck-loans": "tummy-tuck",
    "liposuction-financing": "liposuction",
    "facelift-financing": "facelift",
    "lasik-loans": "lasik",
    "bariatric-surgery-loans": "bariatric",
    "weight-loss-surgery-loans": "bariatric",
    "hair-transplant-loans": "hair-transplant",
    "orthopedic-surgery-loans": "orthopedic",
    "dermatology-financing": "dermatology",
    "mommy-makeover-financing": "mommy-makeover",
    "cosmetic-surgery-loans": "other",
    "medical-loan": "other",
  };
  const defaultProcedure = procedureFormMap[procedure.slug] || "other";

  return (
    <>
      {/* ── JSON-LD: FinancialProduct (loan for this procedure) ── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          name: `${procedure.title} Financing`,
          description: procedure.heroDescription,
          url: absoluteUrl(`/procedures/${procedure.slug}`),
          dateModified: LAST_REVIEWED,
          provider: {
            "@type": "FinancialService",
            name: BRAND,
            url: absoluteUrl("/"),
            areaServed: { "@type": "Country", name: "Australia" },
          },
          category: "Personal Loan",
          annualPercentageRate: procedure.rateFrom,
          loanTerm: {
            "@type": "QuantitativeValue",
            maxValue: 7,
            unitCode: "ANN",
          },
          amount: {
            "@type": "MonetaryAmount",
            currency: "AUD",
            minValue: 2000,
            maxValue: 100000,
          },
        }}
      />

      {/* ── 1. Breadcrumb ── */}
      <div className="container-narrow pt-6 px-6 md:px-section-x flex items-center justify-between gap-4">
        <BreadcrumbSchema
          items={[
            { label: "Home", href: "/" },
            { label: "Procedures", href: "/procedures" },
            { label: procedure.title },
          ]}
        />
        <LastReviewed />
      </div>

      {/* ── 2. Procedure Hero ── */}
      <ProcedureHero procedure={procedure} />

      {/* ── 3. AEO Definition Block (self-contained, extractable) ── */}
      <AEODefinitionBlock procedure={procedure} />

      {/* ── 3. Cost Table ── */}
      <ProcedureCostTable
        costHeading={copy.costHeading}
        costTable={procedure.costTable}
      />

      {/* ── 4. Financing Options ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            {copy.financingTitle} Options
          </h2>
          <p className="text-body text-text-body mb-10 text-center max-w-2xl mx-auto">
            Compare the most popular ways to finance {copy.treatment} in Australia.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Medical Loan, Recommended */}
            <Card className="relative border-2 border-primary">
              <Badge className="absolute -top-3 left-6" variant="default">
                <Star className="h-3 w-3" /> Recommended
              </Badge>
              <div className="pt-4">
                <Landmark className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-text-dark mb-2">Medical Loan</h3>
                <ul className="space-y-2 text-sm text-text-body mb-5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Rates from {procedure.rateFrom} p.a.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Fixed repayments up to {procedure.maxTerm}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    20+ lenders compared by broker
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Borrow $2,000 – $100,000
                  </li>
                </ul>
                <Link href="/apply">
                  <Button className="w-full" size="md">
                    Get My Rate <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* BNPL */}
            <Card>
              <ShoppingBag className="h-8 w-8 text-text-muted mb-3" aria-hidden="true" />
              <h3 className="text-lg font-bold text-text-dark mb-2">Buy Now Pay Later</h3>
              <ul className="space-y-2 text-sm text-text-body mb-5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted mt-0.5 shrink-0" />
                  Interest-free periods available
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted mt-0.5 shrink-0" />
                  Quick approval
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  Limited to smaller amounts
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  Late fees if you miss payments
                </li>
              </ul>
              <Link href="/compare">
                <Button variant="secondary" className="w-full" size="md">
                  Compare Options
                </Button>
              </Link>
            </Card>

            {/* Credit Card */}
            <Card>
              <CreditCard className="h-8 w-8 text-text-muted mb-3" aria-hidden="true" />
              <h3 className="text-lg font-bold text-text-dark mb-2">Credit Card</h3>
              <ul className="space-y-2 text-sm text-text-body mb-5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted mt-0.5 shrink-0" />
                  Instant access if approved
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted mt-0.5 shrink-0" />
                  Rewards points on spend
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  High interest (18–22% p.a.)
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  Revolving debt risk
                </li>
              </ul>
              <Link href="/compare">
                <Button variant="secondary" className="w-full" size="md">
                  Compare Options
                </Button>
              </Link>
            </Card>
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-xs leading-5 text-text-muted">
            Rates from {procedure.rateFrom} p.a. are available to applicants with strong
            credit profiles. Your actual rate depends on your credit history, income and
            the lender, and all loans are subject to lender assessment and approval. Not
            all applicants will qualify for the lowest rate shown. CosmediLoans is a
            finance broker, not a lender.
          </p>
        </div>
      </section>

      {/* ── 5. Featured Snippet Box ── */}
      <QuickAnswer
        title={`${copy.financingTitle} in Australia`}
        facts={[
          { label: "Best fit", value: "Broker-matched loan" },
          { label: "Clinic choice", value: "Use your provider" },
          { label: "Repayments", value: "Fixed term" },
        ]}
        variant="wash"
      >
        <p>{procedure.financingDescription}</p>
      </QuickAnswer>

      {priorityCluster && (
        <PriorityClusterLinks cluster={priorityCluster} context="procedure" />
      )}

      {/* ── 6. Repayment Examples ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            {copy.financingTitle} Repayment Examples
          </h2>
          <p className="text-body text-text-body mb-10 text-center max-w-2xl mx-auto">
            See what your repayments could look like at different loan amounts and terms.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {repaymentResults.map((ex, i) => (
              <Card key={i} className="text-center">
                <p className="text-sm font-semibold text-primary mb-1">
                  ${ex.amount.toLocaleString()} loan
                </p>
                <p className="text-3xl font-bold text-text-dark mb-1">
                  ${Math.round(ex.result.monthlyPayment)}
                  <span className="text-base font-normal text-text-muted">/mo</span>
                </p>
                <p className="text-xs text-text-muted mb-4">
                  {ex.rate}% p.a. over {ex.term} {ex.term === 1 ? "year" : "years"}
                </p>
                <div className="border-t border-border pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-text-muted">Total Repayment</p>
                    <p className="font-semibold text-text-dark">
                      ${ex.result.totalRepayment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted">Total Interest</p>
                    <p className="font-semibold text-text-dark">
                      ${ex.result.totalInterest.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-text-muted text-center mt-6">
            * Repayments are indicative only. Actual rates depend on your credit
            profile.{" "}
            <Link
              href="/calculator"
              className="text-primary underline underline-offset-2 hover:text-primary-deep"
            >
              Use our calculator
            </Link>{" "}
            for a detailed breakdown.
          </p>
        </div>
      </section>

      {/* ── 7. How It Works ── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              How {copy.financingTitle} Works
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              From enquiry to funded in as little as 24 hours. Our streamlined process
              makes financing {copy.treatment} simple.
            </p>
          </div>
          <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {/* Connector line (desktop) */}
            <div
              className="absolute top-14 left-[16.67%] right-[16.67%] h-0.5 bg-border hidden md:block"
              aria-hidden="true"
            />
            {[
              {
                num: "1",
                title: "Tell Us What You Need",
                desc: `Fill out our 60-second form with details about ${copy.treatment} and the estimated amount. No credit impact.`,
              },
              {
                num: "2",
                title: "We Shop 20+ Lenders",
                desc: `Your dedicated broker compares rates across our network to find a competitive financing option for ${copy.treatment}.`,
              },
              {
                num: "3",
                title: "Get Funded & Book In",
                desc: "Accept your personalised offer, receive funds (often same-day), and book your procedure.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-body leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7b. In-Depth Content Sections (hub pages) ── */}
      {procedure.contentSections && procedure.contentSections.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow space-y-12">
            {procedure.contentSections.map((section) => (
              <article
                key={section.heading}
                className="border-b border-border pb-12 last:border-b-0 last:pb-0"
              >
                <h2 className="text-section-h2 text-text-dark">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-body text-text-body"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 rounded-card bg-surface p-4"
                      >
                        <CheckCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-6 text-text-body">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-2 rounded-full bg-primary-wash px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── 8. Why Finance With Us ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            Why Finance {copy.ctaSubject} With CosmediLoans
          </h2>
          <p className="text-body text-text-body mb-10 text-center max-w-2xl mx-auto">
            We specialise in medical procedure financing and work with you every step
            of the way.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {procedure.benefits.map((b, i) => (
              <Card key={i}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark mb-1">{b.title}</h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Procedure FAQ ── */}
      <ProcedureFAQ
        procedureTitle={procedure.title}
        financingTitle={copy.financingTitle}
        treatment={copy.treatment}
        faqs={procedure.faqs}
      />

      {/* ── 10. Related Procedures ── */}
      {relatedGuides.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-narrow">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-section-h2 text-text-dark">
                  Payment Plan Guides
                </h2>
                <p className="mt-3 max-w-2xl text-body text-text-body">
                  Compare payment paths before choosing a lender, clinic plan, or
                  short-term instalment option for {copy.treatment}.
                </p>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View all guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                  <Card hover className="h-full">
                    <BookOpen className="mb-4 h-7 w-7 text-primary" aria-hidden="true" />
                    <p className="text-sm font-semibold text-primary">
                      {guide.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-text-dark">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-body">
                      {guide.excerpt}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProcedures.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <h2 className="text-section-h2 text-text-dark mb-8 text-center">
              Related Procedures
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              {relatedProcedures.map(
                (rp) =>
                  rp && (
                    <ProcedureCard
                      key={rp.slug}
                      slug={rp.slug}
                      icon={rp.icon}
                      title={rp.title}
                      avgCostRange={rp.avgCostRange}
                      rateFrom={rp.rateFrom}
                    />
                  )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 11. Inline CTA ── */}
      <section className="bg-gradient-to-r from-primary to-primary-light section-padding">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-section-h2 text-white mb-4">
            Ready to Finance {copy.ctaSubject}?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get a personalised rate from 20+ lenders in 60 seconds. No credit
            impact, no obligation.
          </p>
          <div className="max-w-lg mx-auto">
            <InlineLeadForm
              defaultProcedure={defaultProcedure}
              heading={`Get Your ${copy.financingTitle} Quote`}
            />
          </div>
          <p className="mt-5 text-sm text-white/80">
            A broker will be in touch within 1 business day. All applications are
            subject to lender assessment and approval.
          </p>
        </div>
      </section>

      {/* ── Persistent mobile CTA → jumps to the pre-filled hero form ── */}
      <StickyMobileCTA href="#get-quote" label="Get My Rate →" />
    </>
  );
}
