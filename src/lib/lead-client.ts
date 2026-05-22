import type { LeadSubmissionData } from "@/lib/leads";
import { captureLeadAttribution, getLeadAttribution } from "@/lib/utm";

export type LeadSubmissionPayload = Partial<LeadSubmissionData> & {
  email: string;
};

export async function submitLead(payload: LeadSubmissionPayload) {
  captureLeadAttribution();
  const attribution = getLeadAttribution();
  const enrichedPayload = {
    ...payload,
    utmSource: payload.utmSource ?? attribution.utm_source,
    utmMedium: payload.utmMedium ?? attribution.utm_medium,
    utmCampaign: payload.utmCampaign ?? attribution.utm_campaign,
    utmContent: payload.utmContent ?? attribution.utm_content,
    utmTerm: payload.utmTerm ?? attribution.utm_term,
    pageOrigin:
      payload.pageOrigin ?? attribution.currentPage ?? attribution.landingPage,
    landingPage: payload.landingPage ?? attribution.landingPage,
    currentPage: payload.currentPage ?? attribution.currentPage,
    referrer: payload.referrer ?? attribution.referrer,
    firstSeenAt: payload.firstSeenAt ?? attribution.firstSeenAt,
  };

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrichedPayload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    const message =
      typeof data.error === "string"
        ? data.error
        : "Lead submission failed. Please try again.";
    throw new Error(message);
  }

  trackLeadSubmission(enrichedPayload);
  return data;
}

function trackLeadSubmission(payload: LeadSubmissionPayload) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_form_submission",
    conversion_type: "lead",
    source: payload.source,
    form_source: payload.source,
    procedure: payload.procedure,
    page_origin: payload.pageOrigin,
    landing_page: payload.landingPage,
    current_page: payload.currentPage,
    utm_source: payload.utmSource,
    utm_medium: payload.utmMedium,
    utm_campaign: payload.utmCampaign,
    timestamp: new Date().toISOString(),
  });

  window.gtag?.("event", "lead_form_submission", {
    event_category: "lead",
    event_label: payload.source,
    form_source: payload.source,
    procedure: payload.procedure,
    page_origin: payload.pageOrigin,
    landing_page: payload.landingPage,
    utm_source: payload.utmSource,
    utm_medium: payload.utmMedium,
    utm_campaign: payload.utmCampaign,
  });
}
