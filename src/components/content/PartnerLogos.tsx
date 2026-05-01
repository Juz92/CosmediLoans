const lenders = [
  "Pepper Money",
  "Liberty",
  "Latitude",
  "MoneyMe",
  "Plenti",
  "Wisr",
  "SocietyOne",
  "Now Finance",
];

export function PartnerLogos() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="container-narrow px-6 py-10 md:px-section-x md:py-12">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Lender panel
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-text-dark">
              Broker-led comparison, not a single-provider offer
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              Your broker can compare lender fit, rate, fees, and repayment term
              before you choose an option.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {lenders.map((name) => (
              <div
                key={name}
                className="inline-flex min-h-11 items-center rounded-button border border-border bg-background px-4"
              >
                <span className="text-sm font-semibold text-text-body">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
