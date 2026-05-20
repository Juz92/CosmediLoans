import { google } from "googleapis";
import type { CollectorResult } from "./types.js";
import { getAuthClient } from "../config/credentials.js";

function yesNo(value: unknown): string {
  return value ? "yes" : "no";
}

function collectRecommendations(location: Record<string, any>): string[] {
  const recommendations: string[] = [];
  const categories = location.categories ?? {};
  const primaryCategory = categories.primaryCategory?.displayName;
  const serviceItems = location.serviceItems ?? [];
  const description = location.profile?.description;
  const websiteUri = location.websiteUri;
  const phone = location.phoneNumbers?.primaryPhone;

  if (!primaryCategory) recommendations.push("Add or verify primary category");
  if ((categories.additionalCategories ?? []).length === 0) {
    recommendations.push("Review additional categories");
  }
  if (!description) recommendations.push("Add business description");
  if (!websiteUri) recommendations.push("Add website URL");
  if (!phone) recommendations.push("Add primary phone");
  if (serviceItems.length === 0) recommendations.push("Add services");
  if (location.metadata?.hasPendingEdits) recommendations.push("Review pending Google edits");
  if (!location.metadata?.hasVoiceOfMerchant) recommendations.push("Check verification / Voice of Merchant");

  return recommendations;
}

/**
 * Google Business Profile collector.
 *
 * Row format:
 * [timestamp, account, location, title, website, primaryCategory,
 *  additionalCategories, serviceCount, hasDescription, hasWebsite, hasPhone,
 *  hasVoiceOfMerchant, hasPendingEdits, mapsUrl, reviewUrl, recommendations]
 */
export async function collectBusinessProfile(): Promise<CollectorResult> {
  const timestamp = new Date().toISOString();

  try {
    const auth = await getAuthClient();
    const accountManagement = google.mybusinessaccountmanagement({
      version: "v1",
      auth,
    });
    const businessInfo = google.mybusinessbusinessinformation({
      version: "v1",
      auth,
    });

    const accountsResponse = await accountManagement.accounts.list({
      pageSize: 20,
    });
    const accounts = accountsResponse.data.accounts ?? [];
    const rows: string[][] = [];

    for (const account of accounts) {
      if (!account.name) continue;

      const locationsResponse = await businessInfo.accounts.locations.list({
        parent: account.name,
        pageSize: 100,
        readMask:
          "name,title,websiteUri,phoneNumbers,categories,profile,serviceItems,metadata,regularHours,serviceArea,openInfo",
      });

      for (const location of locationsResponse.data.locations ?? []) {
        const typedLocation = location as Record<string, any>;
        const categories = typedLocation.categories ?? {};
        const additionalCategories = categories.additionalCategories ?? [];
        const serviceItems = typedLocation.serviceItems ?? [];
        const recommendations = collectRecommendations(typedLocation);

        rows.push([
          timestamp,
          account.accountName ?? account.name,
          typedLocation.name ?? "",
          typedLocation.title ?? "",
          typedLocation.websiteUri ?? "",
          categories.primaryCategory?.displayName ?? "",
          additionalCategories
            .map((category: { displayName?: string }) => category.displayName)
            .filter(Boolean)
            .join(", "),
          String(serviceItems.length),
          yesNo(typedLocation.profile?.description),
          yesNo(typedLocation.websiteUri),
          yesNo(typedLocation.phoneNumbers?.primaryPhone),
          yesNo(typedLocation.metadata?.hasVoiceOfMerchant),
          yesNo(typedLocation.metadata?.hasPendingEdits),
          typedLocation.metadata?.mapsUri ?? "",
          typedLocation.metadata?.newReviewUri ?? "",
          recommendations.length > 0 ? recommendations.join("; ") : "No obvious gaps",
        ]);
      }
    }

    if (rows.length === 0) {
      rows.push([
        timestamp,
        "NO_LOCATIONS",
        "",
        "",
        "",
        "",
        "",
        "0",
        "no",
        "no",
        "no",
        "no",
        "no",
        "",
        "",
        "No Google Business Profile locations were returned for this account",
      ]);
    }

    return {
      source: "business-profile",
      timestamp,
      rows,
      metadata: {
        accountCount: accounts.length,
        locationCount: rows.length,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "business-profile",
      timestamp,
      rows: [[timestamp, "ERROR", "", "", "", "", "", "0", "no", "no", "no", "no", "no", "", "", message]],
      metadata: { error: message },
    };
  }
}
