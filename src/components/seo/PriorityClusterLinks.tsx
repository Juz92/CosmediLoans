import Link from "next/link";
import { ArrowRight, CheckCircle, Link2 } from "lucide-react";
import type { PrioritySeoCluster } from "@/data/priority-seo-clusters";
import { Badge, Card } from "@/components/ui";

interface PriorityClusterLinksProps {
  cluster: PrioritySeoCluster;
  context?: "procedure" | "guide" | "hub";
}

export function PriorityClusterLinks({
  cluster,
  context = "procedure",
}: PriorityClusterLinksProps) {
  const heading =
    context === "guide"
      ? `Continue the ${cluster.name.toLowerCase()} cluster`
      : `${cluster.name} authority cluster`;

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <Badge className="mb-4" variant="outline">
              <Link2 className="h-4 w-4" aria-hidden="true" />
              Priority SEO cluster
            </Badge>
            <h2 className="text-section-h2 text-text-dark">{heading}</h2>
            <p className="mt-4 max-w-2xl text-body text-text-body">
              These pages are the priority internal-link path for{" "}
              {cluster.primaryQuery}. They should attract links, updates, and
              proof before expanding into more treatment or location pages.
            </p>
          </div>
          <ul className="grid gap-3">
            {cluster.proof.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-text-body">
                <CheckCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cluster.links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card hover className="h-full">
                <div className="flex h-full flex-col justify-between gap-5">
                  <div>
                    <h3 className="text-lg font-bold text-text-dark">
                      {link.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-body">
                      {link.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open page
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
