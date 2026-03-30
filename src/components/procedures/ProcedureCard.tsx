import Link from "next/link";
import { Card } from "@/components/ui";
import { ArrowRight } from "lucide-react";

interface ProcedureCardProps {
  slug: string;
  icon: string;
  title: string;
  avgCostRange: string;
  rateFrom: string;
}

export function ProcedureCard({
  slug,
  icon,
  title,
  avgCostRange,
  rateFrom,
}: ProcedureCardProps) {
  return (
    <Link href={`/procedures/${slug}`} className="block group">
      <Card hover className="h-full flex flex-col">
        <span className="text-3xl mb-3" role="img" aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-card-h4 text-text-dark mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-muted mb-3">{avgCostRange}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            From {rateFrom} p.a.
          </span>
          <ArrowRight
            className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all"
            aria-hidden="true"
          />
        </div>
      </Card>
    </Link>
  );
}
