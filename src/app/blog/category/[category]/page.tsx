import type { Metadata } from "next";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { BlogCard } from "@/components/content/BlogCard";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import Link from "next/link";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

function formatCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const categoryDescriptions: Record<string, string> = {
  dental:
    "Everything you need to know about financing dental procedures in Australia, from implant costs to payment plan options.",
  fertility:
    "Guides and insights on financing IVF, egg freezing, and other fertility treatments in Australia.",
  cosmetic:
    "Learn about costs and financing options for cosmetic surgery procedures across Australia.",
  "finance-tips":
    "Practical advice on medical loans, credit scores, and getting the best rate for your procedure.",
};

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const name = formatCategory(params.category);
  return {
    title: `${name} Financing Articles`,
    description:
      categoryDescriptions[params.category] ||
      `Articles about ${name.toLowerCase()} financing in Australia.`,
    alternates: { canonical: `/blog/category/${params.category}` },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts = getPostsByCategory(params.category);
  const name = formatCategory(params.category);
  const categories = getAllCategories();

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <BreadcrumbSchema
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: name },
          ]}
        />

        <h1 className="text-hero-h1 text-text-dark mb-4">{name} Financing Articles</h1>
        <p className="text-body text-text-body max-w-2xl mb-10">
          {categoryDescriptions[params.category] ||
            `Articles about ${name.toLowerCase()} financing in Australia.`}
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-primary-wash text-primary hover:bg-primary hover:text-white transition-colors"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                cat === params.category
                  ? "bg-primary text-white"
                  : "bg-primary-wash text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {formatCategory(cat)}
            </Link>
          ))}
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-12">
            No articles in this category yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
