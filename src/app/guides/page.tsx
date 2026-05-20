import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle, Search } from "lucide-react";
import { highIntentGuides } from "@/data/high-intent-guides";
import { guideHubs } from "@/data/guide-hubs";
import { absoluteUrl } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge, Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Medical Finance Guides Australia | Payment Plans and Loans",
  description:
    "Compare medical payment plans, dental finance, IVF finance, cosmetic surgery loans, vet bill loans, and bad credit medical loan options in Australia.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Medical Finance Guides Australia",
    description:
      "High-intent guides to medical payment plans, dental finance, IVF finance, cosmetic surgery loans, vet bill loans, and bad credit options.",
    url: "/guides",
    type: "website",
  },
};

export default function GuidesHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical finance guides",
    description:
      "Guides for Australians comparing medical payment plans and procedure finance options.",
    numberOfItems: highIntentGuides.length + guideHubs.length,
    itemListElement: [
      ...guideHubs.map((hub, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: hub.title,
        url: absoluteUrl(`/guides/topics/${hub.slug}`),
      })),
      ...highIntentGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: guideHubs.length + index + 1,
        name: guide.title,
        url: absoluteUrl(`/guides/${guide.slug}`),
      })),
    ],
  };

  return (
    <>
      <JsonLd data={itemListSchema} />

      <section className="bg-hero-surface section-padding">
        <div className="container-narrow">
          <BreadcrumbSchema
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge className="mb-4">
                <Search className="h-4 w-4" aria-hidden="true" />
                Payment plan research
              </Badge>
              <h1 className="max-w-4xl text-hero-h1 text-text-dark">
                Medical Payment Plan Guides for Australians Comparing Their Options
              </h1>
              <p className="mt-5 max-w-2xl text-body text-text-body">
                Use these guides to compare dental payment plans, IVF finance,
                cosmetic surgery loans, vet bill finance, and realistic options
                when credit is imperfect.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} href="/apply" size="lg" className="gap-2">
                  Check My Rate <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button as={Link} href="/calculator" size="lg" variant="secondary">
                  Calculate Repayments
                </Button>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-card shadow-brand-panel">
              <Image
                src="/Images/We Shop 20+ Lenders.png"
                alt="CosmediLoans broker comparison process"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-semibold">20+ lender comparison</p>
                <p className="mt-1 text-sm text-white/85">
                  Built for patients comparing more than a single clinic offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="mb-14">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-section-h2 text-text-dark">
                Topic Hubs Built for Internal Linking
              </h2>
              <p className="mt-3 text-body text-text-body">
                Start with a hub when you need the full path: guide content,
                procedure pages, local pages, and comparison pages tied together.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {guideHubs.map((hub) => (
                <Link key={hub.slug} href={`/guides/topics/${hub.slug}`}>
                  <Card hover className="h-full">
                    <Badge variant="outline" className="mb-4">
                      {hub.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-text-dark">
                      {hub.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-body">
                      {hub.metaDescription}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                      Open hub
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-10 max-w-3xl">
            <h2 className="text-section-h2 text-text-dark">
              Choose the Guide That Matches the Quote in Front of You
            </h2>
            <p className="mt-3 text-body text-text-body">
              Each guide is built around a different buying moment: choosing a
              payment pathway, avoiding wasted credit enquiries, or comparing a
              larger procedure quote against short-term instalments.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {highIntentGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card hover className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <Badge variant="outline">{guide.category}</Badge>
                      <span className="text-xs font-medium text-text-muted">
                        {guide.readTime}
                      </span>
                    </div>
                    <BookOpen className="mb-4 h-7 w-7 text-primary" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-text-dark">
                      {guide.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-text-body">
                      {guide.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                      Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <h2 className="text-section-h2 text-text-dark">
                What These Guides Are Designed to Clarify
              </h2>
              <p className="mt-4 text-body text-text-body">
                Payment plan search results can mix clinic promotions, BNPL
                offers, lender pages, and superannuation claims. These guides
                separate the options so the next step is based on the full cost,
                not the smallest weekly repayment.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Whether the option fits the procedure quote size",
                "Whether a soft initial check is available",
                "Whether the plan locks you to one clinic",
                "Whether fees can change the true cost",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-card bg-primary-wash p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                  <p className="text-sm font-medium leading-6 text-text-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-primary-light section-padding">
        <div className="container-narrow max-w-2xl text-center">
          <h2 className="text-section-h2 text-white">
            Compare Your Actual Procedure Quote
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Send the estimated amount through once you are ready. A broker can
            compare lender options before you commit to a single payment plan.
          </p>
          <Button
            as={Link}
            href="/apply"
            size="lg"
            className="mt-8 gap-2 bg-white text-primary hover:bg-white/90"
          >
            Get My Personalised Rate <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
