"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AmortisationRow } from "@/lib/calculator";

interface RepaymentTableProps {
  schedule: AmortisationRow[];
}

function fmtCell(n: number): string {
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function RepaymentTable({ schedule }: RepaymentTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (schedule.length === 0) return null;

  const displayRows = !isOpen
    ? []
    : showAll
      ? schedule
      : schedule.slice(0, 12);

  const hasMore = schedule.length > 12;

  return (
    <div className="border border-border rounded-card overflow-hidden">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 bg-surface hover:bg-primary-wash/50 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-text-dark">
          View Full Repayment Schedule
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 text-text-muted shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-wash/60 text-text-dark">
                <th className="px-4 py-3 text-left font-semibold">Month</th>
                <th className="px-4 py-3 text-right font-semibold">Payment</th>
                <th className="px-4 py-3 text-right font-semibold">Principal</th>
                <th className="px-4 py-3 text-right font-semibold">Interest</th>
                <th className="px-4 py-3 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row) => (
                <tr
                  key={row.month}
                  className={
                    row.month % 2 === 0
                      ? "bg-background"
                      : "bg-surface"
                  }
                >
                  <td className="px-4 py-2.5 text-text-dark font-medium">
                    {row.month}
                  </td>
                  <td className="px-4 py-2.5 text-right text-text-body">
                    {fmtCell(row.payment)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-text-body">
                    {fmtCell(row.principal)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-text-body">
                    {fmtCell(row.interest)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-text-dark font-medium">
                    {fmtCell(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Show all / collapse */}
          {hasMore && (
            <div className="px-6 py-3 border-t border-border bg-surface">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {showAll
                  ? "Show first 12 months"
                  : `Show all ${schedule.length} payments`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
