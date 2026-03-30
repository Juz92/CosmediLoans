"use client";

import { useState, useRef, useEffect } from "react";
import { ShieldCheck, Check } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import Link from "next/link";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Freeze near the end (last 0.3s) and slide in content
      if (video.duration && video.currentTime >= video.duration - 0.3 && !hasTriggered.current) {
        hasTriggered.current = true;
        video.pause();
        setVideoPlaying(false);
        // Small delay before content slides in for dramatic effect
        setTimeout(() => setContentVisible(true), 200);
      }
    };

    const handleEnded = () => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        setVideoPlaying(false);
        setTimeout(() => setContentVisible(true), 200);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Allow clicking to skip the video
  const handleSkip = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    const video = videoRef.current;
    if (video) {
      // Seek to near the end so the final frame shows
      video.currentTime = video.duration ? video.duration - 0.1 : 0;
      video.pause();
    }
    setVideoPlaying(false);
    setTimeout(() => setContentVisible(true), 200);
  };

  return (
    <section className="relative min-h-[85svh] w-full overflow-hidden bg-[#bcc1d1]">
      {/* Video — centred, fills the section seamlessly */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          className="w-full h-auto scale-[0.83] origin-center"
        >
          <source src="/videos/hero-scroll.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Soft vignette — fades the outer edges to white so it transitions cleanly to the rest of the page */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 75% 70% at center, transparent 45%, rgba(240,244,250,0.6) 70%, #f0f4fa 100%)",
        }}
      />

      {/* Gradient overlay — fades in when video ends to make text readable */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          contentVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "rgba(240,244,250,0.88)",
        }}
      />

      {/* Skip button — visible while video plays */}
      {videoPlaying && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-30 px-4 py-2 bg-white/80 backdrop-blur-sm text-text-body text-sm font-medium rounded-full hover:bg-white transition-all shadow-card"
        >
          Skip intro →
        </button>
      )}

      {/* Content — slides in after video freezes */}
      <div className="relative z-20 min-h-[85svh] flex items-center">
        <div className="mx-auto max-w-7xl w-full px-6 md:px-section-x py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left — text content slides in from left */}
            <div
              className={`transition-all duration-700 ease-out ${
                contentVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
              }`}
            >
              <Badge className="mb-6">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Trusted by Australian Patients
              </Badge>
              <h1 className="text-4xl md:text-[52px] font-bold text-text-dark mb-5 leading-[1.1] tracking-tight">
                Finance Any Medical Procedure.{" "}
                <span className="text-primary">Find Your Lowest Rate.</span>
              </h1>
              <p className="text-lg text-text-body mb-8 max-w-lg leading-relaxed">
                Compare rates from 20+ lenders in 60 seconds. Our expert brokers
                find you the best deal for dental, IVF, cosmetic surgery, and
                more — at no cost to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-text-body">
                  <ShieldCheck className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                  <span>No credit impact</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-body">
                  <Check className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                  <span>100% free service</span>
                </div>
              </div>
              {/* Mobile CTA — shows on small screens where form is below fold */}
              <div className="lg:hidden">
                <Button as={Link} href="#lead-form" size="lg" className="w-full sm:w-auto">
                  Get Your Rate →
                </Button>
              </div>
            </div>

            {/* Right — lead form slides in from right */}
            <div
              id="lead-form"
              className={`lg:max-w-md lg:ml-auto transition-all duration-700 ease-out delay-150 ${
                contentVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
            >
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
