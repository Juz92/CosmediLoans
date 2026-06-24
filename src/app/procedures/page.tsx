import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ProcedureGrid } from "@/components/procedures/ProcedureGrid";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance Options for Cosmetic, Dental, Medical & Vet Procedures",
  description:
    "Browse CosmediLoans finance options by procedure, from dental and cosmetic surgery to IVF, vet care, and more. Pick your treatment to see costs, rates, and how it works.",
  alternates: { canonical: "/procedures" },
  openGraph: {
    title: "Finance Options for Cosmetic, Dental, Medical & Vet Procedures",
    description:
      "Browse CosmediLoans finance options by procedure, from dental and cosmetic surgery to IVF, vet care, and more.",
    url: "/procedures",
    type: "website",
  },
};

export default function ProceduresHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-wash to-primary-sky section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-hero-h1 text-text-dark mb-4">
            Finance Options by Procedure
          </h1>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            Pick your treatment to see typical costs, indicative rates, and how
            financing works, from dental and cosmetic surgery to IVF and vet care.
            Each guide is matched to brokers who compare 20+ lenders.
          </p>
        </div>
      </section>

      {/* Filterable Grid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <ProcedureGrid />
        </div>
      </section>

      {/* Popular finance categories — routes hub intent to dedicated money pages */}
      <section className="section-padding bg-background pt-0">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-3 text-center">
            Popular Finance Categories
          </h2>
          <p className="text-body text-text-body mb-8 text-center max-w-2xl mx-auto">
            Most patients start with one of these. Each page covers typical Australian
            costs, indicative rates, and how repayments work for that treatment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/procedures/medical-loan", label: "Medical loans" },
              { href: "/procedures/cosmetic-surgery-loans", label: "Cosmetic surgery loans" },
              { href: "/procedures/dental-loans", label: "Dental loans" },
              { href: "/procedures/ivf-financing", label: "IVF & fertility financing" },
              { href: "/procedures/breast-augmentation-loans", label: "Breast augmentation loans" },
              { href: "/procedures/vet-bill-loans", label: "Vet bill loans" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary-wash px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {item.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
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
            see your treatment listed, our{" "}
            <Link
              href="/procedures/medical-loan"
              className="text-primary font-semibold hover:underline"
            >
              general medical loan
            </Link>{" "}
            covers any procedure, or we can help you find competitive rates from our
            20+ lender network.
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
