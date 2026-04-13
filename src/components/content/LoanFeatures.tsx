import { CheckCircle2 } from "lucide-react";

const Check = () => (
  <CheckCircle2 className="h-5 w-5 text-success shrink-0" aria-label="Yes" />
);

const featureRows: { label: string; value: string | true }[] = [
  { label: "Maximum loan amount", value: "$100,000" },
  { label: "Minimum loan amount", value: "$2,000" },
  { label: "Loan terms", value: "1 to 7 years" },
  { label: "Repayments weekly, fortnightly or monthly", value: true },
  { label: "Additional repayments allowed", value: true },
  { label: "Online application — no paperwork", value: true },
  { label: "No credit impact to check your rate", value: true },
];

const purposeRows: { label: string }[] = [
  { label: "Medical & cosmetic procedures" },
  { label: "Dental treatment" },
  { label: "IVF & fertility treatment" },
  { label: "Bariatric & weight loss surgery" },
  { label: "Vet bills & pet care" },
  { label: "Debt consolidation" },
];

const feeRows: { label: string; value: string }[] = [
  { label: "Broker fee charged to you", value: "$0" },
  { label: "Ongoing fee", value: "$0" },
  { label: "Early repayment fee", value: "$0 (most lenders)" },
  { label: "Early termination fee", value: "$0 (most lenders)" },
  { label: "Establishment fee", value: "Set by lender" },
];

function FeatureRow({ label, value }: { label: string; value: string | true }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border last:border-0">
      <span className="text-sm text-text-body">{label}</span>
      {value === true ? (
        <Check />
      ) : (
        <span className="text-sm font-semibold text-text-dark text-right">{value}</span>
      )}
    </div>
  );
}

function PurposeRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border last:border-0">
      <span className="text-sm text-text-body">{label}</span>
      <Check />
    </div>
  );
}

function FeeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border last:border-0">
      <span className="text-sm text-text-body">{label}</span>
      <span className="text-sm font-semibold text-text-dark text-right">{value}</span>
    </div>
  );
}

export function LoanFeatures() {
  return (
    <section className="section-padding bg-gradient-to-b from-[#f0f5ff] to-[#e8f0ff]">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-section-h2 text-text-dark mb-4">
            Easy to understand features,<br className="hidden sm:block" /> variables and fees
          </h2>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            We compare 20+ lenders so you get the best deal — here&apos;s what you can expect across our network.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column — Features */}
          <div>
            <h3 className="text-base font-bold text-primary mb-1">Features</h3>
            <div>
              {featureRows.map((row) => (
                <FeatureRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
          </div>

          {/* Right column — Purpose + Fees */}
          <div className="space-y-10">
            <div>
              <h3 className="text-base font-bold text-primary mb-1">Accepted Purpose</h3>
              <div>
                {purposeRows.map((row) => (
                  <PurposeRow key={row.label} label={row.label} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-primary mb-1">Fees</h3>
              <div>
                {feeRows.map((row) => (
                  <FeeRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3">
                Establishment fees and rates vary by lender and credit profile. Your broker will confirm all costs before you accept any offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
