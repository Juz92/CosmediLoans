import "dotenv/config";
import { readRange } from "./sheets/reader.js";
import { getSiteConfig } from "./config/site.js";

async function main() {
  const config = getSiteConfig();
  const rows = await readRange(config.sheetId, "search-queries", "A:F");
  const data = rows
    .map((r) => ({
      query: r[1] ?? "",
      clicks: parseInt(r[2] ?? "0", 10),
      impressions: parseInt(r[3] ?? "0", 10),
      ctr: parseFloat(r[4] ?? "0") * 100,
      position: parseFloat(r[5] ?? "0"),
    }))
    .filter((r) => r.query && r.query !== "ERROR");

  const total = data.length;
  const totalClicks = data.reduce((a, b) => a + b.clicks, 0);
  const totalImpr = data.reduce((a, b) => a + b.impressions, 0);

  console.log(`\nTotal queries ranking: ${total}`);
  console.log(`Total clicks (7 days): ${totalClicks}`);
  console.log(`Total impressions (7 days): ${totalImpr}`);
  if (totalImpr > 0) {
    console.log(`Overall CTR: ${((totalClicks / totalImpr) * 100).toFixed(2)}%`);
  }

  const withClicks = data.filter((r) => r.clicks > 0);
  console.log(`Queries with ≥1 click: ${withClicks.length}`);

  console.log("\n== TOP 20 by IMPRESSIONS ==");
  console.log("query | clicks | impr | ctr% | pos");
  data
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)
    .forEach((r) =>
      console.log(
        `${r.query} | ${r.clicks} | ${r.impressions} | ${r.ctr.toFixed(2)} | ${r.position.toFixed(1)}`,
      ),
    );

  console.log("\n== TOP 15 by CLICKS ==");
  data
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 15)
    .forEach((r) =>
      console.log(
        `${r.query} | ${r.clicks} | ${r.impressions} | ${r.ctr.toFixed(2)} | ${r.position.toFixed(1)}`,
      ),
    );

  console.log("\n== TOP-RANKED (pos ≤ 10) WITH ZERO CLICKS ==");
  data
    .filter((r) => r.position <= 10 && r.clicks === 0 && r.impressions >= 3)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)
    .forEach((r) =>
      console.log(
        `${r.query} | impr=${r.impressions} | pos=${r.position.toFixed(1)}`,
      ),
    );

  console.log("\n== PAGE-2 PURGATORY (pos 11-20, high impressions) ==");
  data
    .filter((r) => r.position >= 11 && r.position <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .forEach((r) =>
      console.log(
        `${r.query} | impr=${r.impressions} | pos=${r.position.toFixed(1)}`,
      ),
    );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
