import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getComparisonBySlug,
  getAllComparisonSlugs,
} from "@/data/comparisons";
import { procedures } from "@/data/procedures";
import { JsonLd } from "@/components/seo/JsonLd";
import { ComparisonHero } from "@/components/compare/ComparisonHero";
import { ComparisonTable } from "@/components/compare/ComparisonTable";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Card, Button } from "@/components/ui";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  ThumbsUp,
  Scale,
  BookOpen,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `/compare/${comparison.slug}`,
      type: "article",
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ComparisonPage({
  params,
}: {
  params: { slug: string };
}) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) notFound();

  const isGeneric = comparison.competitorType === "generic";

  // Resolve related procedure data
  const relatedProcedures = comparison.relatedProcedureSlugs
    .map((slug) => procedures.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.h1,
    description: comparison.metaDescription,
    url: `https://cosmedloans.com.au/compare/${comparison.slug}`,
    datePublished: comparison.lastReviewed,
    dateModified: comparison.lastReviewed,
    publisher: {
      "@type": "Organization",
      name: "CosmodiLoans",
      url: "https://cosmedloans.com.au",
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── 1 & 2. Breadcrumb + ComparisonHero ── */}
      <ComparisonHero comparison={comparison} />

      {/* ── 3. Quick Verdict Box ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <div className="border-2 border-primary rounded-card p-6 md:p-8 bg-surface shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-bold text-text-dark">
                Quick Verdict
              </h2>
            </div>
            <p className="text-body text-text-body leading-relaxed">
              {comparison.verdict}
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Side-by-Side Feature Table / Pros-Cons ── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            <Scale className="inline-block h-7 w-7 text-primary mr-2 -mt-1" aria-hidden="true" />
            Feature Comparison
          </h2>

          {isGeneric ? (
            /* Generic: pros/cons cards instead of logo-driven table */
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              {/* Our Pros */}
              <Card className="border-2 border-primary/20">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                  Medical Loan (via CosmodiLoans)
                </h3>
                <ul className="space-y-2">
                  {comparison.features.map((row, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        <strong>{row.feature}:</strong> {row.us}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Their Pros */}
              <Card>
                <h3 className="font-bold text-text-dark mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-text-muted" aria-hidden="true" />
                  {comparison.competitorName}
                </h3>
                <ul className="space-y-2">
                  {comparison.features.map((row, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                      <span className="h-4 w-4 mt-0.5 shrink-0 rounded-full bg-gray-200 inline-flex items-center justify-center text-[10px] text-gray-500 font-bold" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>
                        <strong>{row.feature}:</strong> {row.them}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ) : (
            /* Brand: full comparison table */
            <ComparisonTable
              features={comparison.features}
              competitorName={comparison.competitorName}
            />
          )}
        </div>
      </section>

      {/* ── 5. Detailed Breakdown ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-4xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-4">
                How CosmodiLoans Works
              </h2>
              <p className="text-body text-text-body leading-relaxed">
                {comparison.howWeWork}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-4">
                How {comparison.competitorName} Works
              </h2>
              <p className="text-body text-text-body leading-relaxed">
                {comparison.howTheyWork}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Who Should Use Which ── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            Who Should Use Which?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Choose Us */}
            <Card className="border-t-4 border-t-primary">
              <h3 className="font-bold text-primary mb-4">
                Choose CosmodiLoans If&hellip;
              </h3>
              <ul className="space-y-3">
                {comparison.chooseUs.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                    {reason}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Choose Them */}
            <Card className="border-t-4 border-t-gray-300">
              <h3 className="font-bold text-text-dark mb-4">
                Choose {comparison.competitorName} If&hellip;
              </h3>
              <ul className="space-y-3">
                {comparison.chooseThem.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <XCircle className="h-4 w-4 text-text-muted mt-0.5 shrink-0" aria-hidden="true" />
                    {reason}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ── 7. Related Procedure Pages ── */}
      {relatedProcedures.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <h2 className="text-section-h2 text-text-dark mb-8 text-center">
              Related Procedures
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {relatedProcedures.map(
                (proc) =>
                  proc && (
                    <Link key={proc.slug} href={`/procedures/${proc.slug}`}>
                      <Card hover className="text-center">
                        <span className="text-3xl mb-2 block" aria-hidden="true">
                          {proc.icon}
                        </span>
                        <p className="font-semibold text-text-dark text-sm">
                          {proc.title}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {proc.avgCostRange}
                        </p>
                      </Card>
                    </Link>
                  )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. FAQ ── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={comparison.faqs} />
        </div>
      </section>

      {/* ── 9. CTA → /apply ── */}
      <section className="bg-gradient-to-r from-primary to-primary-light section-padding">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-section-h2 text-white mb-4">
            Ready to Find Your Lowest Rate?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Stop comparing and start saving. Our brokers shop 20+ lenders in 60
            seconds &mdash; free, no credit impact, no obligation.
          </p>
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Check My Rate <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
