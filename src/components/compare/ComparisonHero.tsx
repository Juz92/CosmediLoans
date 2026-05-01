import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui";
import type { Comparison } from "@/data/comparisons";

interface ComparisonHeroProps {
  comparison: Comparison;
}

export function ComparisonHero({ comparison }: ComparisonHeroProps) {
  const isGeneric = comparison.competitorType === "generic";

  return (
    <section className="bg-gradient-to-br from-primary-wash to-primary-sky section-padding pb-12">
      <div className="container-narrow">
        {/* Breadcrumb */}
        <BreadcrumbSchema
          items={[
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare" },
            { label: comparison.competitorName },
          ]}
        />

        {/* Logo circles */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {isGeneric ? (
            <>
              {/* Generic comparison: icon-style circles */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                CL
              </div>
              <span className="text-2xl font-bold text-text-muted">vs</span>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-lg font-bold shadow-md">
                {comparison.competitorName.split(" ").map((w) => w[0]).join("")}
              </div>
            </>
          ) : (
            <>
              {/* Brand comparison: branded circles */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                CL
              </div>
              <span className="text-2xl font-bold text-text-muted">vs</span>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-lg font-bold shadow-md border border-gray-200">
                {comparison.competitorName.split(" ").map((w) => w[0]).join("")}
              </div>
            </>
          )}
        </div>

        {/* H1 */}
        <h1 className="text-hero-h1 text-text-dark mb-4 text-center">
          {comparison.h1}
        </h1>

        {/* Last reviewed badge */}
        <div className="flex justify-center">
          <Badge variant="outline">
            Last reviewed: {new Date(comparison.lastReviewed).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
        </div>
      </div>
    </section>
  );
}
