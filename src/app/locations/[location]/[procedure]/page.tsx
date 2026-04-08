import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import { TrustBar } from "@/components/content/TrustBar";
import { ProcedureCostTable } from "@/components/procedures/ProcedureCostTable";
import { ProcedureFAQ } from "@/components/procedures/ProcedureFAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllLocationSlugs, getLocationBySlug } from "@/data/locations";
import { getAllProcedureSlugs, getProcedureBySlug } from "@/data/procedures";

const BASE_URL = "https://cosmedloans.com.au";

export async function generateStaticParams() {
  return getAllLocationSlugs().flatMap((location) =>
    getAllProcedureSlugs().map((procedure) => ({ location, procedure }))
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
  return {
    title: `${proc.title} in ${loc.name} | From ${proc.rateFrom} | CosmodiLoans`,
    description: `${proc.title} financing in ${loc.name}, ${loc.stateCode}. Compare rates from ${proc.rateFrom} across 20+ lenders. No credit impact to check your rate.`,
    alternates: { canonical: `/locations/${loc.slug}/${proc.slug}` },
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `CosmodiLoans — ${proc.title} in ${loc.name}`,
    url: `${BASE_URL}/locations/${loc.slug}/${proc.slug}`,
    description: `${proc.title} financing for patients in ${loc.name}, ${loc.state}. Rates from ${proc.rateFrom}.`,
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
      name: proc.title,
      itemListElement: [
        {
          "@type": "Offer",
          name: proc.title,
          description: proc.heroDescription,
          eligibleRegion: { "@type": "City", name: loc.name },
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding pb-12 md:pb-section-y">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div className="flex flex-col justify-center pt-2">
              <Badge className="mb-6 self-start">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {loc.name}, {loc.stateCode}
              </Badge>
              <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-5 leading-tight">
                {proc.title} in{" "}
                <span className="text-primary">{loc.name}</span>
              </h1>
              <p className="text-body text-text-body mb-8 max-w-lg">
                {proc.heroDescription}
              </p>
              <p className="text-sm text-text-muted">
                Serving patients across {loc.name} and{" "}
                {loc.stateCode === "ACT" ? "the ACT" : `${loc.stateCode}`}.
              </p>
            </div>
            <div className="lg:max-w-md lg:ml-auto">
              <HeroLeadForm defaultProcedure={proc.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── COST TABLE ───────────────────────────────────────────────── */}
      {proc.costTable.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-narrow">
            <h2 className="text-section-h2 text-text-dark mb-8 text-center">
              {proc.title} Costs in {loc.name}
            </h2>
            <ProcedureCostTable
              procedureTitle={proc.title}
              costTable={proc.costTable}
            />
          </div>
        </section>
      )}

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      {proc.benefits.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <h2 className="text-section-h2 text-text-dark mb-8 text-center">
              Why Finance {proc.title} Through CosmodiLoans?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {proc.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-card bg-surface p-6 shadow-card border border-border"
                >
                  <h3 className="text-card-h4 text-text-dark mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ─────────────────────────────────────────────────────── */}
      {proc.faqs.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-narrow max-w-3xl">
            <h2 className="text-section-h2 text-text-dark mb-8 text-center">
              {proc.title} FAQs for {loc.name} Patients
            </h2>
            <ProcedureFAQ
              procedureTitle={proc.title}
              faqs={proc.faqs}
            />
          </div>
        </section>
      )}
    </>
  );
}
