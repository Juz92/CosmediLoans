export function PartnerLogos() {
  const lenders = [
    "Pepper Money", "Liberty", "Latitude", "MoneyMe", "Plenti", "Wisr", "SocietyOne", "Now Finance"
  ];

  return (
    <section className="py-12 bg-white border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-section-x">
        <p className="text-sm font-semibold text-text-muted text-center mb-8 uppercase tracking-wide">
          Lenders in Our Network
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {lenders.map((name) => (
            <div
              key={name}
              className="h-10 px-6 bg-background rounded-button flex items-center justify-center"
            >
              <span className="text-sm font-medium text-text-muted">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
