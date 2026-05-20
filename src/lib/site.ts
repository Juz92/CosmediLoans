export const SITE_ORIGIN = "https://www.cosmediloans.com.au" as const;

export const BRAND = "CosmediLoans" as const;

export const LAST_REVIEWED = "2026-05-21" as const;

export const LEGAL = {
  abn: "14 693 894 558",
  email: "cosmediloans@gmail.com",
  phone: "0422 676 073",
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${clean}`;
}
