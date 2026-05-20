import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle, FileText } from "lucide-react";
import { InlineLeadForm } from "@/components/lead-capture/InlineLeadForm";
import { Button } from "@/components/ui";

interface SeoLeadCaptureBlockProps {
  defaultProcedure?: string;
  heading?: string;
  intro?: string;
}

export function SeoLeadCaptureBlock({
  defaultProcedure = "other",
  heading = "Compare Your Real Quote",
  intro = "Send through the treatment amount when you are ready. A broker can compare lender options before you commit to a clinic plan, BNPL option or credit card balance.",
}: SeoLeadCaptureBlockProps) {
  const checks = [
    "Soft initial comparison focus",
    "20+ lender panel",
    "Use your preferred provider",
  ];

  return (
    <section className="section-padding bg-primary-wash">
      <div className="container-narrow">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Quote comparison
            </div>
            <h2 className="text-section-h2 text-text-dark">{heading}</h2>
            <p className="mt-4 max-w-2xl text-body text-text-body">{intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {checks.map((item) => (
                <li
                  key={item}
                  className="flex min-h-12 items-center gap-2 rounded-button bg-white px-4 text-sm font-semibold text-text-body shadow-sm"
                >
                  <CheckCircle
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              as={Link}
              href="/calculator"
              variant="secondary"
              className="mt-6 gap-2 bg-white"
            >
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Estimate repayments
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <InlineLeadForm
            defaultProcedure={defaultProcedure}
            heading="Check options for my quote"
          />
        </div>
      </div>
    </section>
  );
}
