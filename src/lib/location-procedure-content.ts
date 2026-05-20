import type { Location } from "@/data/locations";
import type { FAQ, Procedure } from "@/data/procedures";
import { getProcedureCopy } from "@/lib/procedure-copy";

interface ProcedureLocalProfile {
  quoteFocus: string[];
  paymentTiming: string;
  providerQuestion: string;
  documentFocus: string[];
  comparisonAngle: string;
  borrowerCaution: string;
  serviceType: string;
}

interface LocalMarketProfile {
  label: string;
  providerPattern: string;
  travelPattern: string;
  financeAngle: string;
}

export interface LocalPlanningCard {
  title: string;
  value: string;
  text: string;
}

export interface LocalGuideItem {
  title: string;
  text: string;
}

export interface LocalProcedureContent {
  metaDescription: string;
  heroDescription: string;
  localNarrative: string[];
  localGuideItems: LocalGuideItem[];
  quotePlanningCards: LocalPlanningCard[];
  providerComparisonItems: LocalGuideItem[];
  applicationChecklist: string[];
  paymentMilestones: string[];
  exampleScenario: {
    title: string;
    text: string;
  };
  localFaqs: FAQ[];
  schemaServiceType: string;
}

const procedureProfiles: Record<string, ProcedureLocalProfile> = {
  "dental-loans": {
    quoteFocus: ["itemised treatment stages", "implant, crown, veneer or bridge inclusions", "follow-up appointment fees"],
    paymentTiming: "Dental providers may ask for payment before lab work, surgery dates or staged appointments begin.",
    providerQuestion: "Ask whether imaging, temporary teeth, lab fees and follow-up appointments are included in the written dental quote.",
    documentFocus: ["itemised dental treatment plan", "provider quote with deposits separated", "private health extras estimate if available"],
    comparisonAngle: "Dental finance works best when the loan amount is matched to the complete treatment plan, not only the first appointment.",
    borrowerCaution: "Avoid comparing a single implant quote with an all-on-4 or full restoration quote unless the inclusions are identical.",
    serviceType: "Dental finance broker matching",
  },
  "veneers-financing": {
    quoteFocus: ["number of teeth", "porcelain or composite material choice", "trial smile, lab and review costs"],
    paymentTiming: "Veneer quotes can include deposits before preparation, manufacturing and final fitting appointments.",
    providerQuestion: "Confirm how many veneers are included and whether whitening, gum contouring or temporary veneers are charged separately.",
    documentFocus: ["smile design quote", "per-tooth material breakdown", "deposit and fitting schedule"],
    comparisonAngle: "Veneer finance should reflect the chosen material and number of teeth because the total can move quickly between partial and full smile plans.",
    borrowerCaution: "Do not borrow against a full set if the provider has only quoted a smaller cosmetic touch-up.",
    serviceType: "Veneers finance broker matching",
  },
  "invisalign-financing": {
    quoteFocus: ["Invisalign Lite or comprehensive treatment", "retainer costs", "review and refinement appointments"],
    paymentTiming: "Orthodontic providers often separate the initial deposit from aligner issue dates and refinement appointments.",
    providerQuestion: "Ask whether refinements, retainers, scans and any emergency aligner replacements are included.",
    documentFocus: ["orthodontic treatment plan", "aligner package type", "retainer and refinement quote"],
    comparisonAngle: "Invisalign finance is usually easier to plan when repayments are aligned with the expected treatment length.",
    borrowerCaution: "Check whether the quote is for Invisalign branded aligners or another clear aligner system before comparing prices.",
    serviceType: "Invisalign finance broker matching",
  },
  "ivf-financing": {
    quoteFocus: ["cycle fees", "medication estimates", "embryology, ICSI or transfer costs"],
    paymentTiming: "Fertility clinics may require payment before cycle start, medication collection or embryo transfer.",
    providerQuestion: "Ask the clinic to separate upfront cycle costs, medication estimates, Medicare rebates and likely out-of-pocket amounts.",
    documentFocus: ["fertility clinic quote", "medication estimate", "Medicare and private cover estimates"],
    comparisonAngle: "IVF finance should leave room for timing uncertainty because cycle dates and additional treatment steps can change.",
    borrowerCaution: "Avoid treating a single-cycle estimate as the full budget if your specialist has discussed multiple attempts.",
    serviceType: "IVF finance broker matching",
  },
  "fertility-treatment-loans": {
    quoteFocus: ["consultations and testing", "cycle or procedure fees", "medication and storage costs"],
    paymentTiming: "Fertility treatment payments can be staged around testing, medication, procedures and storage renewals.",
    providerQuestion: "Ask which fertility services are included, which are estimates, and which may be billed by third parties.",
    documentFocus: ["fertility treatment estimate", "specialist referral or plan", "rebate and storage cost notes"],
    comparisonAngle: "Fertility finance needs more flexibility than many elective procedures because costs can change after test results.",
    borrowerCaution: "Keep a buffer for medication or additional testing only if the clinic has explained why those costs may apply.",
    serviceType: "Fertility treatment finance broker matching",
  },
  "breast-augmentation-loans": {
    quoteFocus: ["surgeon fee", "hospital and anaesthetist fees", "implant type and post-operative garments"],
    paymentTiming: "Cosmetic surgery providers commonly require deposits before surgery dates and final balances before admission.",
    providerQuestion: "Ask whether the quote includes implants, hospital, anaesthetist, garments and post-operative review appointments.",
    documentFocus: ["surgeon quote", "hospital and anaesthetist estimate", "implant and garment inclusions"],
    comparisonAngle: "Breast augmentation finance should be checked against the full surgical quote rather than the surgeon fee alone.",
    borrowerCaution: "A low headline price can exclude hospital or anaesthetist costs, so compare written inclusions before choosing a loan amount.",
    serviceType: "Breast augmentation finance broker matching",
  },
  "rhinoplasty-financing": {
    quoteFocus: ["functional or cosmetic scope", "hospital and anaesthetist fees", "imaging and follow-up appointments"],
    paymentTiming: "Rhinoplasty deposits may be due when a surgery date is held, with final balances often due before admission.",
    providerQuestion: "Ask whether the quote separates cosmetic components, functional components, hospital costs and anaesthetist costs.",
    documentFocus: ["surgeon quote", "hospital estimate", "functional or cosmetic scope notes"],
    comparisonAngle: "Rhinoplasty finance needs clear scope because cosmetic-only and functional cases can be priced differently.",
    borrowerCaution: "Check whether private health or Medicare rebates affect any part of the quote before setting the loan amount.",
    serviceType: "Rhinoplasty finance broker matching",
  },
  "tummy-tuck-loans": {
    quoteFocus: ["surgeon fee", "hospital stay length", "muscle repair, liposuction or garment inclusions"],
    paymentTiming: "Abdominoplasty providers may stage payment around booking deposits, hospital admission and post-operative garments.",
    providerQuestion: "Ask whether muscle repair, liposuction, compression garments and follow-up visits are included.",
    documentFocus: ["surgeon quote", "hospital stay estimate", "garment and post-operative care costs"],
    comparisonAngle: "Tummy tuck finance should account for hospital costs and recovery supports, not only the surgical item.",
    borrowerCaution: "Compare like-for-like quotes because a mini tummy tuck and full abdominoplasty are not the same finance problem.",
    serviceType: "Tummy tuck finance broker matching",
  },
  "liposuction-financing": {
    quoteFocus: ["number of areas treated", "anaesthetic setting", "compression garments and review appointments"],
    paymentTiming: "Liposuction quotes may require payment before surgery dates or staged deposits for multi-area treatment.",
    providerQuestion: "Ask whether the price is per area or for the full treatment plan, including garments and follow-up reviews.",
    documentFocus: ["area-by-area quote", "anaesthetic and facility estimate", "garment inclusions"],
    comparisonAngle: "Liposuction finance depends heavily on treatment areas, so the written scope matters before comparing rates.",
    borrowerCaution: "Do not compare a one-area quote with a multi-area quote without normalising the inclusions.",
    serviceType: "Liposuction finance broker matching",
  },
  "facelift-financing": {
    quoteFocus: ["surgical technique", "hospital and anaesthetist fees", "neck lift, eyelid or skin treatment add-ons"],
    paymentTiming: "Facelift providers commonly collect deposits before booking surgery, with balances due before admission.",
    providerQuestion: "Ask whether the quote includes neck lift work, hospital, anaesthetist, garments and post-operative visits.",
    documentFocus: ["surgeon quote", "hospital estimate", "included adjunct procedures"],
    comparisonAngle: "Facelift finance should separate the core procedure from optional adjunct work so repayments match the actual plan.",
    borrowerCaution: "Be careful with bundled cosmetic quotes where the facelift component is not clearly separated.",
    serviceType: "Facelift finance broker matching",
  },
  "lasik-loans": {
    quoteFocus: ["both-eye pricing", "laser technology", "screening, enhancement and aftercare costs"],
    paymentTiming: "Vision clinics may ask for payment before surgery dates, often after screening confirms suitability.",
    providerQuestion: "Ask whether both eyes, screening, enhancements and follow-up appointments are included.",
    documentFocus: ["vision correction quote", "suitability assessment result", "enhancement and aftercare policy"],
    comparisonAngle: "LASIK finance is often a shorter-term decision because treatment costs are more contained than major surgery.",
    borrowerCaution: "Only compare finance after the clinic confirms you are suitable for the quoted treatment type.",
    serviceType: "LASIK finance broker matching",
  },
  "bariatric-surgery-loans": {
    quoteFocus: ["procedure type", "hospital and anaesthetist fees", "dietitian, psychology and follow-up costs"],
    paymentTiming: "Bariatric surgery payments can be due before admission, with allied health support costs continuing after surgery.",
    providerQuestion: "Ask whether the quote includes surgeon, hospital, anaesthetist and post-operative support appointments.",
    documentFocus: ["surgery quote", "hospital estimate", "allied health and follow-up plan"],
    comparisonAngle: "Bariatric surgery finance should consider both the procedure cost and the support required after discharge.",
    borrowerCaution: "Check whether private health cover changes the hospital component before setting the loan amount.",
    serviceType: "Bariatric surgery finance broker matching",
  },
  "weight-loss-surgery-loans": {
    quoteFocus: ["surgery type", "hospital gap", "dietitian, psychology and follow-up appointments"],
    paymentTiming: "Weight loss surgery payments may be split between surgeon, hospital, anaesthetist and post-operative supports.",
    providerQuestion: "Ask whether the treatment plan includes pre-surgery assessments and post-surgery review appointments.",
    documentFocus: ["specialist quote", "hospital gap estimate", "follow-up support schedule"],
    comparisonAngle: "Weight loss surgery finance should be planned around the complete clinical pathway rather than only the admission date.",
    borrowerCaution: "Make sure the loan amount reflects confirmed out-of-pocket costs after any insurer or fund estimate.",
    serviceType: "Weight loss surgery finance broker matching",
  },
  "hair-transplant-loans": {
    quoteFocus: ["graft count", "FUE or FUT method", "medications and follow-up reviews"],
    paymentTiming: "Hair transplant providers often quote by graft count and may require deposits before securing a treatment date.",
    providerQuestion: "Ask how many grafts are included, which method is used and whether aftercare medication is included.",
    documentFocus: ["graft-count quote", "method and session plan", "aftercare cost notes"],
    comparisonAngle: "Hair transplant finance should be matched to the confirmed graft count because small scope changes can affect cost.",
    borrowerCaution: "Avoid borrowing from a headline price if the provider has not confirmed the graft count needed for your goals.",
    serviceType: "Hair transplant finance broker matching",
  },
  "orthopedic-surgery-loans": {
    quoteFocus: ["surgeon fee", "hospital gap", "implant, imaging and rehabilitation costs"],
    paymentTiming: "Orthopedic costs can be split between surgery, hospital admission, imaging and rehabilitation providers.",
    providerQuestion: "Ask for the likely out-of-pocket cost after Medicare, private health and hospital estimates are applied.",
    documentFocus: ["specialist quote", "hospital gap estimate", "rehabilitation or imaging estimate"],
    comparisonAngle: "Orthopedic surgery finance works best when it accounts for rehab and gap payments, not only the operation.",
    borrowerCaution: "Confirm insurer and fund estimates before using finance to cover a hospital gap.",
    serviceType: "Orthopedic surgery finance broker matching",
  },
  "dermatology-financing": {
    quoteFocus: ["treatment type", "number of sessions", "medication, pathology or review costs"],
    paymentTiming: "Dermatology treatment can involve multiple sessions, with costs spread across appointments rather than one procedure date.",
    providerQuestion: "Ask how many sessions are expected and whether prescriptions, pathology or reviews are billed separately.",
    documentFocus: ["dermatology treatment plan", "session schedule", "medication or pathology estimate"],
    comparisonAngle: "Dermatology finance should match the expected number of sessions so the loan term does not outlast the treatment plan unnecessarily.",
    borrowerCaution: "Do not borrow for a long course until the provider has explained the likely number of sessions.",
    serviceType: "Dermatology finance broker matching",
  },
  "mommy-makeover-financing": {
    quoteFocus: ["combined procedures", "hospital and anaesthetist fees", "recovery garments and staged care"],
    paymentTiming: "Combined cosmetic surgery usually requires a deposit before the date is held and final payment before admission.",
    providerQuestion: "Ask the surgeon to separate tummy tuck, breast surgery, liposuction, hospital and anaesthetist costs.",
    documentFocus: ["combined surgery quote", "hospital and anaesthetist estimate", "procedure-by-procedure breakdown"],
    comparisonAngle: "Mummy makeover finance needs careful scope control because combining procedures can change both cost and recovery planning.",
    borrowerCaution: "Avoid accepting a bundled total without seeing which procedures and facility costs are included.",
    serviceType: "Mummy makeover finance broker matching",
  },
  "medical-loan": {
    quoteFocus: ["procedure quote", "provider payment dates", "rebates, gaps and follow-up costs"],
    paymentTiming: "General medical costs may be due before treatment, at admission, or across several providers.",
    providerQuestion: "Ask each provider to separate confirmed costs from estimates so your broker can compare the right loan amount.",
    documentFocus: ["medical provider quote", "rebate or insurer estimates", "payment due dates"],
    comparisonAngle: "A medical loan is most useful when it is tied to a confirmed treatment plan and provider payment schedule.",
    borrowerCaution: "Avoid rolling unrelated expenses into the loan unless you have checked affordability across the full term.",
    serviceType: "Medical finance broker matching",
  },
  "debt-consolidation": {
    quoteFocus: ["current debt balances", "interest rates and fees", "payout amounts and repayment dates"],
    paymentTiming: "Debt consolidation depends on current payout figures, which can change as interest and fees accrue.",
    providerQuestion: "Ask each existing lender for payout figures, current rates, fees and any early repayment terms.",
    documentFocus: ["current loan statements", "credit card balances", "BNPL and personal loan payout figures"],
    comparisonAngle: "Debt consolidation finance should be compared against your current total repayments and total interest cost.",
    borrowerCaution: "Do not consolidate if the new term lowers the monthly payment but increases total interest beyond what you accept.",
    serviceType: "Debt consolidation broker matching",
  },
  "vet-bill-loans": {
    quoteFocus: ["diagnostics", "surgery or treatment plan", "medication and follow-up visits"],
    paymentTiming: "Vet bills can move quickly, especially for emergency care, specialist treatment or staged recovery plans.",
    providerQuestion: "Ask the clinic to separate urgent treatment, diagnostics, medication and expected follow-up costs.",
    documentFocus: ["vet treatment estimate", "diagnostics quote", "follow-up and medication cost notes"],
    comparisonAngle: "Vet bill finance should be fast enough for care decisions while still comparing lender cost and repayment terms.",
    borrowerCaution: "If the estimate may change after diagnostics, ask the vet for the likely low and high cost scenarios.",
    serviceType: "Vet bill finance broker matching",
  },
};

const majorMetroSlugs = new Set([
  "sydney",
  "melbourne",
  "brisbane",
  "perth",
  "adelaide",
]);

const coastalSlugs = new Set([
  "gold-coast",
  "newcastle",
  "wollongong",
  "sunshine-coast",
  "cairns",
  "mackay",
  "bunbury",
  "bundaberg",
  "coffs-harbour",
  "hervey-bay",
  "gladstone",
]);

const regionalReferralSlugs = new Set([
  "townsville",
  "toowoomba",
  "ballarat",
  "bendigo",
  "albury",
  "launceston",
  "rockhampton",
  "wagga-wagga",
  "mildura",
  "shepparton",
]);

const stateFinanceNotes: Record<string, string> = {
  NSW: "NSW patients often compare city, suburban and regional providers before committing to a payment date.",
  VIC: "Victorian patients may be weighing local providers against Melbourne specialist options and referral timelines.",
  QLD: "Queensland patients often compare coastal, metro and regional provider access, especially when travel affects appointment timing.",
  WA: "WA patients may need finance that works across wider travel distances and provider availability.",
  SA: "SA patients can usually compare several provider options within a compact market, which makes written quote detail useful.",
  ACT: "ACT patients may compare Canberra providers with nearby NSW options when specialist availability is limited.",
  TAS: "Tasmanian patients often plan around a smaller specialist market and may need extra flexibility around appointment availability.",
  NT: "NT patients may need to account for specialist availability, travel and referral timing before accepting payment terms.",
};

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function getMarketProfile(location: Location): LocalMarketProfile {
  const nearby = formatList(location.nearbyAreas.slice(0, 3));

  if (majorMetroSlugs.has(location.slug)) {
    return {
      label: "Major metro market",
      providerPattern: `Patients can compare a wide spread of providers across ${nearby}, which makes like-for-like quotes important before choosing finance.`,
      travelPattern: "Appointment choice is usually broad, but prices, deposits and payment timing can vary between inner-city and suburban providers.",
      financeAngle: "A broker-matched loan helps separate the provider decision from the pressure to accept a clinic payment option on the spot.",
    };
  }

  if (coastalSlugs.has(location.slug)) {
    return {
      label: "Coastal provider corridor",
      providerPattern: `Patients may compare providers along the coastal corridor around ${nearby}, plus nearby larger centres where specialist access is stronger.`,
      travelPattern: "Travel time, deposits and appointment availability can all affect when funds need to be ready.",
      financeAngle: "Checking rates early can help keep local and out-of-area provider choices open.",
    };
  }

  if (regionalReferralSlugs.has(location.slug)) {
    return {
      label: "Regional referral market",
      providerPattern: `Patients often compare local providers with referral options around ${nearby}, especially for higher-cost or specialist care.`,
      travelPattern: "A realistic finance plan should include payment due dates as well as travel or referral timing.",
      financeAngle: "Pre-approval can help confirm budget before the patient commits to a provider outside their immediate area.",
    };
  }

  return {
    label: "Local specialist market",
    providerPattern: `Patients around ${nearby} may have fewer provider choices for some services, so comparing finance before booking can reduce pressure.`,
    travelPattern: "When availability is limited, funding needs to be ready before a preferred appointment is lost.",
    financeAngle: "A soft-credit rate check can help clarify borrowing capacity before deposits or booking fees are due.",
  };
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function financingTitleForSentence(title: string) {
  const acronyms = new Set(["IVF", "ICSI", "LASIK"]);

  return title
    .split(" ")
    .map((word) => (acronyms.has(word) ? word : word.toLowerCase()))
    .join(" ");
}

export function getLocationProcedureContent(
  location: Location,
  procedure: Procedure
): LocalProcedureContent {
  const copy = getProcedureCopy(procedure);
  const financingSentenceLabel = financingTitleForSentence(copy.financingTitle);
  const procedureProfile =
    procedureProfiles[procedure.slug] ?? procedureProfiles["medical-loan"];
  const marketProfile = getMarketProfile(location);
  const nearbyAreas = formatList(location.nearbyAreas);
  const nearbyShort = formatList(location.nearbyAreas.slice(0, 2));
  const primaryCost = procedure.costTable[0];
  const secondaryCost = procedure.costTable[1] ?? procedure.costTable[0];
  const repaymentExample =
    procedure.repaymentExamples[1] ?? procedure.repaymentExamples[0] ?? null;
  const stateNote =
    stateFinanceNotes[location.stateCode] ??
    "Australian patients should compare treatment quotes and finance terms before committing to payment.";

  const quoteFocusText = formatList(procedureProfile.quoteFocus);

  const content: LocalProcedureContent = {
    metaDescription: `Compare ${financingSentenceLabel} in ${location.name}. Local quote guidance, payment timing and broker-matched lender options with a soft-credit check.`,
    heroDescription: `Compare broker-matched finance for ${copy.treatment} in ${location.name}. Use local quote guidance, payment timing checks and lender comparison before choosing a provider across ${nearbyAreas}.`,
    localNarrative: [
      `${location.localContext} For ${copy.treatment}, the finance decision should match ${quoteFocusText}, not only the headline price.`,
      `${marketProfile.providerPattern} ${marketProfile.travelPattern}`,
      `${stateNote} CosmediLoans is not a lender or clinic. It connects patients with brokers who can compare rates, fees, loan terms and approval timing across 20+ lenders.`,
    ],
    localGuideItems: [
      {
        title: "Start with the full written quote",
        text: `${procedureProfile.providerQuestion} This gives the broker a cleaner amount to compare across lenders.`,
      },
      {
        title: `Compare options around ${location.name}`,
        text: `${marketProfile.financeAngle} This matters when providers around ${nearbyShort} have different deposit dates or treatment windows.`,
      },
      {
        title: "Match repayments to the treatment plan",
        text: `${procedureProfile.paymentTiming} Choose a term that keeps repayments manageable without stretching the debt longer than necessary.`,
      },
      {
        title: "Use soft-credit comparison first",
        text: "CosmediLoans can help check your rate path before a formal lender application, so you can compare without affecting your credit score at the quote stage.",
      },
    ],
    quotePlanningCards: [
      {
        title: "Typical treatment range",
        value: procedure.avgCostRange,
        text: `Use this Australian range as a first benchmark, then compare it with the actual ${location.name} provider quote.`,
      },
      {
        title: "Quote detail to verify",
        value: primaryCost?.subProcedure ?? copy.ctaSubject,
        text: primaryCost
          ? `${primaryCost.subProcedure} is commonly quoted around ${primaryCost.costRange}. Ask what is included before borrowing.`
          : `Ask the provider to separate ${copy.treatment} costs, deposits and expected follow-up fees.`,
      },
      {
        title: "Second cost variable",
        value: secondaryCost?.subProcedure ?? "Payment schedule",
        text: secondaryCost
          ? `${secondaryCost.subProcedure} can sit around ${secondaryCost.costRange}, so scope changes should be reflected in the finance amount.`
          : procedureProfile.paymentTiming,
      },
      {
        title: "Repayment planning anchor",
        value: repaymentExample
          ? `${formatAmount(repaymentExample.amount)} over ${repaymentExample.term} years`
          : `Terms up to ${procedure.maxTerm}`,
        text: repaymentExample
          ? `Use this as a planning anchor before comparing actual lender rates, fees and repayment frequency.`
          : `Compare terms up to ${procedure.maxTerm}, then choose the shortest term that remains affordable.`,
      },
    ],
    providerComparisonItems: [
      {
        title: marketProfile.label,
        text: marketProfile.providerPattern,
      },
      {
        title: "Procedure-specific comparison",
        text: procedureProfile.comparisonAngle,
      },
      {
        title: "Borrowing guardrail",
        text: procedureProfile.borrowerCaution,
      },
    ],
    applicationChecklist: [
      procedureProfile.documentFocus[0],
      procedureProfile.documentFocus[1],
      procedureProfile.documentFocus[2],
      "preferred payment date and deposit deadline",
      "income, expense and existing repayment details for lender assessment",
    ].filter(Boolean),
    paymentMilestones: [
      "Collect a written quote before comparing lender offers.",
      "Check whether the provider needs a deposit, staged payment or final balance before treatment.",
      "Compare total loan cost, not only the monthly repayment.",
      "Proceed to a formal lender application only when the quote and timing are clear.",
    ],
    exampleScenario: {
      title: `Example ${location.name} planning scenario`,
      text: repaymentExample
        ? `A patient comparing ${copy.treatment} around ${nearbyShort} might use a ${formatAmount(repaymentExample.amount)} quote as the finance anchor, then test repayments over ${repaymentExample.term} years before deciding whether the provider's deposit timing works. This is an example only, not a quote or approval.`
        : `A patient comparing ${copy.treatment} around ${nearbyShort} might check borrowing capacity before paying a provider deposit, then choose a lender option only after the written quote is complete. This is an example only, not a quote or approval.`,
    },
    localFaqs: [
      {
        question: `Is ${financingSentenceLabel} available in ${location.name}?`,
        answer: `Yes. Patients in ${location.name} can use CosmediLoans to connect with brokers who compare lender options for ${copy.treatment}. The broker can compare rates, terms and fees while you choose a provider around ${nearbyAreas}.`,
      },
      {
        question: `What makes ${copy.treatment} finance different in ${location.name}?`,
        answer: `${location.localContext} For this procedure, you should also check ${quoteFocusText} before selecting a loan amount.`,
      },
      {
        question: `Which quote details should I collect from providers near ${nearbyShort}?`,
        answer: `${procedureProfile.providerQuestion} Also confirm deposits, payment due dates and any follow-up costs that may not be included in the first estimate.`,
      },
      {
        question: `Can I compare lenders before choosing a provider in ${location.name}?`,
        answer: `Yes. A soft-credit comparison can help you understand likely loan options before you commit to a provider. Final approval still depends on lender assessment, your financial position and the confirmed treatment cost.`,
      },
      {
        question: `How do I avoid over-borrowing for ${copy.treatment}?`,
        answer: `${procedureProfile.borrowerCaution} Compare the total cost of the loan, including interest and fees, against the treatment quote before accepting an offer.`,
      },
    ],
    schemaServiceType: procedureProfile.serviceType,
  };

  if (
    location.slug === "sunshine-coast" &&
    procedure.slug === "facelift-financing"
  ) {
    content.metaDescription =
      "Compare facelift and neck lift finance on the Sunshine Coast. Cost planning, quote inclusions, deposits and broker-matched lender options.";
    content.heroDescription =
      "Compare broker-matched finance for facelift surgery and neck lift costs on the Sunshine Coast. Use local quote guidance, hospital and anaesthetist checks, and repayment planning before choosing a provider.";
    content.localNarrative = [
      "Sunshine Coast patients often compare facelift and neck lift providers across Maroochydore, Noosa, Caloundra and Brisbane referral options. The finance decision should match the written surgery quote, not only the headline facelift price.",
      "For a facelift surgery Sunshine Coast search, the key cost question is whether the quote covers a full facelift, mini facelift, neck lift, hospital, anaesthetist, garments and post-operative reviews. Each inclusion can change the amount that needs to be financed.",
      "CosmediLoans is not a clinic or lender. It connects patients with brokers who can compare rates, fees, loan terms and approval timing across 20+ lenders before a formal lender application.",
    ];
    content.localGuideItems = [
      {
        title: "Separate facelift and neck lift scope",
        text: "Ask the surgeon whether the quote is for facelift only, neck lift only, or a combined face and neck lift. Bundled cosmetic quotes should still show what is included.",
      },
      {
        title: "Check Sunshine Coast payment timing",
        text: "Providers may ask for a booking deposit before the surgery date and the final balance before admission. Your loan timing should match those dates.",
      },
      {
        title: "Compare local and referral options",
        text: "Some patients compare Sunshine Coast consults with Brisbane surgical options. Finance should stay flexible enough to use the provider you choose.",
      },
      {
        title: "Use a soft-credit comparison first",
        text: "A soft initial comparison can help estimate likely lender options before you commit to a surgery deposit or submit a full lender application.",
      },
    ];
    content.quotePlanningCards = [
      {
        title: "Primary search demand",
        value: "Facelift surgery Sunshine Coast",
        text: "Use the complete written quote as the finance anchor, including surgeon, hospital, anaesthetist and follow-up costs.",
      },
      {
        title: "Neck lift cost variable",
        value: "Neck lift cost Sunshine Coast",
        text: "A neck lift may be quoted separately or bundled with a facelift. Ask for the cost split before choosing a loan amount.",
      },
      {
        title: "Deposit timing",
        value: "Before surgery booking",
        text: "Confirm when the deposit, final balance and any hospital gap are due so settlement timing matches the provider schedule.",
      },
      {
        title: "Repayment planning anchor",
        value: repaymentExample
          ? `${formatAmount(repaymentExample.amount)} over ${repaymentExample.term} years`
          : `Terms up to ${procedure.maxTerm}`,
        text: "Use repayment examples only as planning anchors. Actual rates, fees and limits depend on lender assessment.",
      },
    ];
    content.providerComparisonItems = [
      {
        title: "Sunshine Coast cosmetic surgery corridor",
        text: "Patients may compare providers across Noosa, Maroochydore, Caloundra and Brisbane. Provider choice can affect deposit timing and travel plans.",
      },
      {
        title: "Facelift versus neck lift quote clarity",
        text: "A mini facelift, full facelift, neck lift and combined face-neck procedure are different finance problems. Compare the written inclusions before borrowing.",
      },
      {
        title: "Borrowing guardrail",
        text: "Avoid financing optional add-ons until the surgeon has separated the required surgical scope from elective extras.",
      },
    ];
    content.applicationChecklist = [
      "facelift and neck lift quote with inclusions separated",
      "hospital and anaesthetist estimate",
      "deposit deadline and final balance date",
      "post-operative garment and review cost notes",
      "income, expense and existing repayment details for lender assessment",
    ];
    content.localFaqs = [
      {
        question: "How much does facelift surgery cost on the Sunshine Coast?",
        answer:
          "The amount depends on whether the quote is for a mini facelift, full facelift, neck lift, or a combined face and neck lift. Ask for surgeon, hospital, anaesthetist and follow-up costs before comparing finance.",
      },
      {
        question: "Can I finance a neck lift on the Sunshine Coast?",
        answer:
          "Potentially, yes. A broker can compare lender options for a standalone neck lift or a combined facelift and neck lift if you have a written quote and meet lender criteria.",
      },
      {
        question: "Should I compare Sunshine Coast and Brisbane facelift quotes?",
        answer:
          "Many patients compare local and Brisbane provider options. If you do, compare the same inclusions and check whether travel, deposits or hospital fees change the amount needed.",
      },
      {
        question: "Can I check repayments before paying a surgery deposit?",
        answer:
          "Yes. A soft initial comparison can help you understand likely repayments before you commit to a deposit. Final approval still depends on lender assessment and the confirmed quote.",
      },
      {
        question: "What should I avoid when financing a facelift?",
        answer:
          "Avoid borrowing from a headline price that excludes hospital, anaesthetist, neck lift add-ons, garments or post-operative care. Compare the total loan cost against the full quote.",
      },
    ];
  }

  return content;
}
