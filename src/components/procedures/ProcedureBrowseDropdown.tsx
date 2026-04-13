"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { procedures } from "@/data/procedures";

export function ProcedureBrowseDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Browse all procedures
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 bg-white rounded-xl shadow-card border border-border z-50 p-3">
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-border rotate-45" />

          <div className="grid grid-cols-2 gap-0.5 max-h-72 overflow-y-auto">
            {procedures.map((proc) => (
              <Link
                key={proc.slug}
                href={`/procedures/${proc.slug}`}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-text-body hover:bg-primary-wash hover:text-primary transition-colors"
              >
                <span className="text-base leading-none shrink-0">{proc.icon}</span>
                <span className="truncate font-medium">{proc.title}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-border mt-2 pt-2">
            <Link
              href="/procedures"
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              View all procedures
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
