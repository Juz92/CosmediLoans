import type { ReactNode } from "react";

interface QuickAnswerFact {
  label: string;
  value: string;
}

interface QuickAnswerProps {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  facts?: QuickAnswerFact[];
  variant?: "surface" | "wash";
}

export function QuickAnswer({
  id,
  eyebrow = "Quick answer",
  title,
  children,
  facts = [],
  variant = "surface",
}: QuickAnswerProps) {
  const sectionClass =
    variant === "wash"
      ? "bg-primary-wash border-y border-primary/10"
      : "bg-surface border-y border-border";

  return (
    <section aria-labelledby={id} className={sectionClass}>
      <div className="container-narrow px-6 py-9 md:px-section-x md:py-12">
        <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
          <div className="md:pt-1">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {eyebrow}
            </p>
            <h2
              id={id}
              className="mt-2 text-2xl font-bold leading-tight text-text-dark md:text-[30px]"
            >
              {title}
            </h2>
          </div>

          <div className="max-w-4xl">
            <div className="max-w-[76ch] text-[17px] leading-8 text-text-body">
              {children}
            </div>

            {facts.length > 0 && (
              <dl className="mt-7 grid gap-3 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div
                    key={`${fact.label}-${fact.value}`}
                    className="rounded-button border border-border bg-background px-4 py-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-text-dark">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
