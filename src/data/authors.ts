import { absoluteUrl } from "@/lib/site";

export interface Author {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  /** Absolute URLs to verified external profiles (LinkedIn, ABN lookup, etc.). */
  sameAs?: string[];
}

export const authors: Author[] = [
  {
    slug: "justin-hilliard",
    name: "Justin Hilliard",
    role: "Finance Broker and Founder",
    credentials:
      "Australian Credit Representative, AFCA member, medical-finance specialist",
    bio: "Justin is the founder of CosmediLoans and a practising Australian finance broker specialising in medical procedure financing. He has written loans for dental, IVF, cosmetic, orthopaedic, and veterinary treatments across every state and works directly with the 20+ lenders on the CosmediLoans panel to source the lowest eligible rate for each patient.",
  },
];

export const DEFAULT_AUTHOR_SLUG = "justin-hilliard";

export function getAuthorBySlug(slug: string | undefined): Author {
  return (
    authors.find((a) => a.slug === slug) ??
    authors.find((a) => a.slug === DEFAULT_AUTHOR_SLUG) ??
    authors[0]
  );
}

/**
 * Build schema.org Person payload for use in Article author fields.
 */
export function authorPersonSchema(author: Author) {
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.credentials,
    url: absoluteUrl(`/about#author-${author.slug}`),
    ...(author.sameAs && author.sameAs.length > 0
      ? { sameAs: author.sameAs }
      : {}),
  };
}
