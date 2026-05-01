import type { CostRow } from "@/data/procedures";

interface ProcedureCostTableProps {
  costHeading: string;
  costTable: CostRow[];
}

export function ProcedureCostTable({ costHeading, costTable }: ProcedureCostTableProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <h2 className="text-section-h2 text-text-dark mb-3">
          {costHeading}
        </h2>
        <p className="text-body text-text-body mb-8 max-w-2xl">
          Costs vary depending on complexity, location, and provider. Here are typical
          price ranges across Australia.
        </p>
        <div className="overflow-x-auto rounded-card border border-border">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary-wash">
                <th className="px-6 py-4 text-sm font-semibold text-text-dark">
                  Procedure
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-text-dark text-right">
                  Typical Cost (AUD)
                </th>
              </tr>
            </thead>
            <tbody>
              {costTable.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-border ${
                    i % 2 === 1 ? "bg-background" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-text-body">
                    {row.subProcedure}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-dark text-right">
                    {row.costRange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-muted">
          * Prices are indicative and based on average Australian provider data. Actual
          costs may vary. Last updated March 2026.
        </p>
      </div>
    </section>
  );
}
