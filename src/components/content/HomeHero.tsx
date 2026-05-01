import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";

const trustItems = [
  { icon: ShieldCheck, label: "No credit impact" },
  { icon: Building2, label: "20+ lenders" },
  { icon: Zap, label: "Fast approvals" },
  { icon: BadgeCheck, label: "Australia-wide" },
];

const fundingPath = [
  { label: "Quote in", text: "Procedure, amount, timing" },
  { label: "Broker match", text: "Lenders ranked by fit" },
  { label: "Book clearer", text: "Know the finance path first" },
];

function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(760px,52vw)] overflow-visible md:block"
      aria-hidden="true"
    >
      <Image
        src="/Images/hero-art.webp"
        alt=""
        width={1200}
        height={1200}
        loading="lazy"
        sizes="(min-width: 1280px) 760px, 52vw"
        className="absolute left-[-9rem] top-10 h-auto w-[min(800px,56vw)] max-w-none select-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 68% 52%, black 0%, black 56%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse at 68% 52%, black 0%, black 56%, transparent 78%)",
        }}
      />
      <div className="absolute inset-y-0 left-[-10rem] w-72 bg-gradient-to-r from-white via-white/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-hero-surface">
      <HeroBackdrop />
      <div className="absolute inset-x-0 top-0 h-px bg-white" aria-hidden="true" />
      <div className="container-narrow relative px-6 pb-10 pt-10 md:px-section-x md:pb-12 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.86fr)] lg:gap-14">
          <div className="relative z-10">
            <Badge className="mb-5 gap-2 bg-white/75 text-primary shadow-brand-soft ring-1 ring-primary-light/15">
              <ShieldCheck className="h-4 w-4 text-primary-light" aria-hidden="true" />
              Trusted by Australian Patients
            </Badge>

            <h1 className="max-w-[610px] text-[40px] font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-[64px]">
              Finance Any Medical Procedure. Find Your Lowest Rate.
            </h1>

            <p className="mt-5 max-w-[590px] text-base leading-8 text-text-body md:text-lg">
              Compare rates from 20+ lenders in 60 seconds. Our expert brokers help you find the best deal for dental, IVF, cosmetic surgery and more - so you can book with confidence.
            </p>

            <div className="mt-7 grid max-w-[620px] gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex min-h-11 items-center gap-2 rounded-button border border-primary-light/20 bg-white/80 px-3 text-sm font-semibold text-text-body shadow-brand-soft"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-primary-light" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-[640px] rounded-[20px] border border-primary-light/20 bg-white/90 p-4 shadow-brand-panel">
              <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-light">
                    Clear Funding Desk
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-text-dark">
                    One soft-check path from treatment quote to lender-ready option.
                  </p>
                </div>
                <div className="rounded-button bg-primary px-4 py-2 text-sm font-bold text-white">
                  20+ lender panel
                </div>
              </div>

              <ol className="mt-4 grid gap-3 md:grid-cols-3">
                {fundingPath.map((item, index) => (
                  <li key={item.label} className="relative rounded-button bg-primary-wash px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-xs font-extrabold text-primary shadow-card">
                        {index + 1}
                      </span>
                      {index < fundingPath.length - 1 && (
                        <ArrowRight className="hidden h-4 w-4 text-primary-light md:block" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-bold text-text-dark">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-text-body">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative z-0 min-h-[560px] lg:min-h-[610px]">
            <div className="relative z-10 mx-auto max-w-[410px] pt-2 sm:pt-8 lg:ml-4 lg:mr-0 lg:pt-7">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
