import type { LeadSubmissionData } from "@/lib/leads";

export interface LeadReportRow {
  submittedAt: string;
  source: string;
  formSource: string;
  landingPage: string;
  currentPage: string;
  pageOrigin: string;
  landingPageType: string;
  trafficChannel: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  procedure: string;
  procedureSlug: string;
  locationSlug: string;
  fullName: string;
  name: string;
  email: string;
  phone: string;
  amount: string;
  message: string;
  leadStatus: string;
  leadQuality: string;
  bookedCallAt: string;
  fundedOutcome: string;
  fundedAmount: string;
  owner: string;
  notes: string;
}

export const LEAD_REPORT_COLUMNS: Array<keyof LeadReportRow> = [
  "submittedAt",
  "source",
  "formSource",
  "landingPage",
  "currentPage",
  "pageOrigin",
  "landingPageType",
  "trafficChannel",
  "referrer",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "procedure",
  "procedureSlug",
  "locationSlug",
  "fullName",
  "name",
  "email",
  "phone",
  "amount",
  "message",
  "leadStatus",
  "leadQuality",
  "bookedCallAt",
  "fundedOutcome",
  "fundedAmount",
  "owner",
  "notes",
];

export function buildLeadReportRow(
  lead: LeadSubmissionData,
  submittedAt = new Date().toISOString()
): LeadReportRow {
  const pageOrigin = cleanPage(lead.pageOrigin);
  const currentPage = cleanPage(lead.currentPage) || pageOrigin;
  const landingPage = cleanPage(lead.landingPage) || currentPage;
  const pageForContext = currentPage || landingPage || pageOrigin;
  const context = inferPageContext(pageForContext, lead.procedure);

  return {
    submittedAt,
    source: lead.source || "",
    formSource: lead.source || "",
    landingPage,
    currentPage,
    pageOrigin,
    landingPageType: classifyPage(landingPage || pageForContext),
    trafficChannel: inferTrafficChannel(lead),
    referrer: lead.referrer || "",
    utmSource: lead.utmSource || "",
    utmMedium: lead.utmMedium || "",
    utmCampaign: lead.utmCampaign || "",
    utmContent: lead.utmContent || "",
    utmTerm: lead.utmTerm || "",
    procedure: lead.procedure || "",
    procedureSlug: context.procedureSlug,
    locationSlug: context.locationSlug,
    fullName: lead.fullName || "",
    name: lead.fullName || "",
    email: lead.email,
    phone: lead.phone || "",
    amount: lead.amount || "",
    message: lead.message || "",
    leadStatus: "new",
    leadQuality: "unreviewed",
    bookedCallAt: "",
    fundedOutcome: "",
    fundedAmount: "",
    owner: "",
    notes: "",
  };
}

function cleanPage(value?: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    return `${url.pathname}${url.search}`;
  } catch {
    return value;
  }
}

function inferPageContext(page: string, procedure?: string) {
  const locationMatch = page.match(/\/locations\/([^/?#]+)(?:\/([^/?#]+))?/);
  if (locationMatch) {
    return {
      locationSlug: locationMatch[1] || "",
      procedureSlug: locationMatch[2] || normalizeSlug(procedure),
    };
  }

  const procedureMatch = page.match(/\/procedures\/([^/?#]+)/);
  return {
    locationSlug: "",
    procedureSlug: procedureMatch?.[1] || normalizeSlug(procedure),
  };
}

function normalizeSlug(value?: string) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function classifyPage(page: string) {
  if (!page || page === "/") return "home";
  if (page.startsWith("/procedures/")) return "procedure";
  if (page.startsWith("/locations/") && page.split("/").filter(Boolean).length >= 3) {
    return "location_procedure";
  }
  if (page.startsWith("/locations/")) return "location";
  if (page.startsWith("/guides/topics/")) return "guide_hub";
  if (page.startsWith("/guides/")) return "guide";
  if (page.startsWith("/compare/")) return "comparison";
  if (page.startsWith("/calculator")) return "calculator";
  if (page.startsWith("/contact")) return "contact";
  return "other";
}

function inferTrafficChannel(lead: LeadSubmissionData) {
  const medium = lead.utmMedium?.toLowerCase();
  const source = lead.utmSource?.toLowerCase();
  const referrer = lead.referrer?.toLowerCase() || "";

  if (medium) {
    if (["cpc", "ppc", "paidsearch", "paid_search"].includes(medium)) {
      return "paid_search";
    }
    if (medium.includes("email")) return "email";
    if (medium.includes("social")) return "paid_or_organic_social";
    if (medium.includes("affiliate")) return "affiliate";
    if (medium.includes("referral")) return "referral";
  }

  if (source) {
    if (["google", "bing", "duckduckgo", "yahoo", "ecosia"].includes(source)) {
      return "organic_search";
    }
    if (["facebook", "instagram", "linkedin", "tiktok", "youtube"].includes(source)) {
      return "social";
    }
  }

  if (/(google|bing|duckduckgo|yahoo|ecosia)\./.test(referrer)) {
    return "organic_search";
  }

  if (/(facebook|instagram|linkedin|tiktok|youtube)\./.test(referrer)) {
    return "organic_social";
  }

  if (referrer) return "referral";
  return "direct_or_unknown";
}
