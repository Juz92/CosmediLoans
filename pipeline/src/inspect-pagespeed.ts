import "dotenv/config";
import { readRange } from "./sheets/reader.js";
import { getSiteConfig } from "./config/site.js";

async function main() {
  const config = getSiteConfig();
  const rows = await readRange(config.sheetId, "pagespeed", "A:G");
  const data = rows.slice(rows.length - 6); // latest run only

  console.log("Mobile PageSpeed baseline\n");
  console.log("URL | score | LCP(ms) | TBT(ms) | CLS | SI(ms)");
  for (const r of data) {
    if (!r[1]) continue;
    const url = r[1].replace("https://www.cosmediloans.com.au", "");
    console.log(
      `${url || "/"} | ${r[2]} | ${r[3]} | ${r[4]} | ${r[5]} | ${r[6]}`,
    );
  }
  console.log("\nThresholds: score ≥90=good, 50-89=needs work, <50=poor");
  console.log("LCP: <2500ms good, <4000 needs work | TBT: <200 good, <600 needs work | CLS: <0.1 good, <0.25 needs work");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
