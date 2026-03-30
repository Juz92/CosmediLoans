import { CheckCircle, Minus } from "lucide-react";
import type { ComparisonRow } from "@/data/comparisons";

interface ComparisonTableProps {
  features: ComparisonRow[];
  competitorName: string;
}

export function ComparisonTable({ features, competitorName }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-6 md:mx-0">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted border-b-2 border-border w-1/3">
              Feature
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-primary border-b-2 border-primary w-1/3">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                CosmodiLoans
              </span>
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-text-body border-b-2 border-border w-1/3">
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-surface" : "bg-primary-wash/30"}
            >
              <td className="py-3.5 px-4 text-sm font-medium text-text-dark border-b border-border">
                {row.feature}
              </td>
              <td className="py-3.5 px-4 text-sm text-text-body border-b border-border">
                <span className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                  {row.us}
                </span>
              </td>
              <td className="py-3.5 px-4 text-sm text-text-body border-b border-border">
                <span className="flex items-start gap-2">
                  <Minus className="h-4 w-4 text-text-muted mt-0.5 shrink-0" aria-hidden="true" />
                  {row.them}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
