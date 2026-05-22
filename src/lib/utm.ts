const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type UTMParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>;

export interface LeadAttribution extends UTMParams {
  landingPage?: string;
  currentPage?: string;
  referrer?: string;
  firstSeenAt?: string;
}

const LEGACY_STORAGE_KEY = "cosmedi_utm";
const ATTRIBUTION_STORAGE_KEY = "cosmedi_attribution";

export function captureUTMParams(): UTMParams {
  const attribution = captureLeadAttribution();
  return pickUTMParams(attribution);
}

export function captureLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  const stored = getStoredLeadAttribution();
  const next: LeadAttribution = {
    ...stored,
    ...utm,
    landingPage: stored.landingPage || getCurrentPage(),
    currentPage: getCurrentPage(),
    referrer: stored.referrer || document.referrer || undefined,
    firstSeenAt: stored.firstSeenAt || new Date().toISOString(),
  };

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(utm));
  }

  sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  const attribution = getStoredLeadAttribution();
  const attributionUtm = pickUTMParams(attribution);
  if (Object.keys(attributionUtm).length > 0) return attributionUtm;

  try {
    const stored = sessionStorage.getItem(LEGACY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  const stored = getStoredLeadAttribution();
  return {
    ...stored,
    landingPage: stored.landingPage || getCurrentPage(),
    currentPage: getCurrentPage(),
    referrer: stored.referrer || document.referrer || undefined,
  };
}

function getStoredLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getCurrentPage() {
  return `${window.location.pathname}${window.location.search}`;
}

function pickUTMParams(attribution: LeadAttribution): UTMParams {
  return UTM_PARAMS.reduce<UTMParams>((params, key) => {
    const value = attribution[key];
    if (value) params[key] = value;
    return params;
  }, {});
}
