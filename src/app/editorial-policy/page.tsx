import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastReviewed } from "@/components/seo/LastReviewed";
import { Button, Card } from "@/components/ui";
import { EDITORIAL_PRINCIPLES, FINANCE_ASSUMPTIONS, TRUST_CONTACT, TRUST_DISCLOSURES } from "@/data/trust";
import { absoluteUrl, BRAND, LAST_REVIEWED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy | Finance Content Review",
  description:
    "How CosmediLoans writes, reviews and updates medical finance content, including rate assumptions, disclosure standards and source handling.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    title: "CosmediLoans Editorial Policy",
    description:
      "Our standards for medical finance content, review dates, disclosure language and responsible credit framing.",
    url: "/editorial-policy",
    type: "website",
  },
};

export default function EditorialPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Editorial Policy",
    description: metadata.description,
    url: absoluteUrl("/editorial-policy"),
    dateModified: LAST_REVIEWED,
    publisher: {
      "@type": "Organization",
      name: BRAND,
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="bg-hero-surface section-padding">
        <div className="container-narrow">
          <BreadcrumbSchema
            items={[
              { label: "Home", href: "/" },
              { label: "Editorial Policy" },
            ]}
          />
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Finance content standards
            </div>
            <h1 className="text-hero-h1 text-text-dark">
              Editorial Policy for Medical Finance Content
            </h1>
            <p className="mt-5 text-body text-text-body">
              CosmediLoans content is written to help Australians compare
              procedure finance options with clearer assumptions, visible
              limitations and responsible credit language.
            </p>
            <div className="mt-5">
              <LastReviewed />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-5 md:grid-cols-2">
            {EDITORIAL_PRINCIPLES.map((principle) => (
              <Card key={principle.title}>
                <CheckCircle className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="text-xl font-bold text-text-dark">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-body">
                  {principle.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-section-h2 text-text-dark">
                Finance Assumptions
              </h2>
              <ul className="mt-6 grid gap-3">
                {FINANCE_ASSUMPTIONS.map((item) => (
                  <li key={item} className="flex gap-3 rounded-card bg-background p-4 text-sm leading-6 text-text-body">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-section-h2 text-text-dark">
                Required Disclosures
              </h2>
              <ul className="mt-6 grid gap-3">
                {TRUST_DISCLOSURES.map((item) => (
                  <li key={item} className="flex gap-3 rounded-card bg-background p-4 text-sm leading-6 text-text-body">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <Card>
            <h2 className="text-2xl font-bold text-text-dark">
              Corrections and Updates
            </h2>
            <p className="mt-4 text-body text-text-body">
              If a page needs a finance correction, source update or clearer
              disclosure, contact the CosmediLoans team. We review priority
              corrections before routine content refreshes.
            </p>
            <p className="mt-4 text-sm leading-6 text-text-body">
              ABN {TRUST_CONTACT.abn} |{" "}
              <a href={`mailto:${TRUST_CONTACT.email}`} className="text-primary hover:underline">
                {TRUST_CONTACT.email}
              </a>{" "}
              |{" "}
              <a href={`tel:${TRUST_CONTACT.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                {TRUST_CONTACT.phone}
              </a>
            </p>
            <Button as={Link} href="/contact" className="mt-6 gap-2">
              Contact Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}
