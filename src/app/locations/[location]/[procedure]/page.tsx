import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Calculator,
  CheckCircle,
  ClipboardList,
  MapPin,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import { TrustBar } from "@/components/content/TrustBar";
import { ProcedureCostTable } from "@/components/procedures/ProcedureCostTable";
import { ProcedureFAQ } from "@/components/procedures/ProcedureFAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastReviewed } from "@/components/seo/LastReviewed";
import { getAllLocationSlugs, getLocationBySlug, locations } from "@/data/locations";
import {
  getAllProcedureSlugs,
  getProcedureBySlug,
  type Procedure,
} from "@/data/procedures";
import { getProcedureCopy } from "@/lib/procedure-copy";
import { getLocationProcedureContent } from "@/lib/location-procedure-content";
import {
  getIndexedLocationProcedurePaths,
  shouldIndexLocationProcedure,
} from "@/lib/location-procedure-indexing";
import { SITE_ORIGIN } from "@/lib/site";

const BASE_URL = SITE_ORIGIN;

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export async function generateStaticParams() {
  return getIndexedLocationProcedurePaths(
    getAllLocationSlugs(),
    getAllProcedureSlugs()
  );
}

export async function generateMetadata({
  params,
}: {
  params: { location: string; procedure: string };
}): Promise<Metadata> {
  const loc = getLocationBySlug(params.location);
  const proc = getProcedureBySlug(params.procedure);
  if (!loc || !proc) return {};

  const copy = getProcedureCopy(proc);
  const content = getLocationProcedureContent(loc, proc);
  const nearbyAreas = loc.nearbyAreas.slice(0, 3).join(", ");
  const shouldIndex = shouldIndexLocationProcedure(loc.slug, proc.slug);

  return {
    title: `${copy.financingTitle} in ${loc.name} | From ${proc.rateFrom}`,
    description: content.metaDescription,
    alternates: { canonical: `/locations/${loc.slug}/${proc.slug}` },
    robots: shouldIndex
      ? undefined
      : {
          index: false,
          follow: true,
        },
    openGraph: {
      title: `${copy.financingTitle} in ${loc.name} | CosmediLoans`,
      description: `Local guide for ${copy.treatment} finance in ${loc.name}, including ${nearbyAreas}. Compare quote details, payment timing, and lender options before booking.`,
      url: `/locations/${loc.slug}/${proc.slug}`,
      type: "website",
    },
  };
}

export default function LocationProcedurePage({
  params,
}: {
  params: { location: string; procedure: string };
}) {
  const loc = getLocationBySlug(params.location);
  const proc = getProcedureBySlug(params.procedure);
  if (!loc || !proc) notFound();

  const copy = getProcedureCopy(proc);
  const content = getLocationProcedureContent(loc, proc);
  const shouldIndex = shouldIndexLocationProcedure(loc.slug, proc.slug);
  const nearbyAreas = loc.nearbyAreas.join(", ");
  const nearbyShortList = formatList(loc.nearbyAreas.slice(0, 3));
  const relatedLocations = locations
    .filter(
      (item) =>
        item.stateCode === loc.stateCode &&
        item.slug !== loc.slug &&
        shouldIndexLocationProcedure(item.slug, proc.slug)
    )
    .slice(0, 3);
  const relatedProcedures = proc.relatedSlugs
    .map((slug) => getProcedureBySlug(slug))
    .filter(
      (item): item is Procedure =>
        item !== undefined &&
        shouldIndexLocationProcedure(loc.slug, item.slug)
    )
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: `CosmediLoans - ${copy.financingTitle} in ${loc.name}`,
        url: `${BASE_URL}/locations/${loc.slug}/${proc.slug}`,
        description: `${copy.financingTitle} for patients in ${loc.name}, ${loc.state}. Typical treatment costs range from ${proc.avgCostRange}, with rates from ${proc.rateFrom}.`,
        serviceType: content.schemaServiceType,
        areaServed: {
          "@type": "City",
          name: loc.name,
          containedInPlace: {
            "@type": "State",
            name: loc.state,
            containedInPlace: { "@type": "Country", name: "Australia" },
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: copy.financingTitle,
          itemListElement: [
            {
              "@type": "Offer",
              name: copy.financingTitle,
              description: proc.heroDescription,
              eligibleRegion: { "@type": "City", name: loc.name },
            },
          ],
        },
      },
    ],
  };

  const heroFacts = [
    { label: "Local area", value: loc.stateCode === "ACT" ? "ACT" : loc.stateCode },
    { label: "Rates from", value: `${proc.rateFrom} p.a.` },
    { label: "Credit check", value: "Soft inquiry" },
  ];

  const quoteIcons = [Calculator, ClipboardList, CalendarDays, ShieldCheck];

  return (
    <>
      {shouldIndex && <JsonLd data={schema} />}

      <section className="bg-gradient-to-b from-primary-wash via-surface to-background section-padding pb-12 md:pb-section-y">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:items-start">
            <div className="flex flex-col justify-center pt-2">
              <Badge className="mb-6 self-start">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {loc.name}, {loc.stateCode}
              </Badge>
              <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-5 leading-tight">
                {copy.financingTitle} in{" "}
                <span className="text-primary">{loc.name}</span>
              </h1>
              <p className="text-body text-text-body mb-6 max-w-2xl">
                {content.heroDescription}
              </p>
              <div className="grid gap-3 sm:grid-cols-3 max-w-2xl">
                {heroFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-button border border-border bg-surface/80 px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-text-dark">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <LastReviewed />
              </div>
            </div>
            <div className="lg:ml-auto">
              <HeroLeadForm defaultProcedure={proc.slug} />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Local funding guide
              </p>
              <h2 className="mt-3 text-section-h2 text-text-dark">
                Plan finance before you book in {loc.name}
              </h2>
              <div className="mt-4 space-y-4 text-body text-text-body">
                {content.localNarrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.localGuideItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-card border border-border bg-surface p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-wash">
                    <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-text-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <div className="mb-5 max-w-2xl">
              <h3 className="text-2xl font-bold tracking-tight text-text-dark">
                {loc.name} quote planning snapshot
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-body">
                Use this snapshot to compare the local treatment quote against
                realistic lender timing, nearby provider choice, and the payment
                milestones clinics usually ask patients to meet.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.quotePlanningCards.map((item, index) => {
                const Icon = quoteIcons[index % quoteIcons.length];

                return (
                  <article
                    key={item.title}
                    className="rounded-card border border-border bg-surface p-5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-wash">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
                      {item.title}
                    </p>
                    <h4 className="mt-2 text-lg font-bold text-text-dark">
                      {item.value}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-body">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-6 border-t border-border pt-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-5 max-w-2xl">
                <h3 className="text-2xl font-bold tracking-tight text-text-dark">
                  How to compare providers and finance in {loc.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-body">
                  These checks help separate the treatment choice from the loan
                  choice, especially when quotes differ across {nearbyAreas}.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                {content.providerComparisonItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-card border border-border bg-surface p-5"
                  >
                    <h4 className="font-bold text-text-dark">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-body">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-card border border-border bg-surface p-6">
              <h3 className="text-xl font-bold tracking-tight text-text-dark">
                Application checklist
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-body">
                Bring these details together before a broker compares lenders.
              </p>
              <ul className="mt-5 space-y-3">
                {content.applicationChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-text-body">
                    <CheckCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-button bg-primary-wash p-4">
                <h4 className="font-bold text-text-dark">
                  {content.exampleScenario.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {content.exampleScenario.text}
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-10 rounded-card border border-border bg-surface p-6">
            <h3 className="text-2xl font-bold tracking-tight text-text-dark">
              Payment timing checks before you apply
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {content.paymentMilestones.map((item, index) => (
                <div key={item} className="rounded-button bg-background p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 border-t border-border pt-8 md:grid-cols-2">
            {relatedProcedures.length > 0 && (
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-text-dark">
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  Compare related treatments
                </div>
                <div className="flex flex-wrap gap-2">
                  {relatedProcedures.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/locations/${loc.slug}/${related.slug}`}
                      className="inline-flex min-h-11 items-center gap-1 rounded-button border border-border bg-surface px-4 text-sm font-semibold text-text-body transition-colors hover:border-primary hover:text-primary"
                    >
                      {related.title}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedLocations.length > 0 && (
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-text-dark">
                  <MapPinned className="h-4 w-4 text-primary" aria-hidden="true" />
                  Nearby {loc.stateCode} finance pages
                </div>
                <div className="flex flex-wrap gap-2">
                  {relatedLocations.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/locations/${related.slug}/${proc.slug}`}
                      className="inline-flex min-h-11 items-center gap-1 rounded-button border border-border bg-surface px-4 text-sm font-semibold text-text-body transition-colors hover:border-primary hover:text-primary"
                    >
                      {related.name}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-card border border-border bg-surface p-5 text-sm leading-relaxed text-text-body">
            For full national costs, rates, and lender comparison, see our{" "}
            <Link
              href={`/procedures/${proc.slug}`}
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-deep"
            >
              {proc.title}
            </Link>{" "}
            guide. This page covers {copy.treatment} finance specific to {loc.name}.
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Local questions
            </p>
            <h2 className="mt-3 text-section-h2 text-text-dark">
              Questions {loc.name} patients ask before applying
            </h2>
            <p className="mt-4 text-body text-text-body">
              These answers are specific to {copy.treatment} planning around{" "}
              {loc.name}, including nearby areas such as {nearbyShortList}.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {content.localFaqs.map((item) => (
              <article
                key={item.question}
                className="rounded-card border border-border bg-background p-5"
              >
                <h3 className="font-bold leading-snug text-text-dark">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-body">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {proc.costTable.length > 0 && (
        <ProcedureCostTable
          costHeading={copy.costHeading.replace(" in Australia?", ` in ${loc.name}?`)}
          costTable={proc.costTable}
          intro={`Use these national cost ranges as a benchmark, then compare them with your written ${loc.name} quote and any provider deposits before choosing a loan amount.`}
        />
      )}

      {proc.benefits.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Broker comparison
              </p>
              <h2 className="mt-3 text-section-h2 text-text-dark">
                Why finance {copy.treatment} through CosmediLoans?
              </h2>
              <p className="mt-4 text-body text-text-body">
                For {loc.name} patients, lender choice can matter as much as the
                provider quote. A broker compares rate, term, fees, and approval
                timing before you decide.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {proc.benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-card border border-border bg-surface p-6"
                >
                  <h3 className="text-card-h4 text-text-dark">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-body leading-relaxed">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {proc.faqs.length > 0 && (
        <ProcedureFAQ
          procedureTitle={proc.title}
          financingTitle={copy.financingTitle}
          treatment={copy.treatment}
          heading={`${copy.financingTitle} FAQs for ${loc.name} patients`}
          description={`Common questions about financing ${copy.treatment} in ${loc.name} and nearby areas including ${nearbyAreas}.`}
          faqs={proc.faqs}
          emitSchema={false}
        />
      )}
    </>
  );
}
