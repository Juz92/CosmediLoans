export interface PriorityClusterLink {
  href: string;
  label: string;
  description: string;
}

export interface PrioritySeoCluster {
  id: string;
  name: string;
  procedureSlug: string;
  guideSlugs: string[];
  hubSlug: string;
  primaryQuery: string;
  proof: string[];
  links: PriorityClusterLink[];
}

export const prioritySeoClusters: PrioritySeoCluster[] = [
  {
    id: "dental-finance",
    name: "Dental finance",
    procedureSlug: "dental-loans",
    guideSlugs: [
      "dental-implants-cost-australia",
      "all-on-4-dental-implants-cost-australia",
      "dental-payment-plans-australia",
      "all-on-4-dental-implants-payment-plans-australia",
      "dental-surgery-loans-australia",
      "no-credit-check-dental-finance-australia",
    ],
    hubSlug: "dental-finance",
    primaryQuery: "dental loans Australia",
    proof: [
      "Primary procedure page targets dental loans and dental finance intent.",
      "Payment-plan guide answers comparison intent before patients choose clinic finance, BNPL, or a loan.",
      "Dental implant and All-on-4 cost pages capture earlier quote research without targeting the same loan keywords.",
      "All-on-4 and dental surgery guides target high-ticket sub-intents already visible in Semrush and Search Console.",
      "No-credit-check guide captures risk-aware searches without making unsafe approval claims.",
    ],
    links: [
      {
        href: "/procedures/dental-loans",
        label: "Dental loans Australia",
        description: "Canonical commercial page for dental loan enquiries.",
      },
      {
        href: "/guides/dental-payment-plans-australia",
        label: "Dental payment plans guide",
        description: "Explains clinic plans, BNPL, credit cards, and broker-matched dental loans.",
      },
      {
        href: "/guides/dental-implants-cost-australia",
        label: "Dental implants cost",
        description: "Cost-first guide for implant quote research before dental finance comparison.",
      },
      {
        href: "/guides/all-on-4-dental-implants-cost-australia",
        label: "All-on-4 implant cost",
        description: "Full-arch implant cost guide that sends finance intent to the payment-plan page.",
      },
      {
        href: "/guides/no-credit-check-dental-finance-australia",
        label: "No-credit-check dental finance",
        description: "Handles credit-impact concerns with safer soft-check guidance.",
      },
      {
        href: "/guides/all-on-4-dental-implants-payment-plans-australia",
        label: "All-on-4 payment plans",
        description: "Targets full-arch implant finance and staged quote searches.",
      },
      {
        href: "/guides/dental-surgery-loans-australia",
        label: "Dental surgery loans",
        description: "Targets urgent dental surgery, root canal, extraction, and oral surgery finance searches.",
      },
      {
        href: "/guides/topics/dental-finance",
        label: "Dental finance hub",
        description: "Connects dental guides, procedure pages, comparisons, and local pages.",
      },
      {
        href: "/compare/dental-loans-vs-buy-now-pay-later",
        label: "Dental loans vs BNPL",
        description: "Supports alternative-comparison searches close to lead intent.",
      },
      {
        href: "/locations/sydney/dental-loans",
        label: "Dental loans in Sydney",
        description: "Priority local page with Search Console dental impressions.",
      },
    ],
  },
  {
    id: "cosmetic-surgery-finance",
    name: "Cosmetic surgery finance",
    procedureSlug: "cosmetic-surgery-loans",
    guideSlugs: [
      "breast-augmentation-cost-australia",
      "breast-augmentation-payment-plans-australia",
      "fat-transfer-breast-augmentation-cost-australia",
      "facelift-cost-australia",
      "cosmetic-surgery-loans-australia",
      "cosmetic-surgery-payment-plans-australia",
      "medical-loans-for-surgery-australia",
    ],
    hubSlug: "cosmetic-surgery-finance",
    primaryQuery: "cosmetic surgery loans Australia",
    proof: [
      "MediPay, Wisr and TLC rank with explicit cosmetic surgery loan pages.",
      "The cosmetic surgery loans procedure page is the canonical commercial target for the cluster's loan queries.",
      "Breast augmentation cost and payment-plan pages catch procedure-specific searches before the broader finance page.",
      "Facelift cost guide captures cost-research intent that supports the indexed Sunshine Coast facelift financing page.",
      "Cosmetic surgery payment-plan searches need a compliant comparison page that separates finance from medical suitability.",
      "Broader surgery-loan intent links cosmetic procedure searches to medical-loan comparison intent.",
    ],
    links: [
      {
        href: "/procedures/cosmetic-surgery-loans",
        label: "Cosmetic & plastic surgery loans",
        description: "Canonical commercial page for cosmetic and plastic surgery loan enquiries.",
      },
      {
        href: "/guides/breast-augmentation-cost-australia",
        label: "Breast augmentation cost",
        description: "Cost and quote-readiness page for patients before finance comparison.",
      },
      {
        href: "/guides/breast-augmentation-payment-plans-australia",
        label: "Breast augmentation payment plans",
        description: "Narrow payment-plan comparison that links to the procedure loan page for application intent.",
      },
      {
        href: "/guides/fat-transfer-breast-augmentation-cost-australia",
        label: "Fat transfer breast augmentation cost",
        description: "Niche cost page linking breast augmentation and liposuction finance intent.",
      },
      {
        href: "/guides/facelift-cost-australia",
        label: "Facelift cost Australia",
        description:
          "Cost-first facelift, mini facelift and neck lift guide for quote research before finance.",
      },
      {
        href: "/procedures/facelift-financing",
        label: "Facelift financing",
        description: "Procedure page for full facelift, mini lift and neck lift finance enquiries.",
      },
      {
        href: "/locations/sunshine-coast/facelift-financing",
        label: "Facelift finance on the Sunshine Coast",
        description: "Indexed local page supported by the facelift cost guide.",
      },
      {
        href: "/guides/cosmetic-surgery-loans-australia",
        label: "How to choose cosmetic surgery financing",
        description:
          "Decision-support guide comparing loans, clinic plans and credit cards before borrowing.",
      },
      {
        href: "/guides/cosmetic-surgery-payment-plans-australia",
        label: "Cosmetic surgery payment plans",
        description: "Compares clinic schedules, BNPL, credit cards and broker-matched loans.",
      },
      {
        href: "/guides/medical-loans-for-surgery-australia",
        label: "Medical loans for surgery",
        description: "Broader surgery-loan guide for hospital gaps, anaesthetist fees and payment timing.",
      },
      {
        href: "/procedures/breast-augmentation-loans",
        label: "Breast augmentation finance",
        description: "Procedure page for a high-value cosmetic surgery loan category.",
      },
      {
        href: "/guides/topics/cosmetic-surgery-finance",
        label: "Cosmetic surgery finance hub",
        description: "Connects surgery loan, payment-plan, procedure and local pages.",
      },
      {
        href: "/compare/cosmetic-surgery-finance-vs-credit-card",
        label: "Surgery finance vs credit card",
        description: "Supports comparison intent close to the lead decision.",
      },
    ],
  },
  {
    id: "vet-bill-finance",
    name: "Vet bill finance",
    procedureSlug: "vet-bill-loans",
    guideSlugs: [
      "vetpay-alternatives-australia",
      "vet-bill-loans-australia",
      "vet-bill-payment-plans-australia",
    ],
    hubSlug: "vet-bill-finance",
    primaryQuery: "vet bill loans Australia",
    proof: [
      "Semrush shows direct competitors ranking with dedicated vet bill loan pages.",
      "VetPay alternatives captures competitor-comparison traffic without replacing the main vet loan page.",
      "Vet finance searches are urgent, so content must answer invoice timing and settlement speed clearly.",
      "The hub connects direct loan intent with clinic payment plans and insurance reimbursement timing.",
    ],
    links: [
      {
        href: "/guides/vetpay-alternatives-australia",
        label: "VetPay alternatives",
        description: "Competitor-alternative page for pet owners comparing clinic plans, VetPay, insurance and loans.",
      },
      {
        href: "/guides/vet-bill-loans-australia",
        label: "Vet bill loans Australia",
        description: "Primary new guide for direct veterinary loan searches.",
      },
      {
        href: "/guides/vet-bill-payment-plans-australia",
        label: "Vet bill payment plans",
        description: "Explains clinic plans, dedicated vet finance, insurance and personal loans.",
      },
      {
        href: "/procedures/vet-bill-loans",
        label: "Vet loans & payment plans",
        description: "Canonical commercial page for vet loan and vet payment plan enquiries.",
      },
      {
        href: "/compare/cosmediloans-vs-vetpay",
        label: "CosmediLoans vs VetPay",
        description: "Side-by-side comparison of a broker-matched vet loan and the VetPay payment plan.",
      },
      {
        href: "/guides/topics/vet-bill-finance",
        label: "Vet bill finance hub",
        description: "Connects vet loan, payment-plan, insurance and bad-credit guidance.",
      },
      {
        href: "/locations/sunshine-coast/vet-bill-loans",
        label: "Vet bill loans on the Sunshine Coast",
        description: "Local page already receiving Search Console impressions.",
      },
      {
        href: "/guides/medical-loans-bad-credit-australia",
        label: "Bad credit medical loans",
        description: "Supports risk-aware borrowers without guaranteed-approval claims.",
      },
    ],
  },
  {
    id: "ivf-finance",
    name: "IVF finance",
    procedureSlug: "ivf-financing",
    guideSlugs: ["ivf-cost-australia", "ivf-payment-plans-australia"],
    hubSlug: "ivf-finance",
    primaryQuery: "IVF cost Australia",
    proof: [
      "Primary procedure page targets IVF and fertility financing enquiries.",
      "IVF cost page captures rebate and out-of-pocket planning before payment-plan intent.",
      "Payment-plan guide addresses rebate timing, clinic payment schedules, and multiple-cycle uncertainty.",
      "Hub and local pages consolidate Melbourne, Sydney, and Brisbane IVF finance searches.",
    ],
    links: [
      {
        href: "/guides/ivf-cost-australia",
        label: "IVF cost Australia",
        description: "Cost, Medicare rebate and out-of-pocket gap guide for fertility patients.",
      },
      {
        href: "/procedures/ivf-financing",
        label: "IVF financing Australia",
        description: "Canonical commercial page for fertility loan enquiries.",
      },
      {
        href: "/guides/ivf-payment-plans-australia",
        label: "IVF payment plans guide",
        description: "Explains fertility loans, clinic plans, Medicare timing, and Safety Net cash flow.",
      },
      {
        href: "/guides/topics/ivf-finance",
        label: "IVF finance hub",
        description: "Connects IVF guide, procedure, comparison, and local pages.",
      },
      {
        href: "/compare/ivf-payment-plan-vs-personal-loan",
        label: "IVF payment plan vs loan",
        description: "Supports comparison intent before patients commit to a payment path.",
      },
      {
        href: "/locations/melbourne/ivf-financing",
        label: "IVF finance in Melbourne",
        description: "Priority local page from current Search Console IVF impressions.",
      },
      {
        href: "/locations/sydney/ivf-financing",
        label: "IVF finance in Sydney",
        description: "Priority city page for fertility quote and lender comparison searches.",
      },
    ],
  },
];

export function getPriorityClusterForProcedure(
  procedureSlug: string
): PrioritySeoCluster | undefined {
  return prioritySeoClusters.find(
    (cluster) => cluster.procedureSlug === procedureSlug
  );
}

export function getPriorityClusterForGuide(
  guideSlug: string
): PrioritySeoCluster | undefined {
  return prioritySeoClusters.find((cluster) =>
    cluster.guideSlugs.includes(guideSlug)
  );
}

export function getPriorityClusterForHub(
  hubSlug: string
): PrioritySeoCluster | undefined {
  return prioritySeoClusters.find((cluster) => cluster.hubSlug === hubSlug);
}
