import { FAQAccordion } from "@/components/content/FAQAccordion";
import type { FAQ } from "@/data/procedures";

interface ProcedureFAQProps {
  procedureTitle: string;
  faqs: FAQ[];
  emitSchema?: boolean;
}

export function ProcedureFAQ({
  procedureTitle,
  faqs,
  emitSchema = true,
}: ProcedureFAQProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-section-h2 text-text-dark mb-3 text-center">
          {procedureTitle} Financing FAQ
        </h2>
        <p className="text-body text-text-body mb-8 text-center max-w-xl mx-auto">
          Common questions about financing {procedureTitle.toLowerCase()} in Australia.
        </p>
        <FAQAccordion items={faqs} emitSchema={emitSchema} />
      </div>
    </section>
  );
}
