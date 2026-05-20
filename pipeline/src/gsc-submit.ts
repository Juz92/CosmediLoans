import "dotenv/config";
import { google } from "googleapis";
import { getAuthClient } from "./config/credentials.js";
import { getSiteConfig } from "./config/site.js";

/**
 * Submit the sitemap to Google Search Console via the official API.
 * Also runs a URL-inspection on each of the top pages so we can see
 * indexing status from the API without opening the GSC UI.
 */

const TOP_PAGES = [
  "/",
  "/procedures/dental-loans",
  "/procedures/ivf-financing",
  "/procedures/hair-transplant-loans",
  "/procedures/vet-bill-loans",
  "/calculator",
  "/compare/cosmediloans-vs-afterpay",
  "/locations/sydney/dental-loans",
  "/locations/melbourne/ivf-financing",
  "/locations/brisbane/dental-loans",
  "/locations/perth/breast-augmentation-loans",
  "/locations/gold-coast/rhinoplasty-financing",
  "/guides/dental-payment-plans-australia",
  "/guides/ivf-payment-plans-australia",
  "/guides/cosmetic-surgery-payment-plans-australia",
  "/guides/vet-bill-payment-plans-australia",
  "/guides/medical-loans-bad-credit-australia",
  "/guides/no-credit-check-dental-finance-australia",
  "/guides/topics/dental-finance",
  "/guides/topics/ivf-finance",
  "/guides/topics/cosmetic-surgery-finance",
  "/guides/topics/bad-credit-medical-loans",
  "/guides/topics/location-treatment-costs",
  "/compare/medical-loans-vs-payment-plans",
  "/compare/dental-loans-vs-buy-now-pay-later",
  "/compare/ivf-payment-plan-vs-personal-loan",
  "/compare/cosmetic-surgery-finance-vs-credit-card",
  "/compare/bad-credit-medical-loans-alternatives",
  "/editorial-policy",
  "/locations/sunshine-coast/facelift-financing",
];

async function main() {
  const config = getSiteConfig();
  const auth = await getAuthClient();
  const sc = google.searchconsole({ version: "v1", auth });

  const siteUrl = config.gscProperty;
  const sitemapUrl = `${config.url}/sitemap.xml`;

  console.log(`GSC property: ${siteUrl}`);
  console.log(`Submitting sitemap: ${sitemapUrl}\n`);

  try {
    await sc.sitemaps.submit({ siteUrl, feedpath: sitemapUrl });
    console.log("OK: Sitemap submitted to GSC.");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`ERROR: Sitemap submission failed: ${msg}`);
  }

  console.log("\nListing known sitemaps for this property:");
  try {
    const list = await sc.sitemaps.list({ siteUrl });
    for (const sm of list.data.sitemap ?? []) {
      console.log(
        `  ${sm.path}  (lastSubmitted=${sm.lastSubmitted ?? "?"}, warnings=${sm.warnings ?? 0}, errors=${sm.errors ?? 0})`,
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  List failed: ${msg}`);
  }

  console.log("\nInspecting top pages (coverage state from Google):");
  for (const path of TOP_PAGES) {
    const inspectionUrl = `${config.url}${path}`;
    try {
      const res = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl, siteUrl },
      });
      const idx = res.data.inspectionResult?.indexStatusResult;
      const verdict = idx?.verdict ?? "?";
      const coverage = idx?.coverageState ?? "?";
      const lastCrawl = idx?.lastCrawlTime ?? "?";
      console.log(
        `  ${path}\n    verdict=${verdict} | coverage=${coverage} | lastCrawl=${lastCrawl}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ${path}: ${msg}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
