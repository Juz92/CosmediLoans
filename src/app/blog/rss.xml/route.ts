import { getAllPosts } from "@/lib/blog";
import { SITE_ORIGIN, BRAND } from "@/lib/site";

const BASE_URL = SITE_ORIGIN;

export async function GET() {
  const posts = getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BRAND} Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Medical financing insights, guides, and tips for Australians</description>
    <language>en-au</language>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`).join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
