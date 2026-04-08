import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Phone, FileSearch, CalendarCheck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";
import { ConversionPixel } from "./ConversionPixel";

export const metadata: Metadata = {
  title: "Thank You | CosmediLoans",
  description:
    "Your enquiry has been received. A specialist broker will contact you shortly with personalised rate options.",
  robots: { index: false },
};

/* ── What Happens Next Steps ──────────────────────────────────────── */
const nextSteps = [
  {
    icon: Phone,
    title: "Broker Contact",
    description:
      "A specialist medical finance broker will contact you within 2 business hours to discuss your needs and confirm your details.",
  },
  {
    icon: FileSearch,
    title: "Rate Comparison",
    description:
      "Your broker will compare rates from 20+ lenders, shortlisting the most competitive options for your procedure and financial situation.",
  },
  {
    icon: CalendarCheck,
    title: "Choose & Get Funded",
    description:
      "Review your personalised offers, choose the one that suits you best, and receive funds — often within 1-3 business days.",
  },
];

/* ── Related Content Links ────────────────────────────────────────── */
const relatedLinks = [
  {
    href: "/calculator",
    label: "Loan Calculator",
    description: "Estimate your repayments",
  },
  {
    href: "/procedures",
    label: "Browse Procedures",
    description: "Explore procedures we finance",
  },
  {
    href: "/faq",
    label: "FAQ",
    description: "Common questions answered",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <ConversionPixel />

      {/* ── CONFIRMATION ──────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff]">
        <div className="container-narrow max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle
                className="h-12 w-12 text-success"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            You&apos;re All Set!
          </h1>
          <p className="text-lg text-text-body max-w-lg mx-auto">
            Your enquiry has been received. A specialist medical finance broker
            will be in touch shortly with personalised rate options.
          </p>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ─────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-10 text-center">
            What Happens Next
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {nextSteps.map((step, i) => (
              <Card key={step.title} className="text-center">
                <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-primary text-white text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <step.icon
                  className="h-8 w-8 text-primary mx-auto mb-3"
                  aria-hidden="true"
                />
                <h3 className="text-card-h4 text-text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-body leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED CONTENT ───────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            While You Wait
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card hover className="h-full">
                  <h3 className="text-card-h4 text-text-dark mb-1">
                    {link.label}
                  </h3>
                  <p className="text-sm text-text-body mb-3">
                    {link.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Visit <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
