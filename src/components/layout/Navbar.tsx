"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { procedures } from "@/data/procedures";

const otherLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [proceduresOpen, setProceduresOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:px-section-x">
        <Link href="/" className="text-[22px] font-bold text-primary">
          Cosmedi<span className="text-primary-light">Loans</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {/* Procedures — hover dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setProceduresOpen(true)}
              onMouseLeave={() => setProceduresOpen(false)}
            >
              <Link
                href="/procedures"
                className="flex items-center gap-1 text-[15px] font-medium text-text-body hover:text-text-dark transition-colors py-1"
              >
                Procedures
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${proceduresOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </Link>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  proceduresOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-border p-4 w-[500px]">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-1">
                    Browse procedures
                  </p>
                  <div className="grid grid-cols-3 gap-0.5">
                    {procedures.map((proc) => (
                      <Link
                        key={proc.slug}
                        href={`/procedures/${proc.slug}`}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-text-body hover:bg-primary-wash hover:text-primary transition-colors"
                      >
                        <span className="text-base leading-none shrink-0">{proc.icon}</span>
                        <span className="font-medium leading-tight">{proc.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border mt-3 pt-3">
                    <Link
                      href="/procedures"
                      className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      View all procedures
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* Other nav links */}
            {otherLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-medium text-text-body hover:text-text-dark transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button size="sm" as={Link} href="/apply">
            Get Your Rate &rarr;
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
            <Dialog.Overlay className="fixed inset-0 bg-black/20 z-50" />
            <Dialog.Content className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-[22px] font-bold text-primary">
                  Cosmedi<span className="text-primary-light">Loans</span>
                </Link>
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
                <Button className="w-full mt-6" as={Link} href="/apply">
                  Get Your Rate &rarr;
                </Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </nav>
  );
}
