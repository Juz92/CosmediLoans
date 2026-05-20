import type { Procedure } from "@/data/procedures";

type CostVerb = "Does" | "Do";

interface ProcedureCopyOverride {
  treatment: string;
  costSubject: string;
  ctaSubject: string;
  financingTitle?: string;
  costVerb?: CostVerb;
}

const copyOverrides: Record<string, ProcedureCopyOverride> = {
  "dental-loans": {
    treatment: "dental work",
    costSubject: "Dental Work",
    ctaSubject: "Your Dental Treatment",
    financingTitle: "Dental Financing",
  },
  "veneers-financing": {
    treatment: "veneers",
    costSubject: "Veneers",
    ctaSubject: "Your Veneers",
    costVerb: "Do",
  },
  "invisalign-financing": {
    treatment: "Invisalign treatment",
    costSubject: "Invisalign",
    ctaSubject: "Your Invisalign Treatment",
  },
  "ivf-financing": {
    treatment: "IVF treatment",
    costSubject: "IVF Treatment",
    ctaSubject: "Your IVF Treatment",
  },
  "fertility-treatment-loans": {
    treatment: "fertility treatment",
    costSubject: "Fertility Treatment",
    ctaSubject: "Your Fertility Treatment",
    financingTitle: "Fertility Treatment Financing",
  },
  "breast-augmentation-loans": {
    treatment: "breast augmentation",
    costSubject: "Breast Augmentation",
    ctaSubject: "Your Breast Augmentation",
    financingTitle: "Breast Augmentation Financing",
  },
  "rhinoplasty-financing": {
    treatment: "rhinoplasty",
    costSubject: "Rhinoplasty",
    ctaSubject: "Your Rhinoplasty",
  },
  "tummy-tuck-loans": {
    treatment: "a tummy tuck",
    costSubject: "a Tummy Tuck",
    ctaSubject: "Your Tummy Tuck",
    financingTitle: "Tummy Tuck Financing",
  },
  "liposuction-financing": {
    treatment: "liposuction",
    costSubject: "Liposuction",
    ctaSubject: "Your Liposuction Procedure",
  },
  "facelift-financing": {
    treatment: "a facelift",
    costSubject: "a Facelift",
    ctaSubject: "Your Facelift",
  },
  "lasik-loans": {
    treatment: "LASIK",
    costSubject: "LASIK",
    ctaSubject: "Your LASIK Procedure",
    financingTitle: "LASIK Financing",
  },
  "bariatric-surgery-loans": {
    treatment: "bariatric surgery",
    costSubject: "Bariatric Surgery",
    ctaSubject: "Your Bariatric Surgery",
    financingTitle: "Bariatric Surgery Financing",
  },
  "weight-loss-surgery-loans": {
    treatment: "weight loss surgery",
    costSubject: "Weight Loss Surgery",
    ctaSubject: "Your Weight Loss Surgery",
    financingTitle: "Weight Loss Surgery Financing",
  },
  "hair-transplant-loans": {
    treatment: "a hair transplant",
    costSubject: "a Hair Transplant",
    ctaSubject: "Your Hair Transplant",
    financingTitle: "Hair Transplant Financing",
  },
  "orthopedic-surgery-loans": {
    treatment: "orthopedic surgery",
    costSubject: "Orthopedic Surgery",
    ctaSubject: "Your Orthopedic Surgery",
    financingTitle: "Orthopedic Surgery Financing",
  },
  "dermatology-financing": {
    treatment: "dermatology treatment",
    costSubject: "Dermatology Treatment",
    ctaSubject: "Your Dermatology Treatment",
  },
  "mommy-makeover-financing": {
    treatment: "a mummy makeover",
    costSubject: "a Mummy Makeover",
    ctaSubject: "Your Mummy Makeover",
  },
  "medical-loan": {
    treatment: "medical treatment",
    costSubject: "Medical Treatment",
    ctaSubject: "Your Medical Procedure",
    financingTitle: "Medical Financing",
  },
  "debt-consolidation": {
    treatment: "debt consolidation",
    costSubject: "Debt Consolidation",
    ctaSubject: "Your Debt Consolidation",
    financingTitle: "Debt Consolidation Financing",
  },
  "vet-bill-loans": {
    treatment: "vet care",
    costSubject: "Vet Care",
    ctaSubject: "Your Vet Bill",
    financingTitle: "Vet Bill Financing",
  },
};

function titleToFinancingTitle(title: string) {
  return title.replace(/\s+Loans?$/i, " Financing");
}

function titleToTreatment(title: string) {
  return title.replace(/\s+(Loans?|Financing)$/i, "").toLowerCase();
}

export function getProcedureCopy(procedure: Pick<Procedure, "slug" | "title">) {
  const override = copyOverrides[procedure.slug];
  const financingTitle =
    override?.financingTitle ?? titleToFinancingTitle(procedure.title);
  const treatment = override?.treatment ?? titleToTreatment(procedure.title);
  const costSubject =
    override?.costSubject ??
    procedure.title.replace(/\s+(Loans?|Financing)$/i, "");
  const ctaSubject = override?.ctaSubject ?? `Your ${costSubject}`;
  const costVerb = override?.costVerb ?? "Does";

  return {
    financingTitle,
    treatment,
    ctaSubject,
    costHeading: `How Much ${costVerb} ${costSubject} Cost in Australia?`,
  };
}
