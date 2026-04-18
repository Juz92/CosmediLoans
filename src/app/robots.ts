import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you", "/apply", "/api/"],
    },
    sitemap: "https://www.cosmediloans.com.au/sitemap.xml",
  };
}
