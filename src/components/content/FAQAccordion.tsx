import { Accordion } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  /**
   * Emit FAQPage JSON-LD only on a canonical FAQ surface. Commercial page
   * templates should keep visible FAQs without broad repeated structured data.
   */
  emitSchema?: boolean;
}

export function FAQAccordion({
  items,
  className,
  emitSchema = false,
}: FAQAccordionProps) {
  const schemaData = emitSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {schemaData && <JsonLd data={schemaData} />}
      <Accordion items={items} type="single" className={className} />
    </>
  );
}
