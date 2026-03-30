import Link from "next/link";
import { ShieldCheck, Check, Heart, Stethoscope, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Badge, Card, Button } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import { TrustBar } from "@/components/content/TrustBar";
import { HowItWorks } from "@/components/content/HowItWorks";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { TestimonialGrid } from "@/components/content/TestimonialGrid";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { StickyMobileCTA } from "@/components/lead-capture/StickyMobileCTA";
import { ScrollCTA } from "@/components/lead-capture/ScrollCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { procedures } from "@/data/procedures";

/* ── Procedure Grid Data (first 8) ──────────────────────────────── */
const featuredProcedures = procedures.slice(0, 8);

/* ── Why Choose Us Benefits ─────────────────────────────────────── */
const benefits = [
  {
    icon: Stethoscope,
    title: "Broker-Matched, Not Bank-Locked",
    description:
      "Unlike going direct to a bank, our brokers compare 20+ lenders to find the most competitive rate for your specific situation.",
  },
  {
    icon: Heart,
    title: "Built for Medical",
    description:
      "We specialise exclusively in medical procedure financing. Our brokers understand the costs, timelines, and urgency involved.",
  },
  {
    icon: DollarSign,
    title: "Zero Cost, Zero Catch",
    description:
      "Our service is 100% free for patients. We're paid by lenders, not by you. No hidden fees, ever.",
  },
  {
    icon: Clock,
    title: "Approved in Minutes",
    description:
      "Most patients receive a decision within hours. Same-day approvals are common, so you can book your procedure sooner.",
  },
];

/* ── Loan Example Cards ─────────────────────────────────────────── */
const loanExamples = [
  {
    procedure: "Dental Work",
    amount: "$5,000",
    rate: "6.99%",
    term: "3 years",
    monthly: "$154",
  },
  {
    procedure: "IVF Treatment",
    amount: "$15,000",
    rate: "7.99%",
    term: "5 years",
    monthly: "$297",
  },
  {
    procedure: "Cosmetic Surgery",
    amount: "$30,000",
    rate: "8.99%",
    term: "7 years",
    monthly: "$468",
  },
];

/* ── FAQ Items ───────────────────────────────────────────────────── */
const faqItems = [
  {
    question: "What is CosmodiLoans?",
    answer:
      "CosmodiLoans is a free broker-matching service that helps Australian patients find the lowest interest rates on medical procedure financing. We compare offers from 20+ lenders to find the best deal for your situation.",
  },
  {
    question: "How much does it cost to use CosmodiLoans?",
    answer:
      "Nothing. Our service is 100% free for patients. We are paid by the lenders in our network, so there is never a fee or hidden cost to you.",
  },
  {
    question: "Will checking my rate affect my credit score?",
    answer:
      "No. Our initial rate check uses a soft credit inquiry which does not impact your credit score. A hard inquiry only occurs if you choose to proceed with a formal application.",
  },
  {
    question: "What procedures can I finance?",
    answer:
      "We finance virtually any medical or cosmetic procedure including dental implants, veneers, IVF, breast augmentation, rhinoplasty, LASIK, bariatric surgery, hair transplants, and more. If your procedure is not listed, select 'Other' and we will still help.",
  },
  {
    question: "How quickly can I get approved?",
    answer:
      "Most patients receive a pre-approval decision within hours. Once you accept an offer, funds are typically disbursed within 1-3 business days, with some lenders offering same-day funding.",
  },
  {
    question: "What interest rates can I expect?",
    answer:
      "Rates start from 6.99% p.a. depending on your credit profile, loan amount, and term. Because we compare 20+ lenders, you are more likely to find a competitive rate than going to a single bank.",
  },
  {
    question: "Do I need a good credit score to apply?",
    answer:
      "We work with a range of credit profiles. While better credit scores typically receive lower rates, our broker network includes lenders who specialise in various credit situations.",
  },
  {
    question: "How much can I borrow?",
    answer:
      "Loan amounts typically range from $2,000 to $100,000 depending on the procedure and your financial situation. Terms range from 1 to 7 years.",
  },
  {
    question: "Is CosmodiLoans a lender?",
    answer:
      "No. CosmodiLoans is a lead generation and broker-matching service. We connect you with licensed finance brokers who then compare offers from their lender panels to find your best rate.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Most lenders in our network allow early repayment with no penalty or reduced fees. Your broker will confirm the specific early repayment terms before you accept any offer.",
  },
];

/* ── Organization Schema ─────────────────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CosmodiLoans",
  url: "https://cosmedloans.com.au",
  description:
    "Compare medical procedure financing rates from 20+ lenders. Free broker-matched quotes for dental, IVF, cosmetic surgery and more.",
  areaServed: {
    "@type": "Country",
    name: "Australia",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-wash to-[#e0ecff] section-padding pb-12 md:pb-section-y">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left column — content */}
            <div className="flex flex-col justify-center pt-2">
              <Badge className="mb-6 self-start">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Trusted by Australian Patients
              </Badge>
              <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-5 leading-tight">
                Finance Any Medical Procedure.{" "}
                <span className="text-primary">Find Your Lowest Rate.</span>
              </h1>
              <p className="text-body text-text-body mb-8 max-w-lg">
                Compare rates from 20+ lenders in 60 seconds. Our expert brokers
                find you the best deal for dental, IVF, cosmetic surgery, and
                more &mdash; at no cost to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <div className="flex items-center gap-2 text-sm text-text-body">
                  <ShieldCheck className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                  <span>No credit impact</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-body">
                  <Check className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                  <span>100% free service</span>
                </div>
              </div>
            </div>

            {/* Right column — lead form */}
            <div className="lg:max-w-md lg:ml-auto">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── PROCEDURE GRID ────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Procedures We Finance
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              From dental implants to cosmetic surgery, we help Australians
              finance the care they need at rates they can afford.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featuredProcedures.map((proc) => (
              <ProcedureCard
                key={proc.slug}
                slug={proc.slug}
                icon={proc.icon}
                title={proc.title}
                avgCostRange={proc.avgCostRange}
                rateFrom={proc.rateFrom}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/procedures"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Don&apos;t see your procedure? We finance all medical treatments
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Why Choose CosmodiLoans
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              We&apos;re not a bank. We&apos;re your shortcut to the best
              medical loan rate in Australia.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <benefit.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-card-h4 text-text-dark mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOAN EXAMPLES ─────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Example Repayments
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              See what your repayments could look like. Rates vary by lender and
              credit profile &mdash; use our{" "}
              <Link
                href="/calculator"
                className="text-primary font-semibold hover:underline"
              >
                calculator
              </Link>{" "}
              for a personalised estimate.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {loanExamples.map((example) => (
              <Card key={example.procedure} className="text-center">
                <p className="text-sm font-semibold text-primary mb-1">
                  {example.procedure}
                </p>
                <p className="text-3xl font-bold text-text-dark mb-1">
                  {example.monthly}
                  <span className="text-base font-normal text-text-muted">
                    /mo
                  </span>
                </p>
                <div className="flex justify-center gap-3 text-xs text-text-muted mt-2">
                  <span>{example.amount}</span>
                  <span>&middot;</span>
                  <span>{example.rate} p.a.</span>
                  <span>&middot;</span>
                  <span>{example.term}</span>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted mt-6">
            Repayment examples are illustrative only. Actual rates and terms
            depend on your credit profile and lender.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <TestimonialGrid />

      {/* ── FAQ SECTION ───────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body text-text-body">
              Everything you need to know about medical procedure financing.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary to-[#1e3a8a]">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-section-h2 text-white mb-4 font-bold">
            Ready to Find Your Best Rate?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of Australians who&apos;ve financed their medical
            procedures with confidence. Free, fast, and no credit impact.
          </p>
          <Button as={Link} href="/apply" size="lg" variant="secondary" className="bg-white text-primary hover:bg-primary-wash">
            Get Your Personalised Rate &rarr;
          </Button>
        </div>
      </section>

      {/* ── CONVERSION COMPONENTS ─────────────────────────────────── */}
      <StickyMobileCTA />
      <ScrollCTA />
    </>
  );
}
