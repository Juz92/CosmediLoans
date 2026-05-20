import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle, Layers, MapPin, Scale } from "lucide-react";
import {
  getAllGuideHubSlugs,
  getGuideHubBySlug,
} from "@/data/guide-hubs";
import { getGuideBySlug } from "@/data/high-intent-guides";
import { getComparisonBySlug } from "@/data/comparisons";
import { getProcedureBySlug } from "@/data/procedures";
import { absoluteUrl, LAST_REVIEWED } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrustDisclosure } from "@/components/seo/TrustDisclosure";
import { SeoLeadCaptureBlock } from "@/components/lead-capture/SeoLeadCaptureBlock";
import { Badge, Card } from "@/components/ui";

export function generateStaticParams() {
  return getAllGuideHubSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const hub = getGuideHubBySlug(params.slug);
  if (!hub) return {};

  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `/guides/topics/${hub.slug}` },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url: `/guides/topics/${hub.slug}`,
      type: "website",
    },
  };
}

export default function GuideTopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const hub = getGuideHubBySlug(params.slug);
  if (!hub) notFound();

  const guides = hub.guideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);
  const procedures = hub.procedureSlugs
    .map((slug) => getProcedureBySlug(slug))
    .filter(Boolean);
  const comparisons = hub.comparisonSlugs
    .map((slug) => getComparisonBySlug(slug))
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: hub.h1,
        description: hub.metaDescription,
        url: absoluteUrl(`/guides/topics/${hub.slug}`),
        dateModified: LAST_REVIEWED,
        about: {
          "@type": "Thing",
          name: hub.primaryKeyword,
        },
      },
      {
        "@type": "ItemList",
        name: `${hub.title} links`,
        itemListElement: [
          ...hub.guideSlugs.map((slug, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/guides/${slug}`),
          })),
          ...hub.procedureSlugs.map((slug, index) => ({
            "@type": "ListItem",
            position: hub.guideSlugs.length + index + 1,
            url: absoluteUrl(`/procedures/${slug}`),
          })),
          ...hub.comparisonSlugs.map((slug, index) => ({
            "@type": "ListItem",
            position:
              hub.guideSlugs.length + hub.procedureSlugs.length + index + 1,
            url: absoluteUrl(`/compare/${slug}`),
          })),
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((faq) => ({
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
      <JsonLd data={schema} />

      <section className="bg-hero-surface section-padding">
        <div className="container-narrow">
          <BreadcrumbSchema
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: hub.title },
            ]}
          />
          <div className="max-w-4xl">
            <Badge className="mb-4">
              <Layers className="h-4 w-4" aria-hidden="true" />
              {hub.category} hub
            </Badge>
            <h1 className="text-hero-h1 text-text-dark">{hub.h1}</h1>
            <p className="mt-5 max-w-3xl text-body text-text-body">
              {hub.intro}
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {hub.proofPoints.map((point) => (
              <div
                key={point}
                className="flex min-h-16 items-center gap-3 rounded-card border border-border bg-white p-4"
              >
                <CheckCircle
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold leading-6 text-text-body">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <TrustDisclosure compact />
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Start here
            </Badge>
            <h2 className="text-section-h2 text-text-dark">
              Core Guides
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {guides.map(
              (guide) =>
                guide && (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                    <Card hover className="h-full">
                      <Badge variant="outline" className="mb-4">
                        {guide.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-text-dark">
                        {guide.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-text-body">
                        {guide.excerpt}
                      </p>
                    </Card>
                  </Link>
                )
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-text-dark">
                  Compare Options
                </h2>
              </div>
              <div className="grid gap-4">
                {comparisons.map(
                  (comparison) =>
                    comparison && (
                      <Link
                        key={comparison.slug}
                        href={`/compare/${comparison.slug}`}
                      >
                        <Card hover className="flex h-full items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-text-dark">
                              {comparison.competitorName}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-text-body">
                              {comparison.metaDescription}
                            </p>
                          </div>
                          <ArrowRight
                            className="mt-1 h-5 w-5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                        </Card>
                      </Link>
                    )
                )}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-text-dark">
                  Procedure and Local Pages
                </h2>
              </div>
              <div className="grid gap-4">
                {procedures.map(
                  (procedure) =>
                    procedure && (
                      <Link
                        key={procedure.slug}
                        href={`/procedures/${procedure.slug}`}
                      >
                        <Card hover>
                          <p className="font-bold text-text-dark">
                            {procedure.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-text-body">
                            {procedure.heroDescription}
                          </p>
                        </Card>
                      </Link>
                    )
                )}
                {hub.localLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Card hover>
                      <p className="font-bold text-text-dark">{link.label}</p>
                      <p className="mt-2 text-sm leading-6 text-text-body">
                        {link.description}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeoLeadCaptureBlock
        defaultProcedure={hub.defaultProcedure}
        heading={`Compare a ${hub.category.toLowerCase()} quote with a broker`}
      />

      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <h2 className="mb-8 text-center text-section-h2 text-text-dark">
            Common Questions
          </h2>
          <div className="grid gap-4">
            {hub.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-card border border-border bg-background p-5"
              >
                <h3 className="font-bold text-text-dark">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-text-body">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
