const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type UTMParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>;

const STORAGE_KEY = "cosmedi_utm";

export function captureUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }

  return utm;
}

export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
