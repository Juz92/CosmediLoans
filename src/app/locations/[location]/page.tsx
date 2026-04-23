import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import { TrustBar } from "@/components/content/TrustBar";
import { HowItWorks } from "@/components/content/HowItWorks";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllLocationSlugs, getLocationBySlug } from "@/data/locations";
import { procedures } from "@/data/procedures";
import { SITE_ORIGIN } from "@/lib/site";

const BASE_URL = SITE_ORIGIN;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: {
  params: { location: string };
}): Promise<Metadata> {
  const loc = getLocationBySlug(params.location);
  if (!loc) return {};
  return {
    title: `Medical & Personal Loans in ${loc.name} | CosmediLoans`,
    description: `Compare loan rates from 20+ lenders for medical procedures and debt consolidation in ${loc.name}, ${loc.stateCode}. No credit impact to check your rate.`,
    alternates: { canonical: `/locations/${loc.slug}` },
  };
}

const featuredProcedures = procedures.slice(0, 8);

export default function LocationPage({
  params,
}: {
  params: { location: string };
}) {
  const loc = getLocationBySlug(params.location);
  if (!loc) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "CosmediLoans",
    url: BASE_URL,
    description: `Medical procedure loan broker-matching service in ${loc.name}, ${loc.state}.`,
    areaServed: {
      "@type": "City",
      name: loc.name,
      containedInPlace: {
        "@type": "State",
        name: loc.state,
        containedInPlace: { "@type": "Country", name: "Australia" },
      },
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />

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
                Medical &amp; Personal Loans in{" "}
                <span className="text-primary">{loc.name}</span>
              </h1>
              <p className="text-body text-text-body mb-8 max-w-lg">
                Compare rates from 20+ lenders in 60 seconds. Whether you need
                dental work, cosmetic surgery, IVF, or debt consolidation, our
                brokers find the best rate for patients in {loc.name},{" "}
                {loc.stateCode}.
              </p>
            </div>
            <div className="lg:max-w-md lg:ml-auto">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── PROCEDURES GRID ──────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Loans Available in {loc.name}
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              We help {loc.name} patients finance medical procedures and
              consolidate debt at competitive rates.
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
          <div className="text-center mt-8">
            <Link
              href="/procedures"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View all procedures we finance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── LOCATION PROCEDURE LINKS ─────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            Popular Loans for {loc.name} Patients
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {procedures.map((proc) => (
              <Link
                key={proc.slug}
                href={`/locations/${loc.slug}/${proc.slug}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-surface hover:border-primary/40 hover:bg-primary-wash transition-colors"
              >
                <span className="text-2xl" aria-hidden="true">
                  {proc.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-dark truncate">
                    {proc.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    From {proc.rateFrom}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted ml-auto shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
