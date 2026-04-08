import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProcedureBySlug,
  getAllProcedureSlugs,
  procedures,
} from "@/data/procedures";
import { calculateRepayment } from "@/lib/calculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProcedureHero } from "@/components/procedures/ProcedureHero";
import { ProcedureCostTable } from "@/components/procedures/ProcedureCostTable";
import { ProcedureFAQ } from "@/components/procedures/ProcedureFAQ";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { InlineLeadForm } from "@/components/lead-capture/InlineLeadForm";
import { Card, Badge, Button } from "@/components/ui";
import {
  ArrowRight,
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
    "medical-loan": "other",
  };
  const defaultProcedure = procedureFormMap[procedure.slug] || "other";

  return (
    <>
      {/* ── JSON-LD Schemas ── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: procedure.title,
          description: procedure.heroDescription,
          url: `https://cosmedloans.com.au/procedures/${procedure.slug}`,
          procedureType: "http://schema.org/NoninvasiveProcedure",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "AUD",
            lowPrice: procedure.avgCostRange.split("–")[0]?.replace(/[^0-9]/g, "") || "2000",
            highPrice: procedure.avgCostRange.split("–")[1]?.replace(/[^0-9]/g, "") || "100000",
            offerCount: "20",
          },
        }}
      />

      {/* ── 1. Breadcrumb ── */}
      <div className="container-narrow pt-6 px-6 md:px-section-x">
        <BreadcrumbSchema
          items={[
            { label: "Home", href: "/" },
            { label: "Procedures", href: "/procedures" },
            { label: procedure.title },
          ]}
        />
      </div>

      {/* ── 2. Procedure Hero ── */}
      <ProcedureHero procedure={procedure} />

      {/* ── 3. Cost Table ── */}
      <ProcedureCostTable
        procedureTitle={procedure.title}
        costTable={procedure.costTable}
      />

      {/* ── 4. Financing Options ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            {procedure.title} Financing Options
          </h2>
          <p className="text-body text-text-body mb-10 text-center max-w-2xl mx-auto">
            Compare the most popular ways to finance your {procedure.title.toLowerCase()} in Australia.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Medical Loan — Recommended */}
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
        </div>
      </section>

      {/* ── 5. Featured Snippet Box ── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <div className="bg-primary-wash border border-primary/10 rounded-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-text-dark mb-3">
              {procedure.title} Financing in Australia — Quick Answer
            </h2>
            <p className="text-body text-text-body leading-relaxed">
              {procedure.financingDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Repayment Examples ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            {procedure.title} Repayment Examples
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
            <Link href="/calculator" className="text-primary hover:underline">
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
              How {procedure.title} Financing Works
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              From enquiry to funded in as little as 24 hours. Our streamlined process
              makes financing your {procedure.title.toLowerCase()} simple.
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
                desc: `Fill out our 60-second form with your ${procedure.title.toLowerCase()} details and estimated amount. No credit impact.`,
              },
              {
                num: "2",
                title: "We Shop 20+ Lenders",
                desc: `Your dedicated broker compares rates across our network to find the best ${procedure.title.toLowerCase()} financing deal.`,
              },
              {
                num: "3",
                title: "Get Funded & Book In",
                desc: `Accept your personalised offer, receive funds (often same-day), and book your ${procedure.title.toLowerCase()}.`,
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

      {/* ── 8. Why Finance With Us ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            Why Finance Your {procedure.title} With CosmediLoans
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
        faqs={procedure.faqs}
      />

      {/* ── 10. Related Procedures ── */}
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
            Ready to Finance Your {procedure.title}?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get a personalised rate from 20+ lenders in 60 seconds. No credit
            impact, no obligation.
          </p>
          <div className="max-w-lg mx-auto">
            <InlineLeadForm
              defaultProcedure={defaultProcedure}
              heading={`Get Your ${procedure.title} Quote`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
