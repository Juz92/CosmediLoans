export interface HubLocalLink {
  href: string;
  label: string;
  description: string;
}

export interface GuideHubFAQ {
  question: string;
  answer: string;
}

export interface GuideHub {
  slug: string;
  category: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  intro: string;
  proofPoints: string[];
  guideSlugs: string[];
  procedureSlugs: string[];
  comparisonSlugs: string[];
  localLinks: HubLocalLink[];
  faqs: GuideHubFAQ[];
  defaultProcedure: string;
}

export const guideHubs: GuideHub[] = [
  {
    slug: "dental-finance",
    category: "Dental",
    title: "Dental Finance Hub",
    h1: "Dental Finance and Payment Plan Options in Australia",
    metaTitle: "Dental Finance Australia | Loans, Payment Plans and BNPL",
    metaDescription:
      "Compare dental implant costs, dental loans, payment plans, BNPL, bad credit options and local dental finance pages before accepting a quote.",
    primaryKeyword: "dental finance Australia",
    intro:
      "Use this hub to compare dental loans, clinic plans, no-credit-check claims, BNPL and local dental finance pages before choosing how to pay for treatment.",
    proofPoints: [
      "Built for implants, All-on-4, crowns, veneers and urgent dental work",
      "Separates cost research from loan and payment-plan intent",
      "Separates payment plan marketing from total loan cost",
    ],
    guideSlugs: [
      "dental-implants-cost-australia",
      "all-on-4-dental-implants-cost-australia",
      "dental-payment-plans-australia",
      "all-on-4-dental-implants-payment-plans-australia",
      "dental-surgery-loans-australia",
      "no-credit-check-dental-finance-australia",
      "medical-loans-bad-credit-australia",
    ],
    procedureSlugs: [
      "dental-loans",
      "veneers-financing",
      "invisalign-financing",
    ],
    comparisonSlugs: [
      "dental-loans-vs-buy-now-pay-later",
      "medical-loans-vs-payment-plans",
      "medical-loan-vs-buy-now-pay-later",
    ],
    localLinks: [
      {
        href: "/locations/sydney/dental-loans",
        label: "Dental loans in Sydney",
        description: "Local quote planning and lender comparison for Sydney dental treatment.",
      },
      {
        href: "/locations/brisbane/dental-loans",
        label: "Dental loans in Brisbane",
        description: "Compare Brisbane dental quotes, deposits and repayment options.",
      },
      {
        href: "/locations/melbourne/dental-loans",
        label: "Dental loans in Melbourne",
        description: "Dental finance planning for Melbourne patients comparing providers.",
      },
    ],
    faqs: [
      {
        question: "What is the best way to finance dental work?",
        answer:
          "For small balances, a clinic plan or BNPL option can work if fees are low and repayment is fast. For implants, veneers, crowns or staged treatment, a broker-matched dental loan usually gives more lender choice and clearer repayment terms.",
      },
      {
        question: "Should I use a dental payment plan or dental loan?",
        answer:
          "Compare the total cost, provider choice, repayment term and fees. A clinic plan may be convenient, while a dental loan can be more flexible for larger treatment quotes.",
      },
    ],
    defaultProcedure: "dental",
  },
  {
    slug: "ivf-finance",
    category: "IVF",
    title: "IVF Finance Hub",
    h1: "IVF Finance, Payment Plans and Fertility Loan Options",
    metaTitle: "IVF Finance Australia | Payment Plans vs Personal Loans",
    metaDescription:
      "Compare IVF costs, Medicare rebate timing, fertility loans, clinic payment plans and personal loan options for treatment in Australia.",
    primaryKeyword: "IVF finance Australia",
    intro:
      "IVF finance needs to handle uncertain timing, rebates, medication and the possibility of more than one treatment stage. This hub connects the main fertility finance guides and comparison pages.",
    proofPoints: [
      "Starts with cycle cost, rebate timing and out-of-pocket gap",
      "Built around cycle timing, medication and rebate cash flow",
      "Compares clinic payment plans with fixed-term personal loans",
    ],
    guideSlugs: [
      "ivf-cost-australia",
      "ivf-payment-plans-australia",
      "medical-loans-bad-credit-australia",
      "cosmetic-surgery-payment-plans-australia",
    ],
    procedureSlugs: [
      "ivf-financing",
      "fertility-treatment-loans",
      "medical-loan",
    ],
    comparisonSlugs: [
      "ivf-payment-plan-vs-personal-loan",
      "medical-loans-vs-payment-plans",
      "medical-loan-vs-credit-card",
    ],
    localLinks: [
      {
        href: "/locations/melbourne/ivf-financing",
        label: "IVF finance in Melbourne",
        description: "Local IVF cost, payment timing and lender comparison guidance.",
      },
      {
        href: "/locations/sydney/ivf-financing",
        label: "IVF finance in Sydney",
        description: "Fertility quote planning and broker-matched finance for Sydney patients.",
      },
      {
        href: "/locations/brisbane/ivf-financing",
        label: "IVF finance in Brisbane",
        description: "Compare Brisbane clinic payment timing with lender options.",
      },
    ],
    faqs: [
      {
        question: "Can IVF be paid off over time?",
        answer:
          "Yes. Options can include fertility loans, clinic payment schedules, credit cards and limited early super pathways where eligibility rules are met.",
      },
      {
        question: "Why compare IVF finance before treatment starts?",
        answer:
          "Cycle fees, medication, testing and rebate timing can shift cash flow quickly. Comparing finance early helps match funds to clinic payment dates.",
      },
    ],
    defaultProcedure: "ivf",
  },
  {
    slug: "cosmetic-surgery-finance",
    category: "Cosmetic surgery",
    title: "Cosmetic Surgery Finance Hub",
    h1: "Cosmetic Surgery Finance and Payment Plan Options",
    metaTitle: "Cosmetic Surgery Finance Australia | Loans and Payment Plans",
    metaDescription:
      "Compare cosmetic surgery costs, breast augmentation payment plans, loans, credit cards, BNPL and location pages before choosing finance.",
    primaryKeyword: "cosmetic surgery finance Australia",
    intro:
      "Cosmetic surgery finance should be matched to the full written quote, including surgeon, hospital, anaesthetist, implants, garments and recovery costs.",
    proofPoints: [
      "Built for breast augmentation, facelift, rhinoplasty, tummy tuck and liposuction",
      "Captures cost searches before loan and payment-plan searches",
      "Separates surgery scope from finance cost",
    ],
    guideSlugs: [
      "breast-augmentation-cost-australia",
      "breast-augmentation-payment-plans-australia",
      "fat-transfer-breast-augmentation-cost-australia",
      "facelift-cost-australia",
      "cosmetic-surgery-loans-australia",
      "cosmetic-surgery-payment-plans-australia",
      "medical-loans-for-surgery-australia",
      "medical-loans-bad-credit-australia",
    ],
    procedureSlugs: [
      "breast-augmentation-loans",
      "facelift-financing",
      "rhinoplasty-financing",
    ],
    comparisonSlugs: [
      "cosmetic-surgery-finance-vs-credit-card",
      "medical-loans-vs-payment-plans",
      "medical-loan-vs-credit-card",
    ],
    localLinks: [
      {
        href: "/locations/sunshine-coast/facelift-financing",
        label: "Facelift finance on the Sunshine Coast",
        description: "Targeted facelift and neck lift cost planning for Sunshine Coast patients.",
      },
      {
        href: "/locations/perth/breast-augmentation-loans",
        label: "Breast augmentation finance in Perth",
        description: "Local quote planning for Perth cosmetic surgery patients.",
      },
      {
        href: "/locations/gold-coast/facelift-financing",
        label: "Facelift finance on the Gold Coast",
        description: "Compare coastal provider quotes, deposits and repayment options.",
      },
    ],
    faqs: [
      {
        question: "Is a cosmetic surgery loan better than a credit card?",
        answer:
          "For larger balances, a fixed-term cosmetic surgery loan is usually more predictable than revolving credit. Credit cards can become expensive if the balance is not cleared quickly.",
      },
      {
        question: "What should be in a cosmetic surgery quote before finance?",
        answer:
          "Ask for surgeon, hospital, anaesthetist, implant or garment costs, deposit dates, final balance dates and cancellation rules.",
      },
    ],
    defaultProcedure: "breast-augmentation",
  },
  {
    slug: "vet-bill-finance",
    category: "Vet bills",
    title: "Vet Bill Finance Hub",
    h1: "Vet Bill Loans and Payment Plan Options in Australia",
    metaTitle: "Vet Bill Finance Australia | Loans and Payment Plans",
    metaDescription:
      "Compare vet bill loans, VetPay alternatives, emergency vet payment plans, pet insurance timing and broker-matched finance options in Australia.",
    primaryKeyword: "vet bill loans Australia",
    intro:
      "Vet bill finance is often urgent. This hub connects direct vet loan searches with payment-plan, insurance and bad-credit guidance so pet owners can compare options before choosing a lender or clinic plan.",
    proofPoints: [
      "Built for emergency invoices and specialist referral costs",
      "Covers VetPay alternatives without competing with the main vet loan page",
      "Separates clinic payment timing from insurance reimbursement timing",
    ],
    guideSlugs: [
      "vetpay-alternatives-australia",
      "vet-bill-loans-australia",
      "vet-bill-payment-plans-australia",
      "medical-loans-bad-credit-australia",
    ],
    procedureSlugs: ["vet-bill-loans", "medical-loan", "debt-consolidation"],
    comparisonSlugs: [
      "medical-loans-vs-payment-plans",
      "medical-loan-vs-credit-card",
      "bad-credit-medical-loans-alternatives",
    ],
    localLinks: [
      {
        href: "/locations/sunshine-coast/vet-bill-loans",
        label: "Vet bill finance on the Sunshine Coast",
        description: "Local vet bill page already receiving Search Console impressions.",
      },
      {
        href: "/procedures/vet-bill-loans",
        label: "Vet bill loans procedure page",
        description: "Canonical commercial page for veterinary bill finance enquiries.",
      },
      {
        href: "/guides/vet-bill-payment-plans-australia",
        label: "Vet bill payment plans",
        description: "Compare clinic plans, dedicated vet finance, insurance and loans.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a vet bill loan and a vet payment plan?",
        answer:
          "A vet bill loan is usually arranged through a lender and repaid over a fixed term. A vet payment plan is usually offered by a clinic or clinic finance partner and may only work at that provider.",
      },
      {
        question: "Why compare vet finance before applying?",
        answer:
          "Emergency invoices can create pressure to accept the fastest option. Comparing total repayment, settlement timing and credit check type can reduce wasted applications.",
      },
    ],
    defaultProcedure: "other",
  },
  {
    slug: "bad-credit-medical-loans",
    category: "Bad credit",
    title: "Bad Credit Medical Loans Hub",
    h1: "Bad Credit Medical Loans and Safer Alternatives",
    metaTitle: "Bad Credit Medical Loans Australia | Realistic Options",
    metaDescription:
      "Compare realistic medical loan options for bad credit, soft checks, dental finance alternatives and higher-cost lender warnings.",
    primaryKeyword: "bad credit medical loans Australia",
    intro:
      "This hub is for borrowers who need medical, dental, fertility, cosmetic or vet bill finance but are worried about credit history or wasted applications.",
    proofPoints: [
      "Explains soft checks and hard credit applications",
      "Compares specialist broker matching with high-rate direct lenders",
      "Links bad credit medical and dental finance guides",
    ],
    guideSlugs: [
      "medical-loans-bad-credit-australia",
      "no-credit-check-dental-finance-australia",
      "dental-payment-plans-australia",
    ],
    procedureSlugs: ["medical-loan", "dental-loans", "vet-bill-loans"],
    comparisonSlugs: [
      "bad-credit-medical-loans-alternatives",
      "cosmediloans-vs-jacaranda-finance",
      "cosmediloans-vs-fair-go-finance",
    ],
    localLinks: [
      {
        href: "/procedures/medical-loan",
        label: "General medical loans",
        description: "Start with the broad medical loan page before comparing specialist options.",
      },
      {
        href: "/procedures/debt-consolidation",
        label: "Debt consolidation loans",
        description: "Consider repayment cleanup where existing debts are blocking treatment finance.",
      },
      {
        href: "/guides/no-credit-check-dental-finance-australia",
        label: "No credit check dental finance",
        description: "Understand what no-credit-check claims usually mean in practice.",
      },
    ],
    faqs: [
      {
        question: "Can I get medical finance with bad credit?",
        answer:
          "It may be possible, but approval is not guaranteed. Lenders assess income, expenses, credit history, existing debts and the requested amount.",
      },
      {
        question: "What is safer than applying everywhere?",
        answer:
          "A soft initial assessment can help identify realistic lender options before a formal application creates a credit enquiry.",
      },
    ],
    defaultProcedure: "other",
  },
  {
    slug: "location-treatment-costs",
    category: "Locations",
    title: "Location Treatment Cost Hub",
    h1: "Location-Based Treatment Cost and Finance Pages",
    metaTitle: "Treatment Costs by Location | Medical Finance Australia",
    metaDescription:
      "Find local treatment finance pages for dental, IVF, cosmetic surgery and other procedure costs across Australian cities.",
    primaryKeyword: "treatment costs by location Australia",
    intro:
      "Local search demand often starts with treatment cost in a city or region. This hub connects priority location pages with the broader procedure and finance guides.",
    proofPoints: [
      "Built for local quote and payment timing searches",
      "Connects city pages with procedure hubs and guides",
      "Highlights pages already receiving Search Console impressions",
    ],
    guideSlugs: [
      "dental-payment-plans-australia",
      "ivf-payment-plans-australia",
      "cosmetic-surgery-payment-plans-australia",
    ],
    procedureSlugs: ["dental-loans", "ivf-financing", "facelift-financing"],
    comparisonSlugs: [
      "medical-loans-vs-payment-plans",
      "medical-loan-vs-credit-card",
      "medical-loan-vs-buy-now-pay-later",
    ],
    localLinks: [
      {
        href: "/locations/sunshine-coast/facelift-financing",
        label: "Facelift and neck lift costs on the Sunshine Coast",
        description: "The strongest current local Search Console opportunity.",
      },
      {
        href: "/locations/melbourne/ivf-financing",
        label: "IVF costs and finance in Melbourne",
        description: "High-impression IVF location page with room to improve ranking.",
      },
      {
        href: "/locations/sydney/dental-loans",
        label: "Dental loans in Sydney",
        description: "Dental finance page linked to the wider dental guide cluster.",
      },
    ],
    faqs: [
      {
        question: "Why do treatment finance pages need local context?",
        answer:
          "Patients often compare providers, deposits and appointment timing by city. Local pages can answer quote planning questions that a national procedure page cannot.",
      },
      {
        question: "Should every city and procedure be indexed?",
        answer:
          "Only if the page has useful local context, clear internal links and a reason to exist beyond swapping city names.",
      },
    ],
    defaultProcedure: "other",
  },
];

export function getAllGuideHubSlugs(): string[] {
  return guideHubs.map((hub) => hub.slug);
}

export function getGuideHubBySlug(slug: string): GuideHub | undefined {
  return guideHubs.find((hub) => hub.slug === slug);
}
