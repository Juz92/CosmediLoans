import type { Metadata } from "next";
import { ShieldCheck, Clock, Users } from "lucide-react";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";

export const metadata: Metadata = {
  title: "Get Your Personalised Rate",
  description:
    "Apply for medical procedure financing in 60 seconds. Compare rates from 20+ lenders with no credit impact. Free, fast, and no obligation.",
  alternates: { canonical: "/apply" },
  robots: { index: false },
  openGraph: {
    title: "Get Your Personalised Rate",
    description:
      "Apply for medical procedure financing in 60 seconds. Compare rates from 20+ lenders with no credit impact.",
    url: "/apply",
    type: "website",
  },
};

/* ── Trust Badges ─────────────────────────────────────────────────── */
const trustBadges = [
  {
    icon: ShieldCheck,
    title: "No Credit Impact",
    description: "Soft check only, your credit score stays safe",
  },
  {
    icon: Clock,
    title: "60-Second Process",
    description: "Fill out our quick form and get matched instantly",
  },
  {
    icon: Users,
    title: "20+ Lenders",
    description: "Your broker compares rates across our entire panel",
  },
];

export default function ApplyPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-mist to-primary-sky section-padding min-h-[60vh]">
        <div className="container-narrow">
          <div className="max-w-xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
                Get Your Personalised Rate
              </h1>
              <p className="text-body text-text-body">
                Fill out the form below and a specialist medical finance broker
                will compare 20+ lenders to find your lowest rate.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {trustBadges.map((badge) => (
                <div key={badge.title} className="text-center">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-primary-wash mb-2">
                    <badge.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs font-semibold text-text-dark">
                    {badge.title}
                  </p>
                  <p className="text-xs text-text-muted hidden sm:block">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Lead Form */}
            <HeroLeadForm />

            {/* Disclaimer */}
            <p className="text-xs text-text-muted text-center mt-6">
              By submitting this form you agree to our{" "}
              <a
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Use
              </a>
              . CosmediLoans is a lead generation service, not a credit provider.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
