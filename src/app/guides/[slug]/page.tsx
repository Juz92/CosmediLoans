import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Landmark,
  ListChecks,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  getRelatedGuides,
} from "@/data/high-intent-guides";
import { getComparisonBySlug } from "@/data/comparisons";
import { authorPersonSchema, getAuthorBySlug } from "@/data/authors";
import { procedures } from "@/data/procedures";
import { absoluteUrl, BRAND, SITE_ORIGIN } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastReviewed } from "@/components/seo/LastReviewed";
import { TrustDisclosure } from "@/components/seo/TrustDisclosure";
import { SeoLeadCaptureBlock } from "@/components/lead-capture/SeoLeadCaptureBlock";
import { Badge, Button, Card } from "@/components/ui";

const guideComparisonMap: Record<string, string[]> = {
  "dental-payment-plans-australia": [
    "dental-loans-vs-buy-now-pay-later",
    "medical-loans-vs-payment-plans",
    "medical-loan-vs-buy-now-pay-later",
  ],
  "ivf-payment-plans-australia": [
    "ivf-payment-plan-vs-personal-loan",
    "medical-loans-vs-payment-plans",
    "medical-loan-vs-credit-card",
  ],
  "cosmetic-surgery-payment-plans-australia": [
    "cosmetic-surgery-finance-vs-credit-card",
    "medical-loans-vs-payment-plans",
    "medical-loan-vs-credit-card",
  ],
  "vet-bill-payment-plans-australia": [
    "medical-loans-vs-payment-plans",
    "medical-loan-vs-credit-card",
    "medical-loan-vs-buy-now-pay-later",
  ],
  "medical-loans-bad-credit-australia": [
    "bad-credit-medical-loans-alternatives",
    "cosmediloans-vs-jacaranda-finance",
    "cosmediloans-vs-fair-go-finance",
  ],
  "no-credit-check-dental-finance-australia": [
    "dental-loans-vs-buy-now-pay-later",
    "bad-credit-medical-loans-alternatives",
    "medical-loans-vs-payment-plans",
  ],
};

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const relatedProcedures = guide.relatedProcedureSlugs
    .map((slug) => procedures.find((procedure) => procedure.slug === slug))
    .filter(Boolean)
    .slice(0, 4);
  const relatedGuides = getRelatedGuides(guide.relatedGuideSlugs);
  const relatedComparisons = (guideComparisonMap[guide.slug] ?? [])
    .map((slug) => getComparisonBySlug(slug))
    .filter(Boolean)
    .slice(0, 3);
  const author = getAuthorBySlug(undefined);

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.h1,
        description: guide.metaDescription,
        image: encodeURI(absoluteUrl(guide.heroImage)),
        url: absoluteUrl(`/guides/${guide.slug}`),
        datePublished: guide.lastReviewed,
        dateModified: guide.lastReviewed,
        mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
        author: authorPersonSchema(author),
        reviewedBy: {
          "@type": "Organization",
          name: BRAND,
          url: SITE_ORIGIN,
        },
        publisher: {
          "@type": "Organization",
          name: BRAND,
          url: SITE_ORIGIN,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/Images/Logo.png"),
          },
        },
        about: guide.targetQueries.map((query) => ({
          "@type": "Thing",
          name: query,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      <section className="bg-hero-surface section-padding">
        <div className="container-narrow">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <BreadcrumbSchema
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: guide.title },
              ]}
            />
            <LastReviewed date={guide.lastReviewed} />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge className="mb-4">
                <Search className="h-4 w-4" aria-hidden="true" />
                {guide.category} guide
              </Badge>
              <h1 className="max-w-4xl text-hero-h1 text-text-dark">
                {guide.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-body text-text-body">
                {guide.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-text-body shadow-sm">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  {guide.readTime}
                </span>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-text-body shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                  Soft initial check focus
                </span>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-text-body shadow-sm">
                  <Landmark className="h-4 w-4 text-primary" aria-hidden="true" />
                  Broker comparison
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} href="/apply" size="lg" className="gap-2">
                  Check My Rate <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button as={Link} href="/calculator" size="lg" variant="secondary">
                  Calculate Repayments
                </Button>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-card shadow-brand-panel">
              <Image
                src={guide.heroImage}
                alt={`${guide.category} finance guide`}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-semibold">{guide.primaryKeyword}</p>
                <p className="mt-1 text-sm text-white/85">
                  {guide.searchIntent}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeoLeadCaptureBlock
        defaultProcedure={guide.formProcedure}
        heading={`Compare a ${guide.category.toLowerCase()} quote before choosing finance`}
      />

      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Badge className="mb-4" variant="outline">
                Quick answer
              </Badge>
              <h2 className="text-section-h2 text-text-dark">
                What to Know Before Choosing a Plan
              </h2>
            </div>
            <div className="rounded-card border border-primary/20 bg-primary-wash p-6 md:p-8">
              <p className="text-lg leading-8 text-text-dark">{guide.quickAnswer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <TrustDisclosure date={guide.lastReviewed} />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-4">
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                Comparison
              </Badge>
              <h2 className="text-section-h2 text-text-dark">
                Payment Options Compared
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-text-body">
              Compare the best fit, strengths, and risks before you apply. The
              lowest weekly repayment is not always the lowest total cost.
            </p>
          </div>

          <div className="overflow-x-auto rounded-card border border-border bg-surface shadow-card">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-primary-wash/70">
                  <th className="px-5 py-4 text-left text-sm font-bold text-text-dark">
                    Option
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-text-dark">
                    Best for
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-text-dark">
                    Strength
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-text-dark">
                    Watch out for
                  </th>
                </tr>
              </thead>
              <tbody>
                {guide.optionRows.map((row, index) => (
                  <tr
                    key={row.name}
                    className={index % 2 === 0 ? "bg-surface" : "bg-background"}
                  >
                    <td className="border-t border-border px-5 py-4 align-top text-sm font-semibold text-primary">
                      {row.name}
                    </td>
                    <td className="border-t border-border px-5 py-4 align-top text-sm leading-6 text-text-body">
                      {row.bestFor}
                    </td>
                    <td className="border-t border-border px-5 py-4 align-top text-sm leading-6 text-text-body">
                      {row.strengths}
                    </td>
                    <td className="border-t border-border px-5 py-4 align-top text-sm leading-6 text-text-body">
                      {row.watchOut}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Badge className="mb-4" variant="outline">
                Decision points
              </Badge>
              <h2 className="text-2xl font-bold text-text-dark">
                What Changes the Right Answer
              </h2>
              <div className="mt-6 space-y-3">
                {guide.proofPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                    <p className="text-sm leading-6 text-text-body">{point}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="space-y-10">
              {guide.sections.map((section) => (
                <article key={section.heading} className="border-b border-border pb-10 last:border-b-0 last:pb-0">
                  <h2 className="text-2xl font-bold text-text-dark">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="max-w-3xl text-body text-text-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 rounded-card bg-background p-4">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                          <span className="text-sm leading-6 text-text-body">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-2">
            {relatedProcedures.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold text-text-dark">
                  Related Procedure Finance
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedProcedures.map(
                    (procedure) =>
                      procedure && (
                        <Link
                          key={procedure.slug}
                          href={`/procedures/${procedure.slug}`}
                        >
                          <Card hover className="h-full">
                            <div className="flex items-start gap-4">
                              <span className="text-3xl" aria-hidden="true">
                                {procedure.icon}
                              </span>
                              <div>
                                <p className="font-semibold text-text-dark">
                                  {procedure.title}
                                </p>
                                <p className="mt-1 text-xs text-text-muted">
                                  {`${procedure.avgCostRange} | rates from ${procedure.rateFrom} p.a.`}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}

            {relatedGuides.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold text-text-dark">
                  Related Guides
                </h2>
                <div className="grid gap-4">
                  {relatedGuides.map((related) => (
                    <Link key={related.slug} href={`/guides/${related.slug}`}>
                      <Card hover className="flex items-start justify-between gap-4">
                        <div>
                          <Badge variant="outline" className="mb-3">
                            {related.category}
                          </Badge>
                          <p className="font-semibold text-text-dark">
                            {related.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-text-body">
                            {related.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {relatedComparisons.length > 0 && (
            <div className="mt-10 border-t border-border pt-8">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-text-dark">
                    Compare Finance Paths
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-text-body">
                    These comparison pages help separate lender choice, clinic
                    payment plans, BNPL and credit cards before you apply.
                  </p>
                </div>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  View all comparisons
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedComparisons.map(
                  (comparison) =>
                    comparison && (
                      <Link
                        key={comparison.slug}
                        href={`/compare/${comparison.slug}`}
                      >
                        <Card hover className="h-full">
                          <Badge variant="outline" className="mb-3">
                            Compare
                          </Badge>
                          <h3 className="text-lg font-bold text-text-dark">
                            {comparison.competitorName}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-text-body">
                            {comparison.metaDescription}
                          </p>
                        </Card>
                      </Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <h2 className="mb-8 text-center text-section-h2 text-text-dark">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={guide.faqs} />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <Badge className="mb-4" variant="outline">
                Sources checked
              </Badge>
              <h2 className="text-2xl font-bold text-text-dark">
                References Used for This Guide
              </h2>
              <p className="mt-3 text-sm leading-6 text-text-body">
                These references are used for general education. They are not a
                substitute for personal financial, legal, tax, or medical advice.
              </p>
            </div>
            <div className="grid gap-3">
              {guide.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 rounded-card border border-border bg-surface p-4 transition hover:border-primary/40 hover:shadow-card"
                >
                  <span>
                    <span className="block text-sm font-semibold text-text-dark">
                      {source.title}
                    </span>
                    <span className="mt-1 block text-xs text-text-muted">
                      {source.publisher}
                    </span>
                  </span>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-primary-light section-padding">
        <div className="container-narrow max-w-2xl text-center">
          <FileText className="mx-auto mb-5 h-10 w-10 text-white" aria-hidden="true" />
          <h2 className="text-section-h2 text-white">
            Compare Your Quote Before You Commit
          </h2>
          <p className="mt-4 text-lg text-white/90">
            A broker can compare lender options for your procedure amount,
            timing, and credit profile before you lock into one payment path.
          </p>
          <Button
            as={Link}
            href="/apply"
            size="lg"
            className="mt-8 gap-2 bg-white text-primary hover:bg-white/90"
          >
            Check My Rate <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
