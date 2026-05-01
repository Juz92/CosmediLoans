"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

const DISMISS_COOKIE = "cosmedi_scroll_cta_dismissed";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function ScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleScroll = useCallback(() => {
    if (dismissed) return;
    const scrollPercent =
      window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPercent >= 0.6) {
      setVisible(true);
    }
  }, [dismissed]);

  useEffect(() => {
    if (getCookie(DISMISS_COOKIE)) {
      setDismissed(true);
      return;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    setCookie(DISMISS_COOKIE, "1", 7);
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 hidden md:block animate-slide-up">
      <div role="complementary" aria-live="polite" className="bg-primary text-white px-6 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
        <div className="container-narrow flex items-center justify-between gap-4">
          <p className="text-sm font-medium">
            Still researching? Get a free rate check, no commitment.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              as={Link}
              href="/apply"
              variant="secondary"
              size="sm"
              className="bg-white text-primary hover:bg-primary-wash"
            >
              Check My Rate &rarr;
            </Button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
