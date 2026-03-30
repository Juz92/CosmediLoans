"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";

const navLinks = [
  { href: "/procedures", label: "Procedures" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:px-section-x">
        <Link href="/" className="text-[22px] font-bold text-primary">
          Cosmedi<span className="text-primary-light">Loans</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-text-body hover:text-text-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" as={Link} href="/apply">
            Get Your Rate
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-body"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-text-body hover:text-primary py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full mt-2" as={Link} href="/apply">
            Get Your Rate
          </Button>
        </div>
      )}
    </nav>
  );
}
