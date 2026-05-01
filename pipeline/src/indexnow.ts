import "dotenv/config";

const HOST = "www.cosmediloans.com.au";
const ORIGIN = `https://${HOST}`;
const KEY = "ca43da1cb53a143b66eb0cd4422fd5b0";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

/**
 * IndexNow pings Bing, Yandex, DuckDuckGo, Seznam, Naver. Google does NOT
 * participate, for Google we submit the sitemap via GSC API separately.
 *
 * Bing powers Microsoft Copilot + ChatGPT web search, so IndexNow is the
 * fastest path to AI-search visibility.
 *
 * Reads the live sitemap.xml and submits every URL it finds.
 */

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status}`);
  }
  const xml = await res.text();
  const urls: string[] = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(xml))) {
    urls.push(match[1].trim());
  }
  return urls;
}

async function submitBatch(urls: string[]) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text() };
}

async function main() {
  console.log(`Fetching ${ORIGIN}/sitemap.xml...`);
  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URL(s) in sitemap.`);

  // IndexNow caps at 10,000 URLs per request; we're well under.
  console.log(`Submitting to IndexNow...`);
  const result = await submitBatch(urls);

  console.log(`\nResponse ${result.status}: ${result.text || "(empty body)"}`);

  if (result.status === 200 || result.status === 202) {
    console.log("\nOK: IndexNow accepted the submission.");
    console.log(
      "  Bing/Copilot, Yandex, DuckDuckGo, Seznam, and Naver will re-crawl.",
    );
  } else if (result.status === 422) {
    console.error(
      "\nERROR: 422, key file likely not reachable yet. Deploy first, then re-run.",
    );
    process.exit(1);
  } else {
    console.error("\nERROR: Submission rejected.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
