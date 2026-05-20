import { LEGAL } from "@/lib/site";

export const REVIEWER = {
  name: "CosmediLoans finance team",
  role: "Broker review team",
  credentials:
    "Australian medical finance, lender matching and responsible credit review",
} as const;

export const TRUST_DISCLOSURES = [
  "CosmediLoans is not a lender and does not provide personal financial advice.",
  "Loan approval, rates, fees, limits and terms depend on lender assessment.",
  "Medical and procedure information is general only and does not replace advice from a qualified health professional.",
  "Where finance examples are shown, repayments are indicative and may exclude lender fees unless stated.",
] as const;

export const FINANCE_ASSUMPTIONS = [
  "Example rates are used for education and are not an approval or quote.",
  "Treatment costs should be confirmed with a written provider quote before applying.",
  "A soft initial assessment can help compare likely options before a formal lender application.",
  "Borrowers should compare total cost over the full term, not only the weekly or monthly repayment.",
] as const;

export const EDITORIAL_PRINCIPLES = [
  {
    title: "Useful before promotional",
    text: "Pages are written to help patients compare realistic payment paths before choosing a lender, clinic plan or short-term instalment option.",
  },
  {
    title: "Finance claims are qualified",
    text: "Rate, repayment and approval statements are framed as indicative unless they are tied to a confirmed lender offer.",
  },
  {
    title: "Medical decisions stay medical",
    text: "Content can help plan finance, but treatment suitability, timing and risk must be discussed with qualified providers.",
  },
  {
    title: "Sources and dates are visible",
    text: "Guides include review dates, source links and plain-language assumptions so readers can judge the context of the information.",
  },
] as const;

export const TRUST_CONTACT = {
  email: LEGAL.email,
  phone: LEGAL.phone,
  abn: LEGAL.abn,
} as const;
