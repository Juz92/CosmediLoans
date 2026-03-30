import { Building2, Zap, ShieldCheck, BadgeCheck } from "lucide-react";

const stats = [
  {
    icon: Building2,
    title: "20+ Lenders",
    description: "We shop the market",
  },
  {
    icon: Zap,
    title: "60-Second Quotes",
    description: "Fast pre-approval",
  },
  {
    icon: ShieldCheck,
    title: "No Credit Impact",
    description: "Soft pull only",
  },
  {
    icon: BadgeCheck,
    title: "$50M+ Funded",
    description: "Trusted Australia-wide",
  },
];

export function TrustBar() {
  return (
    <section className="bg-surface border-t border-border">
      <div className="container-narrow px-6 py-8 md:px-section-x md:py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                <stat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">{stat.title}</p>
                <p className="text-xs text-text-muted">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
