import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug, getPostsByCategory } from "@/lib/blog";
import { absoluteUrl, BRAND, SITE_ORIGIN } from "@/lib/site";
import { authorPersonSchema, getAuthorBySlug } from "@/data/authors";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogCard } from "@/components/content/BlogCard";
import { Button } from "@/components/ui";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.author);

  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          dateModified: post.date,
          description: post.excerpt,
          author: authorPersonSchema(author),
          publisher: {
            "@type": "Organization",
            name: BRAND,
            url: SITE_ORIGIN,
          },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />

      <article className="section-padding">
        <div className="container-narrow max-w-3xl">
          {/* Breadcrumb */}
          <BreadcrumbSchema
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: formatCategory(post.category), href: `/blog/category/${post.category}` },
              { label: post.title },
            ]}
          />

          {/* Header */}
          <header className="mb-10">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-wash text-primary mb-4"
            >
              {formatCategory(post.category)}
            </span>
            <h1 className="text-hero-h1 text-text-dark mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                By <span className="font-semibold text-text-body">{author.name}</span>
                <span className="text-text-muted/80">· {author.role}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Body */}
          <div className="prose prose-lg max-w-none text-text-body leading-relaxed space-y-6">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-text-dark mt-10 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-bold text-text-dark mt-8 mb-3">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.trim()) {
                return <p key={i}>{paragraph}</p>;
              }
              return null;
            })}
          </div>

          {/* Author bio */}
          <aside
            id={`author-${author.slug}`}
            className="mt-12 p-5 bg-background rounded-card border border-border"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              About the author
            </p>
            <p className="text-sm font-semibold text-text-dark mb-1">
              {author.name}, {author.role}
            </p>
            <p className="text-xs text-text-muted mb-3">{author.credentials}</p>
            <p className="text-sm text-text-body leading-relaxed">
              {author.bio}
            </p>
          </aside>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-background rounded-button border border-border">
            <p className="text-xs text-text-muted">
              This article is for informational purposes only and does not
              constitute financial advice. CosmediLoans is a lead generation
              service, not a credit provider.
            </p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <h2 className="text-section-h2 text-text-dark mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((rp) => (
                <BlogCard
                  key={rp.slug}
                  slug={rp.slug}
                  title={rp.title}
                  excerpt={rp.excerpt}
                  date={rp.date}
                  readTime={rp.readTime}
                  category={rp.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-light text-center">
        <div className="container-narrow">
          <h2 className="text-section-h2 text-white mb-4">
            Ready to Explore Your Financing Options?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Compare rates from 20+ lenders in 60 seconds. Free, no obligation, no
            credit impact.
          </p>
          <Button
            as={Link}
            href="/apply"
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Get Your Rate <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </>
  );
}
