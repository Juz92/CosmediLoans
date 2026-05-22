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
      "dental-payment-plans-australia",
      "no-credit-check-dental-finance-australia",
    ],
    hubSlug: "dental-finance",
    primaryQuery: "dental loans Australia",
    proof: [
      "Primary procedure page targets dental loans and dental finance intent.",
      "Payment-plan guide answers comparison intent before patients choose clinic finance, BNPL, or a loan.",
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
        href: "/guides/no-credit-check-dental-finance-australia",
        label: "No-credit-check dental finance",
        description: "Handles credit-impact concerns with safer soft-check guidance.",
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
    id: "ivf-finance",
    name: "IVF finance",
    procedureSlug: "ivf-financing",
    guideSlugs: ["ivf-payment-plans-australia"],
    hubSlug: "ivf-finance",
    primaryQuery: "IVF payment plans Australia",
    proof: [
      "Primary procedure page targets IVF and fertility financing enquiries.",
      "Payment-plan guide addresses rebate timing, clinic payment schedules, and multiple-cycle uncertainty.",
      "Hub and local pages consolidate Melbourne, Sydney, and Brisbane IVF finance searches.",
    ],
    links: [
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
