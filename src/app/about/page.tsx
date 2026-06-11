import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Stethoscope,
  TrendingDown,
  Star,
  ShieldCheck,
  Heart,
  DollarSign,
  ArrowRight,
  CheckCircle,
  XCircle,
  MapPin,
  UserRound,
} from "lucide-react";
import { Card, Button } from "@/components/ui";
import { authors } from "@/data/authors";
import { LEGAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Medical Financing Made Simple",
  description:
    "CosmediLoans connects Australian patients with expert brokers who compare 20+ lenders for the best medical loan rate. Free, fast, and no obligation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Medical Financing Made Simple",
    description:
      "CosmediLoans connects Australian patients with expert brokers who compare 20+ lenders for the best medical loan rate.",
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

/* ── What we do / don't do ────────────────────────────────────────── */
const whatWeDo = [
  "Collect your enquiry online and pass it to a licensed Australian finance broker who specialises in medical procedure financing",
  "Give you access to brokers who compare loan products from a panel of 20+ lenders, instead of a single bank's rate card",
  "Publish guides, cost ranges, and comparison content to help you research procedure finance before you apply",
  "Operate 100% online, Australia-wide, across every state and territory",
];

const whatWeDont = [
  "We are not a lender or credit provider, and we do not hold an Australian Credit Licence (ACL). We never lend money ourselves",
  "We do not provide credit assistance, arrange credit, or act as an intermediary in any credit transaction",
  "We do not give personal financial advice. Everything on this site is general information that does not consider your individual situation",
  "We do not decide loan approvals. Approval, rates, and terms are determined by the lender after the broker's assessment",
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
    title: "No Fees for Patients",
    description:
      "Lenders pay us when a loan settles, which means our incentives are aligned with yours: we want to find you the best deal possible so you proceed with confidence.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-mist to-primary-sky section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-6">
            About CosmediLoans
          </h1>
          <div className="relative w-full max-w-3xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-lg aspect-[16/9]">
            <Image
              src="/Images/ABOUT PAGE HERO.png"
              alt="CosmediLoans team helping Australians finance medical procedures"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
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
              CosmediLoans, we exist to change that. Our mission is to give every
              patient access to the same competitive rates that were once reserved
              for borrowers who had the time and knowledge to shop around across
              dozens of lenders.
            </p>
            <p>
              We built CosmediLoans because we saw a gap in the market: patients
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

      {/* ── WHAT WE DO / DON'T DO ─────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-text-dark mb-4 text-center">
            What We Do — and What We Don&apos;t
          </h2>
          <p className="text-text-body text-center max-w-2xl mx-auto mb-10">
            CosmediLoans is a lead generation and broker-matching service. Being
            clear about where our role starts and stops matters, because the
            money you borrow for a medical procedure is a serious commitment.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-card-h4 text-text-dark mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                What we do
              </h3>
              <ul className="space-y-3">
                {whatWeDo.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-text-body leading-relaxed">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-card-h4 text-text-dark mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-text-muted" aria-hidden="true" />
                What we don&apos;t do
              </h3>
              <ul className="space-y-3">
                {whatWeDont.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-text-body leading-relaxed">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ── HOW WE MAKE MONEY ─────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-6 text-center">
            How We Make Money
          </h2>
          <div className="space-y-5 text-text-body leading-relaxed text-lg">
            <p>
              We are paid a commission by the lender when a loan settles. You
              are never charged a fee by CosmediLoans: no upfront fees, no
              application fees, and no hidden charges. The commission is built
              into the loan product itself, the same product you would receive
              if you went to that lender directly.
            </p>
            <p>
              This model means we only earn anything when a patient actually
              finds a loan that works for them, which keeps our incentives
              aligned with yours. It also means you should still compare any
              offer carefully: submitting an enquiry never obliges you to
              accept one, and repayments are always made to the lender, not to
              us.
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

      {/* ── WHO IS BEHIND COSMEDILOANS ────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-6 text-center">
            Who&apos;s Behind CosmediLoans
          </h2>
          {authors.map((author) => (
            <Card key={author.slug} id={`author-${author.slug}`} className="scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                  <UserRound className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-3 text-sm text-text-body leading-relaxed">
                  <p className="text-base font-bold text-text-dark">
                    {author.name}
                    <span className="ml-2 font-medium text-text-muted">
                      {author.role}
                    </span>
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    {author.credentials}
                  </p>
                  <p>{author.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── SERVICE COVERAGE ──────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-section-h2 text-text-dark mb-6 text-center">
            Where We Operate
          </h2>
          <Card>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  CosmediLoans serves patients across all Australian states and
                  territories. The service is 100% online: there is no branch to
                  visit, and your location does not change the lender panel your
                  broker can access. Whether you are in{" "}
                  <Link href="/locations/sydney" className="text-primary hover:underline">Sydney</Link>,{" "}
                  <Link href="/locations/melbourne" className="text-primary hover:underline">Melbourne</Link>,{" "}
                  <Link href="/locations/brisbane" className="text-primary hover:underline">Brisbane</Link>,{" "}
                  <Link href="/locations/perth" className="text-primary hover:underline">Perth</Link>,{" "}
                  <Link href="/locations/adelaide" className="text-primary hover:underline">Adelaide</Link>, the{" "}
                  <Link href="/locations/gold-coast" className="text-primary hover:underline">Gold Coast</Link>,
                  or a regional area, the enquiry process is the same.
                </p>
                <p>
                  You can reach the team by email at{" "}
                  <a href={`mailto:${LEGAL.email}`} className="text-primary hover:underline">
                    {LEGAL.email}
                  </a>{" "}
                  or by phone on{" "}
                  <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                    {LEGAL.phone}
                  </a>
                  .
                </p>
              </div>
            </div>
          </Card>
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
                CosmediLoans (ABN {LEGAL.abn}) is a lead generation service that
                connects patients with licensed Australian Credit Licence (ACL)
                holders. We do not hold an ACL ourselves, we do not provide
                credit, act as a lender, or provide financial advice, and we are
                not a party to any loan contract you enter into.
              </p>
              <p>
                All brokers in our network hold appropriate Australian Credit
                Licences (ACL) or operate as authorised credit representatives
                under the National Consumer Credit Protection Act 2009. They are
                bound by responsible lending obligations and are members of the
                Australian Financial Complaints Authority (AFCA).
              </p>
              <p>
                For the full detail, read our{" "}
                <Link href="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>,{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>,{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, and{" "}
                <Link href="/editorial-policy" className="text-primary hover:underline">Editorial Policy</Link>,
                which explains how the finance content on this site is written
                and reviewed.
              </p>
              <p>
                <strong>CosmediLoans</strong> &middot; ABN {LEGAL.abn} &middot;{" "}
                <a href={`mailto:${LEGAL.email}`} className="text-primary hover:underline">
                  {LEGAL.email}
                </a>{" "}
                &middot;{" "}
                <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {LEGAL.phone}
                </a>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-deep">
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
