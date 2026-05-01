import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/data/comparisons";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button, Card, Badge } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Medical Financing Options in Australia",
  description:
    "Compare CosmediLoans with Afterpay, Zip Pay, Humm, Latitude, MoneyMe, Plenti, SocietyOne, and more. See which medical financing option suits your procedure.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Medical Financing Options in Australia",
    description:
      "Side-by-side comparisons of CosmediLoans with every major medical financing option in Australia.",
    url: "/compare",
    type: "website",
  },
};

function getCompetitorTypeLabel(type: string) {
  switch (type) {
    case "bnpl":
      return "Buy Now Pay Later";
    case "lender":
      return "Direct Lender";
    case "generic":
      return "Financing Type";
    default:
      return type;
  }
}

function getMaxAmount(comparison: (typeof comparisons)[number]) {
  const amountRow = comparison.features.find(
    (f) => f.feature === "Maximum Amount" || f.feature === "Available Credit"
  );
  return amountRow ? amountRow.them : "Varies";
}

function getBestFor(comparison: (typeof comparisons)[number]) {
  const bestRow = comparison.features.find((f) => f.feature === "Best For");
  return bestRow ? bestRow.them : "General use";
}

export default function CompareHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical Financing Comparisons",
    description:
      "Compare CosmediLoans with major medical financing options in Australia.",
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.h1,
      url: absoluteUrl(`/compare/${c.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-wash to-primary-sky section-padding">
        <div className="container-narrow">
          <BreadcrumbSchema
            items={[
              { label: "Home", href: "/" },
              { label: "Compare" },
            ]}
          />
          <div className="text-center">
            <h1 className="text-hero-h1 text-text-dark mb-4">
              Compare Medical Financing Options in Australia
            </h1>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              See how CosmediLoans stacks up against every major medical
              financing option. Our broker-matched loans compare 20+ lenders to
              find your lowest rate.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            All Comparisons at a Glance
          </h2>

          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted border-b-2 border-border">
                    Competitor
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted border-b-2 border-border">
                    Type
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted border-b-2 border-border">
                    Their Max Amount
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted border-b-2 border-border">
                    Best For
                  </th>
                  <th className="py-4 px-4 border-b-2 border-border" />
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr
                    key={c.slug}
                    className={
                      i % 2 === 0 ? "bg-surface" : "bg-primary-wash/30"
                    }
                  >
                    <td className="py-3.5 px-4 border-b border-border">
                      <Link
                        href={`/compare/${c.slug}`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        {c.competitorName}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 border-b border-border">
                      <Badge variant="outline">
                        {getCompetitorTypeLabel(c.competitorType)}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-text-body border-b border-border">
                      {getMaxAmount(c)}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-text-body border-b border-border max-w-xs">
                      {getBestFor(c)}
                    </td>
                    <td className="py-3.5 px-4 border-b border-border text-right">
                      <Link href={`/compare/${c.slug}`}>
                        <Button size="sm" variant="secondary">
                          Compare <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="md:hidden grid gap-4">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`}>
                <Card hover className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-text-dark truncate">
                      {c.competitorName}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {getCompetitorTypeLabel(c.competitorType)} &middot;{" "}
                      {getMaxAmount(c)}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light section-padding">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-section-h2 text-white mb-4">
            Skip the Comparison. Get Your Personalised Rate.
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our brokers compare 20+ lenders in 60 seconds. Free, no credit
            impact, no obligation.
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
