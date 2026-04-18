import type { MetadataRoute } from "next";
import { getAllProcedureSlugs } from "@/data/procedures";
import { getAllComparisonSlugs } from "@/data/comparisons";
import { getAllSlugs as getAllBlogSlugs } from "@/lib/blog";
import { getAllLocationSlugs } from "@/data/locations";

const BASE_URL = "https://www.cosmediloans.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/procedures`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Procedure pages
  const procedurePages: MetadataRoute.Sitemap = getAllProcedureSlugs().map((slug) => ({
    url: `${BASE_URL}/procedures/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Location city pages (30)
  const locationSlugs = getAllLocationSlugs();
  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((loc) => ({
    url: `${BASE_URL}/locations/${loc}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Location + procedure pages (30 × 17 = 510)
  const procedureSlugs = getAllProcedureSlugs();
  const locationProcedurePages: MetadataRoute.Sitemap = locationSlugs.flatMap((loc) =>
    procedureSlugs.map((proc) => ({
      url: `${BASE_URL}/locations/${loc}/${proc}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...corePages,
    ...procedurePages,
    ...comparisonPages,
    ...blogPages,
    ...locationPages,
    ...locationProcedurePages,
  ];
}
