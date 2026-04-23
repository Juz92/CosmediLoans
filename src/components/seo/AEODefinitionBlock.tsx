import type { Procedure } from "@/data/procedures";

interface AEODefinitionBlockProps {
  procedure: Procedure;
}

/**
 * 130-170 word self-contained answer block rendered ABOVE the hero.
 * Pattern targets AI-search passage extraction (AI Overviews, ChatGPT,
 * Perplexity) — direct answer → scope → outcome, all quotable standalone.
 */
export function AEODefinitionBlock({ procedure }: AEODefinitionBlockProps) {
  const opener = `${procedure.title} financing in Australia is a broker-matched personal loan used to cover the cost of ${procedure.title.toLowerCase()} and related medical expenses.`;

  const scope = `Loan amounts range from $2,000 to $100,000 over terms of up to ${procedure.maxTerm}, with rates from ${procedure.rateFrom} p.a. depending on credit profile. Typical ${procedure.title.toLowerCase()} costs in Australia sit between ${procedure.avgCostRange}.`;

  const outcome = `CosmediLoans compares offers from 20+ licensed Australian lenders through a single soft-credit inquiry that does not affect your credit score. Pre-approval decisions typically return within hours, with funds released in 1–3 business days and early repayment permitted without penalty on most products in the network.`;

  return (
    <section className="bg-surface border-b border-border">
      <div className="container-narrow py-6 md:py-8">
        <div className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
            What is {procedure.title.toLowerCase()} financing in Australia?
          </h2>
          <p className="text-body text-text-body leading-relaxed">
            {opener} {scope} {outcome}
          </p>
        </div>
      </div>
    </section>
  );
}
