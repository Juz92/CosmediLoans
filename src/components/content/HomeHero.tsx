import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";
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
        quality={65}
        sizes="(max-width: 767px) 1px, (min-width: 1280px) 760px, 52vw"
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
      <div className="hero-bold-command">
        <div className="hero-bold-command__grid">
          <div>
            <div className="hero-bold-command__eyebrow">
              <ShieldCheck className="h-4 w-4 text-primary-light" aria-hidden="true" />
              Trusted by Australian Patients
            </div>
            <h1 className="hero-bold-command__title">
              Finance any medical procedure. <span>Find your lowest rate.</span>
            </h1>
            <p className="hero-bold-command__copy">
              Compare rates from 20+ lenders in 60 seconds. Expert brokers help you
              find the best deal for dental, IVF, cosmetic surgery and more.
            </p>
            <div className="hero-bold-command__chips">
              {trustItems.map((item) => (
                <div key={item.label} className="hero-bold-command__chip">
                  <item.icon className="h-4 w-4 shrink-0 text-primary-light" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-bold-command__desk">
              <div className="hero-bold-command__desk-head">
                <div>
                  <p className="hero-bold-command__label">Clear Funding Desk</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-text-dark">
                    One soft-check path from treatment quote to lender-ready option.
                  </p>
                </div>
                <div className="hero-bold-command__panel">20+ lender panel</div>
              </div>
              <ol className="hero-bold-command__steps">
                {fundingPath.map((item, index) => (
                  <li key={item.label} className="hero-bold-command__step">
                    <p className="text-xs font-black text-primary-light">{index + 1}</p>
                    <p className="mt-2 text-sm font-bold text-text-dark">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-text-body">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="hero-bold-command__form">
            <HeroLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
