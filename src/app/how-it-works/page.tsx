import type { Metadata } from "next";
import Link from "next/link";
import { Users, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import { FAQAccordion } from "@/components/content/FAQAccordion";

export const metadata: Metadata = {
  title: "How It Works | 3 Easy Steps to Medical Financing",
  description:
    "Learn how CosmediLoans connects you with 20+ lenders to find the lowest medical loan rate. Simple 3-step process: enquire, compare, get funded.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works | 3 Easy Steps to Medical Financing",
    description:
      "Learn how CosmediLoans connects you with 20+ lenders to find the lowest medical loan rate.",
    url: "/how-it-works",
    type: "website",
  },
};

/* ── Expanded Steps ──────────────────────────────────────────────── */
const steps = [
  {
    number: "1",
    title: "Tell Us What You Need",
    short: "60-second enquiry",
    description:
      "Fill out our simple online form with your procedure type, estimated cost, and basic contact details. The process takes less than 60 seconds, and we never run a hard credit check at this stage. Your information is encrypted and only shared with your assigned broker.",
    details: [
      "No impact to your credit score",
      "Your data is encrypted end-to-end",
      "Choose from 50+ supported procedures",
      "No upfront fees or commitments",
    ],
  },
  {
    number: "2",
    title: "We Shop 20+ Lenders",
    short: "Broker-matched rates",
    description:
      "Your dedicated finance broker receives your enquiry and immediately goes to work comparing rates across our panel of 20+ lenders. Unlike going to a single bank, this means your broker can negotiate across multiple offers to find the most competitive rate for your specific financial situation and procedure.",
    details: [
      "Access to 20+ Australian lenders",
      "Rates compared simultaneously",
      "Broker negotiates on your behalf",
      "You receive the best available offer",
    ],
  },
  {
    number: "3",
    title: "Get Funded & Book In",
    short: "Often same-day funding",
    description:
      "Once your broker presents the best options, you choose the offer that suits you. After accepting, funds are typically disbursed within 1-3 business days, with many lenders offering same-day transfers. You can then book your medical procedure with confidence, knowing the financing is secured.",
    details: [
      "Choose from multiple personalised offers",
      "Funds deposited to your account or provider",
      "Flexible repayment terms from 1-7 years",
      "Ongoing support from your broker",
    ],
  },
];

/* ── Bank vs Broker Comparison ───────────────────────────────────── */
const bankFeatures = [
  { label: "Lenders compared", value: "1" },
  { label: "Rate negotiation", value: "None" },
  { label: "Medical expertise", value: "General" },
  { label: "Application process", value: "In-branch or online" },
  { label: "Approval time", value: "3-7 business days" },
  { label: "Cost to you", value: "Free" },
];

const brokerFeatures = [
  { label: "Lenders compared", value: "20+" },
  { label: "Rate negotiation", value: "Active" },
  { label: "Medical expertise", value: "Specialist" },
  { label: "Application process", value: "60-second online form" },
  { label: "Approval time", value: "Same day - 48 hours" },
  { label: "Cost to you", value: "Free" },
];

/* ── FAQ Subset ──────────────────────────────────────────────────── */
const faqItems = [
  {
    question: "Does it cost anything to use CosmediLoans?",
    answer:
      "There are no fees charged to you. We are paid by the lenders in our network when a loan settles, so there is never a hidden charge or obligation to use our service.",
  },
  {
    question: "How is this different from going to my bank?",
    answer:
      "When you go to a bank, you get one offer from one lender. When you use CosmediLoans, your broker compares rates from 20+ lenders simultaneously, giving you a much higher chance of securing a lower rate.",
  },
  {
    question: "Will my credit score be affected?",
    answer:
      "No. Our initial enquiry uses a soft credit check that does not appear on your credit file. A hard credit inquiry only occurs if you decide to proceed with a formal loan application.",
  },
  {
    question: "How quickly can I get approved?",
    answer:
      "Most patients receive a pre-approval decision within hours. Once you accept an offer, funds are typically available within 1-3 business days, with some lenders offering same-day funding.",
  },
  {
    question: "What if I have a low credit score?",
    answer:
      "Our broker network includes lenders who cater to a range of credit profiles. While a higher credit score generally leads to better rates, we can often find competitive options for various situations.",
  },
  {
    question: "Can I choose which lender I go with?",
    answer:
      "Yes. Your broker will present you with multiple options and explain the pros and cons of each. You are never obligated to accept any offer and the final decision is always yours.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-mist to-primary-sky section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            How CosmediLoans Works
          </h1>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            From your first enquiry to funded in as little as 24 hours. Our
            streamlined, three-step process makes medical financing simple,
            transparent, and straightforward.
          </p>
        </div>
      </section>

      {/* ── TIMELINE 3-STEP PROCESS ───────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-4xl">
          <div className="relative">
            {/* Vertical connector line (desktop) */}
            <div
              className="absolute left-7 top-10 bottom-10 w-0.5 bg-border hidden md:block"
              aria-hidden="true"
            />

            <div className="space-y-12 md:space-y-16">
              {steps.map((step) => (
                <div key={step.number} className="relative flex gap-6 md:gap-10">
                  {/* Circle */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                      {step.short}
                    </p>
                    <h2 className="text-2xl font-bold text-text-dark mb-3">
                      {step.title}
                    </h2>
                    <p className="text-text-body leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm text-text-body"
                        >
                          <CheckCircle2
                            className="h-4 w-4 text-success shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BANK VS BROKER ────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Bank vs. Broker: Why It Matters
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              Going direct to a bank means you get one rate from one lender. Using
              a broker through CosmediLoans means 20+ lenders compete for your
              business.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Bank Card */}
            <Card className="border-2 border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                  <Building2 className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-dark">
                    Going to a Bank
                  </h3>
                  <p className="text-xs text-text-muted">1 lender, 1 rate</p>
                </div>
              </div>
              <ul className="space-y-4">
                {bankFeatures.map((f) => (
                  <li
                    key={f.label}
                    className="flex justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-text-body">{f.label}</span>
                    <span className="text-sm font-semibold text-text-dark">
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Broker Card */}
            <Card className="border-2 border-primary ring-2 ring-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-wash">
                  <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    Using CosmediLoans
                  </h3>
                  <p className="text-xs text-text-muted">20+ lenders competing</p>
                </div>
              </div>
              <ul className="space-y-4">
                {brokerFeatures.map((f) => (
                  <li
                    key={f.label}
                    className="flex justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-text-body">{f.label}</span>
                    <span className="text-sm font-semibold text-primary">
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ── INLINE LEAD FORM ──────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary-wash to-primary-sky">
        <div className="container-narrow max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-section-h2 text-text-dark mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-body text-text-body">
              It takes 60 seconds and there is zero impact to your credit score.
            </p>
          </div>
          <HeroLeadForm />
        </div>
      </section>

      {/* ── FAQ SUBSET ────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Common Questions
            </h2>
            <p className="text-body text-text-body">
              Have more questions?{" "}
              <Link
                href="/faq"
                className="text-primary font-semibold hover:underline"
              >
                View our full FAQ
              </Link>
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-deep">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-section-h2 text-white mb-4 font-bold">
            Find Your Best Rate Today
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of Australians who have financed their medical
            procedures through our broker-matching service.
          </p>
          <Button
            as={Link}
            href="/apply"
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-primary-wash"
          >
            Get Your Personalised Rate <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </>
  );
}
