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
   * Emit FAQPage JSON-LD. Default true. Set false on pages that repeat
   * identical FAQs across many URLs (thin-duplicate schema penalty).
   */
  emitSchema?: boolean;
}

export function FAQAccordion({
  items,
  className,
  emitSchema = true,
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
