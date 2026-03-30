import Image from "next/image";
import { Badge } from "@/components/ui";
import { HeroLeadForm } from "@/components/lead-capture/HeroLeadForm";
import { DollarSign, Percent, Clock, Shield, Users } from "lucide-react";
import type { Procedure } from "@/data/procedures";

interface ProcedureHeroProps {
  procedure: Procedure;
}

export function ProcedureHero({ procedure }: ProcedureHeroProps) {
  // Map procedure slug to a HeroLeadForm-compatible value
  const procedureFormMap: Record<string, string> = {
    "dental-loans": "dental",
    "veneers-financing": "veneers",
    "invisalign-financing": "invisalign",
    "ivf-financing": "ivf",
    "fertility-treatment-loans": "ivf",
    "breast-augmentation-loans": "breast-augmentation",
    "rhinoplasty-financing": "rhinoplasty",
    "tummy-tuck-loans": "tummy-tuck",
    "liposuction-financing": "liposuction",
    "facelift-financing": "facelift",
    "lasik-loans": "lasik",
    "bariatric-surgery-loans": "bariatric",
    "weight-loss-surgery-loans": "bariatric",
    "hair-transplant-loans": "hair-transplant",
    "orthopedic-surgery-loans": "orthopedic",
    "dermatology-financing": "dermatology",
    "mommy-makeover-financing": "mommy-makeover",
    "medical-loan": "other",
  };

  const defaultProcedure = procedureFormMap[procedure.slug] || "other";

  return (
    <section className="relative bg-gradient-to-br from-primary-wash to-[#e0ecff] section-padding overflow-hidden">
      {/* Hero Background Image */}
      {procedure.heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={procedure.heroImage}
            alt={`${procedure.title} illustration`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f0f5ff]/95 via-[#e0ecff]/90 to-[#e0ecff]/70" />
        </div>
      )}
      <div className="container-narrow relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column — Content */}
          <div>
            <Badge className="mb-4">
              <span aria-hidden="true">{procedure.icon}</span> {procedure.title}
            </Badge>
            <h1 className="text-hero-h1 text-text-dark mb-5">
              {procedure.h1}
            </h1>
            <p className="text-body text-text-body mb-8 max-w-xl leading-relaxed">
              {procedure.heroDescription}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-surface rounded-card p-4 shadow-card text-center">
                <DollarSign className="h-5 w-5 text-primary mx-auto mb-1.5" aria-hidden="true" />
                <p className="text-xs text-text-muted mb-0.5">Avg Cost</p>
                <p className="text-sm font-bold text-text-dark">{procedure.avgCostRange}</p>
              </div>
              <div className="bg-surface rounded-card p-4 shadow-card text-center">
                <Percent className="h-5 w-5 text-primary mx-auto mb-1.5" aria-hidden="true" />
                <p className="text-xs text-text-muted mb-0.5">Rates From</p>
                <p className="text-sm font-bold text-text-dark">{procedure.rateFrom} p.a.</p>
              </div>
              <div className="bg-surface rounded-card p-4 shadow-card text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-1.5" aria-hidden="true" />
                <p className="text-xs text-text-muted mb-0.5">Up To</p>
                <p className="text-sm font-bold text-text-dark">{procedure.maxTerm}</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-text-body">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-success" aria-hidden="true" />
                No credit impact
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-success" aria-hidden="true" />
                20+ lenders
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-success" aria-hidden="true" />
                60-second quotes
              </span>
            </div>
          </div>

          {/* Right Column — Lead Form */}
          <div className="lg:sticky lg:top-24">
            <HeroLeadForm defaultProcedure={defaultProcedure} />
          </div>
        </div>
      </div>
    </section>
  );
}
