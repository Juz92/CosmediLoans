import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogCard } from "@/components/content/BlogCard";
import { NewsletterSignup } from "@/components/content/NewsletterSignup";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Financing Insights & Guides",
  description:
    "Expert articles on financing dental, IVF, cosmetic surgery and medical procedures in Australia. Tips, costs, and guides from CosmediLoans.",
  alternates: { canonical: "/blog" },
};

function formatCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-hero-h1 text-text-dark mb-4 text-center">
          Medical Financing Insights & Guides
        </h1>
        <p className="text-body text-text-body text-center max-w-2xl mx-auto mb-10">
          Expert articles to help you make informed decisions about financing your
          medical procedures in Australia.
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${cat}`}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-primary-wash text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {formatCategory(cat)}
            </Link>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.slice(0, 6).map((post) => (
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

        {/* Newsletter */}
        <div className="mb-12">
          <NewsletterSignup />
        </div>

        {/* Remaining posts */}
        {posts.length > 6 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(6).map((post) => (
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
        )}
      </div>
    </div>
  );
}
