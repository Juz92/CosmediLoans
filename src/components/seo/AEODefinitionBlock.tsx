import type { Procedure } from "@/data/procedures";
import { getProcedureCopy } from "@/lib/procedure-copy";
import { QuickAnswer } from "@/components/seo/QuickAnswer";

interface AEODefinitionBlockProps {
  procedure: Procedure;
}

/**
 * Self-contained answer block for AI/search extraction.
 * Pattern: direct answer, scope, outcome.
 */
export function AEODefinitionBlock({ procedure }: AEODefinitionBlockProps) {
  const copy = getProcedureCopy(procedure);
  const opener = `${copy.financingTitle} in Australia is a broker-matched personal loan used to cover the cost of ${copy.treatment} and related medical expenses.`;

  const scope = `Loan amounts range from $2,000 to $100,000 over terms of up to ${procedure.maxTerm}, with rates from ${procedure.rateFrom} p.a. depending on credit profile. Typical costs for ${copy.treatment} in Australia sit between ${procedure.avgCostRange}.`;

  const outcome = `CosmediLoans compares offers from 20+ licensed Australian lenders through a single soft-credit inquiry that does not affect your credit score. Pre-approval decisions typically return within hours, with funds released in 1-3 business days and early repayment permitted without penalty on most products in the network.`;

  return (
    <QuickAnswer
      id={`what-is-${procedure.slug}`}
      title={`What is ${copy.financingTitle} in Australia?`}
      facts={[
        { label: "Loan size", value: "$2k to $100k" },
        { label: "Rates from", value: `${procedure.rateFrom} p.a.` },
        { label: "Term", value: `Up to ${procedure.maxTerm}` },
      ]}
    >
      <p>
        {opener} {scope} {outcome}
      </p>
    </QuickAnswer>
  );
}
