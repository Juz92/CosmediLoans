import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Stethoscope,
  TrendingDown,
  Star,
  ShieldCheck,
  Heart,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Card, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About CosmodiLoans | Medical Financing Made Simple",
  description:
    "CosmodiLoans connects Australian patients with expert brokers who compare 20+ lenders for the best medical loan rate. Free, fast, and no obligation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CosmodiLoans | Medical Financing Made Simple",
    description:
      "CosmodiLoans connects Australian patients with expert brokers who compare 20+ lenders for the best medical loan rate.",
    url: "/about",
    type: "website",
  },
};

/* ── Stats ────────────────────────────────────────────────────────── */
const stats = [
  { icon: Users, value: "20+", label: "Lenders in Our Network" },
  { icon: Stethoscope, value: "50+", label: "Procedures Financed" },
  { icon: TrendingDown, value: "Competitive", label: "Broker-Matched Rates" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

/* ── Differentiators ──────────────────────────────────────────────── */
const differentiators = [
  {
    icon: ShieldCheck,
    title: "Transparent & Independent",
    description:
      "We are not a bank or a lender. We are an independent service that connects you with licensed brokers who genuinely shop for the lowest rate on your behalf. No hidden agendas, no tied products.",
  },
  {
    icon: Heart,
    title: "Purpose-Built for Medical",
    description:
      "Unlike generic loan comparison sites, we specialise exclusively in medical procedure financing. Our brokers understand the costs, urgency, and emotional considerations involved in healthcare decisions.",
  },
  {
    icon: DollarSign,
    title: "Always Free for Patients",
    description:
      "Our service is completely free for patients. Lenders pay us when a loan settles, which means our incentives are aligned with yours: we want to find you the best deal possible so you proceed with confidence.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-6">
            About CosmodiLoans
          </h1>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-6 text-center">
            Our Mission
          </h2>
          <div className="space-y-5 text-text-body leading-relaxed text-lg">
            <p>
              Too many Australians delay or forgo medical procedures because they
              believe financing is complicated, expensive, or out of reach. At
              CosmodiLoans, we exist to change that. Our mission is to give every
              patient access to the same competitive rates that were once reserved
              for borrowers who had the time and knowledge to shop around across
              dozens of lenders.
            </p>
            <p>
              We built CosmodiLoans because we saw a gap in the market: patients
              were either going to their bank and accepting the first rate offered,
              or turning to expensive buy-now-pay-later products that often carry
              higher long-term costs. By connecting patients with specialist medical
              finance brokers who compare 20+ lenders, we level the playing field
              and help Australians make informed decisions about financing the care
              they need.
            </p>
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-10 text-center">
            By The Numbers
          </h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-primary-wash mb-4">
                  <stat.icon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-3xl font-bold text-text-dark mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE'RE DIFFERENT ───────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-10 text-center">
            How We&apos;re Different
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {differentiators.map((d) => (
              <Card key={d.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-wash mb-4">
                  <d.icon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-card-h4 text-text-dark mb-2">{d.title}</h3>
                <p className="text-sm text-text-body leading-relaxed">
                  {d.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ────────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-6 text-center">
            Compliance &amp; Licensing
          </h2>
          <Card>
            <div className="space-y-4 text-sm text-text-body leading-relaxed">
              <p>
                CosmodiLoans is a lead generation service that connects patients
                with licensed Australian Credit Licence (ACL) holders. We do not
                provide credit, act as a lender, or provide financial advice.
              </p>
              <p>
                All brokers in our network hold appropriate Australian Credit
                Licences (ACL) or operate as authorised credit representatives
                under the National Consumer Credit Protection Act 2009. They are
                bound by responsible lending obligations and are members of the
                Australian Financial Complaints Authority (AFCA).
              </p>
              <p className="text-text-muted italic">
                [PLACEHOLDER: Insert ACL number, ABN, and specific licensing
                details here once confirmed.]
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary to-[#1e3a8a]">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-section-h2 text-white mb-4 font-bold">
            Ready to Find Your Best Rate?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            It takes 60 seconds and it costs you nothing. Let our brokers do the
            hard work.
          </p>
          <Button
            as={Link}
            href="/apply"
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-primary-wash"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </>
  );
}
