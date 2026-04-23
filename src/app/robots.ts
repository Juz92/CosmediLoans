import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";

const DISALLOW = ["/thank-you", "/apply", "/api/"];

const AI_SEARCH_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

const BLOCKED_BOTS = ["CCBot", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_SEARCH_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: DISALLOW,
      })),
      ...BLOCKED_BOTS.map((bot) => ({ userAgent: bot, disallow: "/" })),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
