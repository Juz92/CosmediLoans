"use client";

import { useState } from "react";
import { procedures } from "@/data/procedures";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";

const categories = [
  { key: "all", label: "All Procedures" },
  { key: "dental", label: "Dental" },
  { key: "fertility", label: "Fertility" },
  { key: "cosmetic", label: "Cosmetic" },
  { key: "broad-medical", label: "Body & Medical" },
  { key: "debt-consolidation", label: "Debt Consolidation" },
  { key: "finance-education", label: "Other" },
  { key: "vet", label: "Vet & Pet" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

export function ProcedureGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filtered =
    activeCategory === "all"
      ? procedures
      : procedures.filter((p) => p.blogCategory === activeCategory);

  return (
    <>
      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat.key
                ? "bg-primary text-white shadow-sm"
                : "bg-surface text-text-body border border-border hover:border-primary-light hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProcedureCard
            key={p.slug}
            slug={p.slug}
            icon={p.icon}
            title={p.title}
            avgCostRange={p.avgCostRange}
            rateFrom={p.rateFrom}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          No procedures found in this category.
        </p>
      )}
    </>
  );
}
