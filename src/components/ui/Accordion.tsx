"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  className?: string;
}

export function Accordion({ items, type = "multiple", className = "" }: AccordionProps) {
  const rootProps =
    type === "single"
      ? { type: "single" as const, collapsible: true }
      : { type: "multiple" as const };

  return (
    <RadixAccordion.Root {...rootProps} className={className}>
      {items.map((item, i) => (
        <RadixAccordion.Item
          key={i}
          value={`item-${i}`}
          className="border-b border-border"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="flex w-full items-center justify-between py-5 text-left text-base font-semibold text-text-dark hover:text-primary transition-colors group">
              {item.question}
              <ChevronDown className="h-5 w-5 text-text-muted shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="pb-5 text-text-body leading-relaxed">
              {item.answer}
            </div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
