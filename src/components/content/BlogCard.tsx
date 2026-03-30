import Link from "next/link";
import { Card } from "@/components/ui";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
}

const categoryColors: Record<string, string> = {
  dental: "bg-blue-50 text-blue-700",
  fertility: "bg-pink-50 text-pink-700",
  cosmetic: "bg-purple-50 text-purple-700",
  "finance-tips": "bg-green-50 text-green-700",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
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

export function BlogCard({ slug, title, excerpt, date, readTime, category }: BlogCardProps) {
  return (
    <Card hover className="flex flex-col h-full">
      <div className="mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            categoryColors[category] || "bg-primary-wash text-primary"
          }`}
        >
          {formatCategory(category)}
        </span>
      </div>

      <Link href={`/blog/${slug}`} className="group">
        <h3 className="text-lg font-bold text-text-dark group-hover:text-primary transition-colors mb-3 line-clamp-2">
          {title}
        </h3>
      </Link>

      <p className="text-sm text-text-body mb-4 line-clamp-3 flex-1">{excerpt}</p>

      <div className="flex items-center gap-4 text-xs text-text-muted pt-4 border-t border-border">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {readTime} min read
        </span>
      </div>
    </Card>
  );
}
