import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, Mail } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { LoanCalculator } from "@/components/calculator/LoanCalculator";
import { RepaymentTableSection } from "./RepaymentTableSection";

export const metadata: Metadata = {
  title: "Medical Loan Repayment Calculator | CosmodiLoans",
  description:
    "Calculate your medical loan repayments instantly. Compare rates from 5.99% across dental, IVF, cosmetic surgery loans. Free interactive calculator with full amortisation schedule.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Medical Loan Repayment Calculator | CosmodiLoans",
    description:
      "Calculate your medical loan repayments instantly. Compare rates from 5.99% across dental, IVF, cosmetic surgery loans.",
    url: "/calculator",
    type: "website",
  },
};

/* ── Rate Comparison Data ────────────────────────────────────────── */
const rateComparisons = [
  { rate: 7.99, label: "Broker Rate", color: "bg-emerald-500", highlight: true },
  { rate: 12.99, label: "Average Bank", color: "bg-amber-500", highlight: false },
  { rate: 18.99, label: "Credit Card", color: "bg-red-500", highlight: false },
];

function calcTotalInterest(principal: number, rate: number, years: number) {
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const payment =
    principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  return Math.round(payment * n - principal);
}

const COMPARISON_AMOUNT = 15_000;
const COMPARISON_TERM = 5;

const comparisonData = rateComparisons.map((r) => ({
  ...r,
  interest: calcTotalInterest(COMPARISON_AMOUNT, r.rate, COMPARISON_TERM),
}));

const maxInterest = Math.max(...comparisonData.map((d) => d.interest));

/* ── FAQ Items ────────────────────────────────────────────────────── */
const faqItems = [
  {
    question: "How accurate is this medical loan calculator?",
    answer:
      "This calculator provides indicative estimates based on standard amortisation formulas. Your actual repayment may differ slightly depending on your lender, fees, and whether rates are fixed or variable. Use it as a guide, then get a personalised quote from our brokers for exact figures.",
  },
  {
    question: "What interest rate should I use in the calculator?",
    answer:
      "If you are unsure of your rate, start with 7.99% which is a typical broker-matched rate for borrowers with good credit. Rates through our network range from 5.99% to 9.99% for most applicants. Credit cards and direct bank loans are often higher at 12-24%.",
  },
  {
    question: "Can I really get a rate as low as 5.99%?",
    answer:
      "Yes. Rates from 5.99% p.a. are available through select lenders in our broker network for applicants with strong credit profiles (typically a credit score above 750). Your broker will shop multiple lenders to find your lowest eligible rate.",
  },
  {
    question: "What loan terms are available for medical procedures?",
    answer:
      "Most medical loans offer terms from 1 to 7 years. Shorter terms mean higher monthly payments but less total interest. Longer terms reduce your monthly commitment but cost more over the life of the loan. Our brokers help you find the right balance.",
  },
  {
    question: "Are there any fees not shown in the calculator?",
    answer:
      "This calculator shows principal and interest repayments only. Some lenders charge establishment fees ($0-$500), monthly account fees ($0-$15), or early repayment fees. Our brokers disclose all fees upfront before you commit to any loan.",
  },
  {
    question: "How does a medical loan differ from a personal loan?",
    answer:
      "Medical loans are personal loans tailored for healthcare costs. They often feature faster approvals, the ability to pay clinics directly, and lenders familiar with medical billing. Rates and terms are comparable, but the application process is streamlined for patients.",
  },
  {
    question: "Will using this calculator affect my credit score?",
    answer:
      "No. Using this calculator has zero impact on your credit score. It runs entirely in your browser with no credit checks. Even when you request a quote from our brokers, the initial soft inquiry does not affect your score.",
  },
  {
    question: "Can I pay off my medical loan early?",
    answer:
      "Most lenders in our network allow early repayment with no penalty or reduced fees. Paying off your loan ahead of schedule saves you interest. Your broker will confirm the specific early repayment terms before you accept any offer.",
  },
];

/* ── Page Schema ──────────────────────────────────────────────────── */
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CosmodiLoans Medical Loan Calculator",
  url: "https://cosmedloans.com.au/calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description:
    "Free interactive medical loan repayment calculator with amortisation schedule. Compare rates for dental, IVF, cosmetic surgery and more.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
  },
};

/* ── Page Component ──────────────────────────────────────────────── */
export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={pageSchema} />

      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-wash to-[#e0ecff] section-padding pb-8 md:pb-12">
        <div className="container-narrow text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full text-sm font-semibold text-primary mb-6">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Free Calculator
          </div>
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Medical Loan Repayment Calculator
          </h1>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            Estimate your monthly repayments for any medical procedure.
            Adjust the loan amount, interest rate, and term to see how
            different options affect your repayments.
          </p>
          <div className="relative w-full max-w-md mx-auto mt-8 aspect-[4/3]">
            <Image
              src="/Images/CALCULATOR PAGE HERO.png"
              alt="Medical loan calculator illustration"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </div>
        </div>
      </section>

      {/* ── 2. CALCULATOR ─────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <LoanCalculator />
        </div>
      </section>

      {/* ── 3. EMAIL CAPTURE ──────────────────────────────────────── */}
      <section className="section-padding bg-surface border-y border-border">
        <div className="container-narrow max-w-2xl">
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-wash">
                <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-text-dark mb-2">
              Email Me These Results
            </h2>
            <p className="text-sm text-text-body mb-6">
              Get a detailed breakdown of your repayment estimate sent to your
              inbox, including the full amortisation schedule.
            </p>
            <form
              action="/api/leads"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input type="hidden" name="procedure" value="calculator-email" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 border border-border rounded-button bg-background text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all text-sm"
                aria-label="Email address"
              />
              <Button type="submit" size="md">
                Send Results
              </Button>
            </form>
            <p className="text-xs text-text-muted mt-3">
              No spam. We&apos;ll only send your calculator results.
            </p>
          </Card>
        </div>
      </section>

      {/* ── 4. REPAYMENT SCHEDULE ─────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-section-h2 text-text-dark mb-3">
              Amortisation Schedule
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              See exactly how each monthly payment is split between principal
              and interest over the life of your loan.
            </p>
          </div>
          <RepaymentTableSection />
        </div>
      </section>

      {/* ── 5. RATE COMPARISON VISUAL ─────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-3">
              Why Your Rate Matters
            </h2>
            <p className="text-body text-text-body max-w-2xl mx-auto">
              See how much you could save on a{" "}
              <span className="font-semibold text-text-dark">
                $15,000 loan over 5 years
              </span>{" "}
              at different interest rates.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {comparisonData.map((item) => (
              <Card
                key={item.rate}
                className={`relative overflow-hidden ${
                  item.highlight
                    ? "ring-2 ring-emerald-500 ring-offset-2"
                    : ""
                }`}
              >
                {item.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white text-xs font-semibold text-center py-1">
                    Best Rate via Broker
                  </div>
                )}
                <div className={item.highlight ? "pt-6" : ""}>
                  <p className="text-sm font-semibold text-text-muted mb-1">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold text-text-dark mb-4">
                    {item.rate}%{" "}
                    <span className="text-base font-normal text-text-muted">
                      p.a.
                    </span>
                  </p>

                  {/* Bar */}
                  <div className="mb-3">
                    <div className="h-4 bg-background rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{
                          width: `${(item.interest / maxInterest) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-text-muted">
                      Total Interest
                    </span>
                    <span className="text-lg font-bold text-text-dark">
                      $
                      {item.interest.toLocaleString("en-AU")}
                    </span>
                  </div>

                  {item.highlight && (
                    <p className="mt-3 text-sm font-semibold text-emerald-600">
                      You save $
                      {(
                        comparisonData[comparisonData.length - 1].interest -
                        item.interest
                      ).toLocaleString("en-AU")}{" "}
                      vs credit card rate
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-xs text-text-muted mt-6">
            Comparison based on a $15,000 loan over 5 years. Actual rates
            depend on credit profile and lender.
          </p>
        </div>
      </section>

      {/* ── 6. SEO CONTENT ────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-8 text-center">
            5 Ways to Get a Lower Medical Loan Rate in Australia
          </h2>

          <div className="space-y-8 text-body text-text-body leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-text-dark mb-3">
                1. Use a Broker Instead of Going Direct
              </h3>
              <p>
                When you apply directly to a single bank, you are limited to
                that bank&apos;s rates and criteria. A finance broker compares
                offers from 20 or more lenders simultaneously, dramatically
                increasing your chances of finding a lower rate. Brokers also
                know which lenders are currently offering promotional rates for
                medical procedures, giving you access to deals you would never
                find on your own. The best part? Broker services like
                CosmodiLoans are completely free for patients &mdash; lenders
                pay the broker, not you.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-dark mb-3">
                2. Improve Your Credit Score Before Applying
              </h3>
              <p>
                Your credit score is the single biggest factor in the interest
                rate you receive. Before applying for a medical loan, check
                your score for free through services like CreditSavvy or
                ClearScore. If it is below 700, consider waiting a few months
                to improve it. Pay down credit card balances, ensure all bills
                are paid on time, and avoid making multiple credit applications
                in a short period. Even a small improvement in your score can
                drop your rate by 1&ndash;2 percentage points, saving you
                hundreds or thousands over the life of the loan.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-dark mb-3">
                3. Choose the Right Loan Term
              </h3>
              <p>
                While longer loan terms reduce your monthly payment, they
                significantly increase the total interest you pay. On a
                $15,000 loan at 7.99%, choosing a 3-year term instead of a
                7-year term saves you over $2,500 in interest. Our calculator
                above lets you compare different terms side by side. The sweet
                spot for most medical loans is 2&ndash;5 years &mdash; long
                enough for manageable payments, short enough to minimise
                interest costs. If your procedure is urgent, start with a
                longer term and make extra repayments when you can.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-dark mb-3">
                4. Consider a Secured Loan for Larger Amounts
              </h3>
              <p>
                For medical procedures costing $20,000 or more, a secured loan
                (backed by an asset like a car or term deposit) can offer rates
                2&ndash;4% lower than an unsecured personal loan. While not
                everyone has assets to pledge, those who do can access
                significantly better rates. Our broker network includes lenders
                who offer both secured and unsecured medical finance, so your
                broker can advise whether a secured option makes sense for your
                situation. The savings on a $30,000 loan can be $3,000 or more
                over the loan term.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-dark mb-3">
                5. Time Your Application Strategically
              </h3>
              <p>
                Interest rates fluctuate with the Reserve Bank of Australia&apos;s
                cash rate decisions and lender competition. After an RBA rate
                cut, lenders often reduce their personal loan rates within
                weeks. Similarly, end-of-financial-year and end-of-quarter
                periods often see lenders offering promotional rates to hit
                targets. If your procedure can wait a few weeks, your broker
                can advise on the best time to apply. Additionally, having a
                stable employment history of at least 6 months and providing
                complete documentation speeds up approval and can improve your
                rate offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-section-h2 text-text-dark mb-4">
              Calculator FAQ
            </h2>
            <p className="text-body text-text-body">
              Common questions about medical loan calculations and rates.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── 8. FINAL CTA ──────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary to-[#1e3a8a]">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-section-h2 text-white mb-4 font-bold">
            Ready to Get Your Personalised Rate?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            The calculator gives you an estimate. Our brokers give you a real
            rate from 20+ lenders &mdash; in 60 seconds, with no credit
            impact.
          </p>
          <Button
            as={Link}
            href="/apply"
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-primary-wash"
          >
            Get Your Personalised Rate
            <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
