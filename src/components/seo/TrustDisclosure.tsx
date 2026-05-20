import Link from "next/link";
import { CheckCircle, FileText, ShieldCheck, UserRound } from "lucide-react";
import { getAuthorBySlug } from "@/data/authors";
import {
  FINANCE_ASSUMPTIONS,
  REVIEWER,
  TRUST_DISCLOSURES,
} from "@/data/trust";
import { LastReviewed } from "@/components/seo/LastReviewed";

interface TrustDisclosureProps {
  date?: string;
  authorSlug?: string;
  className?: string;
  compact?: boolean;
}

export function TrustDisclosure({
  date,
  authorSlug,
  className = "",
  compact = false,
}: TrustDisclosureProps) {
  const author = getAuthorBySlug(authorSlug);
  const visibleDisclosures = compact
    ? TRUST_DISCLOSURES.slice(0, 2)
    : TRUST_DISCLOSURES;
  const visibleAssumptions = compact
    ? FINANCE_ASSUMPTIONS.slice(0, 2)
    : FINANCE_ASSUMPTIONS;

  return (
    <aside
      className={`rounded-card border border-border bg-surface p-6 shadow-card ${className}`}
      aria-label="Content review and finance disclosures"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-text-dark">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Reviewed finance content
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-text-body">
            <div className="flex gap-3">
              <UserRound
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p>
                Written by <strong>{author.name}</strong>, {author.role}.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p>
                Reviewed by <strong>{REVIEWER.name}</strong> for finance
                accuracy, lender-fit language and responsible credit framing.
              </p>
            </div>
            <LastReviewed date={date} />
            <Link
              href="/editorial-policy"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Read our editorial policy
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold text-text-dark">
              Finance assumptions
            </h3>
            <ul className="mt-3 space-y-2">
              {visibleAssumptions.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-text-body">
                  <CheckCircle
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-text-dark">
              Important disclosures
            </h3>
            <ul className="mt-3 space-y-2">
              {visibleDisclosures.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-text-body">
                  <CheckCircle
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
