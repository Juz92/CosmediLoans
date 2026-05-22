import { FAQAccordion } from "@/components/content/FAQAccordion";
import type { FAQ } from "@/data/procedures";

interface ProcedureFAQProps {
  procedureTitle: string;
  financingTitle?: string;
  treatment?: string;
  heading?: string;
  description?: string;
  faqs: FAQ[];
  emitSchema?: boolean;
}

export function ProcedureFAQ({
  procedureTitle,
  financingTitle,
  treatment,
  heading,
  description,
  faqs,
  emitSchema = false,
}: ProcedureFAQProps) {
  const headingTitle = financingTitle ?? `${procedureTitle} Financing`;
  const treatmentLabel = treatment ?? procedureTitle.toLowerCase();
  const headingText = heading ?? `${headingTitle} FAQ`;
  const descriptionText =
    description ?? `Common questions about financing ${treatmentLabel} in Australia.`;

  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-section-h2 text-text-dark mb-3 text-center">
          {headingText}
        </h2>
        <p className="text-body text-text-body mb-8 text-center max-w-xl mx-auto">
          {descriptionText}
        </p>
        <FAQAccordion items={faqs} emitSchema={emitSchema} />
      </div>
    </section>
  );
}
