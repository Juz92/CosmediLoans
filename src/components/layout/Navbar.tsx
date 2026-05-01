"use client";

import { useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { procedures } from "@/data/procedures";

const otherLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [proceduresOpen, setProceduresOpen] = useState(false);
  const proceduresLinkRef = useRef<HTMLAnchorElement>(null);

  const closeProceduresIfFocusLeaves = (event: FocusEvent<HTMLLIElement>) => {
    const nextTarget = event.relatedTarget;
    if (!nextTarget || !event.currentTarget.contains(nextTarget as Node)) {
      setProceduresOpen(false);
    }
  };

  const handleProceduresKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape") {
      setProceduresOpen(false);
      proceduresLinkRef.current?.focus();
    }
  };

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-section-x">
        <BrandLogo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {/* Procedures, hover dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setProceduresOpen(true)}
              onMouseLeave={() => setProceduresOpen(false)}
              onFocus={() => setProceduresOpen(true)}
              onBlur={closeProceduresIfFocusLeaves}
              onKeyDown={handleProceduresKeyDown}
            >
              <Link
                ref={proceduresLinkRef}
                href="/procedures"
                aria-haspopup="true"
                aria-expanded={proceduresOpen}
                className="flex min-h-11 items-center gap-1 text-[15px] font-medium text-text-body hover:text-text-dark transition-colors"
              >
                Procedures
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${proceduresOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </Link>

              {/* Dropdown panel */}
              {proceduresOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] border border-border p-4 w-[500px]">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-1">
                      Browse procedures
                    </p>
                    <div className="grid grid-cols-3 gap-0.5">
                      {procedures.map((proc) => (
                        <Link
                          key={proc.slug}
                          href={`/procedures/${proc.slug}`}
                          className="flex min-h-11 items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-text-body hover:bg-primary-wash hover:text-primary transition-colors"
                        >
                          <span className="text-base leading-none shrink-0">{proc.icon}</span>
                          <span className="font-medium leading-tight">{proc.title}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-3">
                      <Link
                        href="/procedures"
                        className="flex min-h-11 items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        View all procedures
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Other nav links */}
            {otherLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-text-body hover:text-text-dark transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button size="sm" as={Link} href="/apply" className="gap-1.5 px-5">
            Get Your Rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Mobile drawer */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-body"
              aria-label="Navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-text-dark/20 z-50" />
            <Dialog.Content className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <BrandLogo />
                <Dialog.Close asChild>
                  <button
                    className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-body"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </Dialog.Close>
              </div>

              <ul className="space-y-1">
                <li>
                  <Dialog.Close asChild>
                    <Link
                      href="/procedures"
                      className="block text-base font-medium text-text-body hover:text-primary py-3 min-h-[44px]"
                    >
                      Procedures
                    </Link>
                  </Dialog.Close>
                </li>
                {otherLinks.map((link) => (
                  <li key={link.href}>
                    <Dialog.Close asChild>
                      <Link
                        href={link.href}
                        className="block text-base font-medium text-text-body hover:text-primary py-3 min-h-[44px]"
                      >
                        {link.label}
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>

              <Dialog.Close asChild>
                <Button className="w-full mt-6 gap-1.5" as={Link} href="/apply">
                  Get Your Rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </nav>
  );
}
