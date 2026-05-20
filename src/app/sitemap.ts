import type { MetadataRoute } from "next";
import { getAllProcedureSlugs } from "@/data/procedures";
import { comparisons } from "@/data/comparisons";
import { getAllPosts } from "@/lib/blog";
import { getAllLocationSlugs } from "@/data/locations";
import { SITE_ORIGIN, LAST_REVIEWED } from "@/lib/site";
import { getIndexedLocationProcedurePaths } from "@/lib/location-procedure-indexing";
import { highIntentGuides } from "@/data/high-intent-guides";
import { guideHubs } from "@/data/guide-hubs";

const BASE_URL = SITE_ORIGIN;

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewedIso = new Date(LAST_REVIEWED).toISOString();

  // Core pages, lastModified tied to LAST_REVIEWED constant (bump per release)
  const corePages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: reviewedIso, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/procedures`, lastModified: reviewedIso, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/calculator`, lastModified: reviewedIso, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: reviewedIso, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: reviewedIso, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: reviewedIso, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/how-it-works`, lastModified: reviewedIso, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: reviewedIso, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: reviewedIso, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: reviewedIso, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: reviewedIso, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: reviewedIso, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: reviewedIso, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/disclaimer`, lastModified: reviewedIso, changeFrequency: "yearly", priority: 0.2 },
  ];

  const procedureSlugs = getAllProcedureSlugs();

  const procedurePages: MetadataRoute.Sitemap = procedureSlugs.map((slug) => ({
    url: `${BASE_URL}/procedures/${slug}`,
    lastModified: reviewedIso,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Comparison pages, use per-comparison lastReviewed
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE_URL}/compare/${c.slug}`,
    lastModified: new Date(c.lastReviewed ?? LAST_REVIEWED).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts, use per-post date
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const guidePages: MetadataRoute.Sitemap = highIntentGuides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastReviewed).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const guideHubPages: MetadataRoute.Sitemap = guideHubs.map((hub) => ({
    url: `${BASE_URL}/guides/topics/${hub.slug}`,
    lastModified: reviewedIso,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const locationSlugs = getAllLocationSlugs();
  const indexedLocationProcedurePaths = getIndexedLocationProcedurePaths(
    locationSlugs,
    procedureSlugs
  );
  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((loc) => ({
    url: `${BASE_URL}/locations/${loc}`,
    lastModified: reviewedIso,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const locationProcedurePages: MetadataRoute.Sitemap =
    indexedLocationProcedurePaths.map(({ location, procedure }) => ({
      url: `${BASE_URL}/locations/${location}/${procedure}`,
      lastModified: reviewedIso,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    }));

  return [
    ...corePages,
    ...procedurePages,
    ...comparisonPages,
    ...blogPages,
    ...guideHubPages,
    ...guidePages,
    ...locationPages,
    ...locationProcedurePages,
  ];
}
