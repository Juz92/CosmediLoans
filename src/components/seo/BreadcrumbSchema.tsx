import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/site";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: Crumb[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-text-muted">
          {items.map((crumb, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text-body font-medium">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
