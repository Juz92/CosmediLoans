import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQPageClient } from "./FAQPageClient";
import { allFAQItems } from "./faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Medical Financing Australia",
  description:
    "Find answers to 34 common questions about medical procedure financing in Australia. Learn about rates, eligibility, procedures, and the application process.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Medical Financing Australia",
    description:
      "Find answers to 34 common questions about medical procedure financing in Australia.",
    url: "/faq",
    type: "website",
  },
};

/* ── Build FAQPage JSON-LD for ALL items ──────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFAQItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-mist to-primary-sky section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            Everything you need to know about medical procedure financing in
            Australia. Browse by category or search for a specific topic.
          </p>
        </div>
      </section>

      {/* ── CLIENT INTERACTIVE SECTION ────────────────────────────── */}
      <FAQPageClient items={allFAQItems} />
    </>
  );
}
