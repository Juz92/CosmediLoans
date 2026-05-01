"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, Clock, PlayCircle, ShieldCheck } from "lucide-react";

const videoNotes = [
  {
    icon: Clock,
    title: "60-second enquiry",
    text: "The form asks for the essentials only: treatment type, amount, and contact details.",
  },
  {
    icon: ShieldCheck,
    title: "Soft-credit pathway",
    text: "Patients can check their rate path before committing to a full application.",
  },
  {
    icon: CheckCircle,
    title: "Broker comparison",
    text: "A specialist broker compares lender fit, timing, fees, and repayment options.",
  },
];

export function ProcessVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrainedConnection =
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    if (constrainedConnection) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-y border-border bg-background">
      <div className="container-narrow grid gap-8 px-6 py-12 md:px-section-x lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            <PlayCircle className="h-4 w-4 text-primary-light" aria-hidden="true" />
            Rate check walkthrough
          </p>
          <h2 className="mt-3 max-w-xl text-section-h2 text-text-dark">
            See how the quick rate check fits around your procedure quote.
          </h2>
          <p className="mt-4 max-w-xl text-body text-text-body">
            Watch what happens after you share your procedure type and estimated
            quote. The process is built to keep the first step simple while giving
            your broker enough detail to compare suitable lender options.
          </p>

          <div className="mt-7 grid gap-4">
            {videoNotes.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-body">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-card border border-border bg-surface shadow-brand-panel">
            <video
              ref={videoRef}
              className="aspect-video w-full bg-primary-wash object-cover"
              controls
              muted
              playsInline
              preload="metadata"
              poster="/videos/hero-poster.jpg"
              aria-describedby="rate-check-video-summary"
            >
              <source src="/videos/hero-scroll.mp4" type="video/mp4" />
            </video>
          </div>
          <p id="rate-check-video-summary" className="sr-only">
            A short visual walkthrough of the CosmediLoans enquiry flow, from a
            procedure quote through to broker-matched lender comparison.
          </p>
        </div>
      </div>
    </section>
  );
}
