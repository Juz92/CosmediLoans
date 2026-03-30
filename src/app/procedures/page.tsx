import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ProcedureGrid } from "@/components/procedures/ProcedureGrid";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Procedure Financing | All Procedures",
  description:
    "Explore financing options for dental, IVF, cosmetic surgery, and more. Compare 20+ lenders and find the lowest rate for your medical procedure.",
  alternates: { canonical: "/procedures" },
  openGraph: {
    title: "Medical Procedure Financing | All Procedures",
    description:
      "Explore financing options for dental, IVF, cosmetic surgery, and more. Compare 20+ lenders and find the lowest rate.",
    url: "/procedures",
    type: "website",
  },
};

export default function ProceduresHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-wash to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-hero-h1 text-text-dark mb-4">
            Medical Procedure Financing
          </h1>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            Explore our full range of medical procedure financing options. From dental
            to cosmetic surgery, our brokers compare 20+ lenders to find you the
            lowest rate.
          </p>
        </div>
      </section>

      {/* Filterable Grid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <ProcedureGrid />
        </div>
      </section>

      {/* Don't See Your Procedure CTA */}
      <section className="section-padding bg-surface">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-section-h2 text-text-dark mb-4">
            Don&apos;t See Your Procedure?
          </h2>
          <p className="text-body text-text-body mb-6">
            We finance virtually any medical procedure in Australia. If you don&apos;t
            see your treatment listed, we can still help you find competitive rates
            from our 20+ lender network.
          </p>
          <Link href="/apply">
            <Button size="lg">
              Get a Custom Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
