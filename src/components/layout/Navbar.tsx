"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";

type NavLink = { href: string; label: string };

const navLinks: NavLink[] = [
  { href: "/procedures", label: "Procedures" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:px-section-x">
        <Link href="/" className="text-[22px] font-bold text-primary">
          Cosmedi<span className="text-primary-light">Loans</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
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

        {/* Mobile drawer using Radix Dialog */}
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
                {navLinks.map((link) => (
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
