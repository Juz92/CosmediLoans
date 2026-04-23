import "dotenv/config";

export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  sheetId: string;
  alertsSheetId: string;
  gscProperty: string;
  ga4PropertyId: string;
}

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

export function getSiteConfig(): SiteConfig {
  return {
    name: "CosmediLoans",
    domain: requireEnv("SITE_DOMAIN"),
    url: requireEnv("SITE_URL"),
    sheetId: requireEnv("SHEET_ID"),
    alertsSheetId: requireEnv("SHEET_ID_ALERTS"),
    gscProperty: requireEnv("GSC_PROPERTY"),
    ga4PropertyId: requireEnv("GA4_PROPERTY_ID"),
  };
}
