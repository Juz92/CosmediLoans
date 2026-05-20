import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LEGAL } from "@/lib/site";

const footerColumns = [
  {
    title: "Procedures",
    links: [
      { href: "/procedures/dental-loans", label: "Dental Loans" },
      { href: "/procedures/ivf-financing", label: "IVF Financing" },
      { href: "/procedures/breast-augmentation-loans", label: "Cosmetic Surgery" },
      { href: "/procedures/lasik-loans", label: "LASIK Loans" },
      { href: "/procedures/bariatric-surgery-loans", label: "Bariatric Surgery" },
      { href: "/procedures", label: "View all procedures" },
    ],
  },
  {
    title: "Locations",
    links: [
      { href: "/locations/sydney", label: "Sydney" },
      { href: "/locations/melbourne", label: "Melbourne" },
      { href: "/locations/brisbane", label: "Brisbane" },
      { href: "/locations/perth", label: "Perth" },
      { href: "/locations/adelaide", label: "Adelaide" },
      { href: "/locations/gold-coast", label: "Gold Coast" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/calculator", label: "Loan Calculator" },
      { href: "/guides", label: "Payment Plan Guides" },
      { href: "/guides/topics/dental-finance", label: "Dental Finance Hub" },
      { href: "/guides/topics/ivf-finance", label: "IVF Finance Hub" },
      { href: "/guides/topics/cosmetic-surgery-finance", label: "Cosmetic Surgery Hub" },
      { href: "/blog", label: "Guides & Articles" },
      { href: "/compare", label: "Compare Options" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/editorial-policy", label: "Editorial Policy" },
    ],
  },
];

const socialMarks = [
  { label: "Facebook", mark: "f" },
  { label: "Instagram", mark: "ig" },
  { label: "LinkedIn", mark: "in" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <section className="relative overflow-hidden bg-primary-light text-white">
        <svg
          className="absolute inset-0 h-full w-full text-primary opacity-30"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 92c126-62 276-66 450-12 164 51 316 56 456 13 199-62 363-47 534 45v82H0V92Z"
            fill="white"
            opacity="0.2"
          />
          <path
            d="M0 142c148-54 306-55 474-3 170 53 318 52 445-3 168-72 340-64 521 24v60H0v-78Z"
            fill="currentColor"
            opacity="0.12"
          />
        </svg>

        <div className="container-narrow relative flex flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-section-x">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/90 shadow-brand-soft">
              <ShieldCheck className="h-8 w-8 text-primary-light" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Ready to Find Your Best Rate?
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-white/85">
                Join thousands of Australians who have financed their medical procedures with confidence.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-primary px-6 text-sm font-bold text-white shadow-brand-soft transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-light"
            >
              Get Your Personalised Rate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="text-xs font-medium text-white/80">
              Free quote | No obligation | Takes 60 seconds
            </p>
          </div>
        </div>
      </section>

      <div className="bg-primary">
        <div className="container-narrow px-6 py-12 md:px-section-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <h2 className="mb-3 text-sm font-bold text-white">{col.title}</h2>
                  <ul className="space-y-1.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-8 items-center text-sm font-medium text-white/70 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lg:text-right">
              <BrandLogo light className="lg:justify-end" />
              <div className="mt-5 flex gap-3 lg:justify-end">
                {socialMarks.map((social) => (
                  <span
                    key={social.label}
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[11px] font-extrabold uppercase tracking-tight text-white/80"
                  >
                    {social.mark}
                  </span>
                ))}
              </div>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-sm font-semibold text-white/80">
                Proudly Australian
                <span className="rounded-[4px] border border-white/25 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  AU
                </span>
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center">
            <p className="mx-auto max-w-5xl text-[11px] leading-5 text-white/60">
              CosmediLoans is a lead generation service that connects consumers with licensed finance brokers. We do not provide credit, financial advice, or act as a lender. All loan applications are subject to lender assessment and approval. Rates and terms vary based on individual circumstances.
            </p>
            <p className="mt-4 text-[11px] leading-5 text-white/60">
              ABN {LEGAL.abn} |{" "}
              <a href={`mailto:${LEGAL.email}`} className="transition hover:text-white">
                {LEGAL.email}
              </a>{" "}
              |{" "}
              <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="transition hover:text-white">
                {LEGAL.phone}
              </a>{" "}
              | Copyright {new Date().getFullYear()} CosmediLoans. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
