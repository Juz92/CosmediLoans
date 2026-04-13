import Link from "next/link";

const footerColumns = [
  {
    title: "Procedures",
    links: [
      { href: "/procedures/dental-loans", label: "Dental Loans" },
      { href: "/procedures/ivf-financing", label: "IVF Financing" },
      { href: "/procedures/breast-augmentation-loans", label: "Cosmetic Surgery" },
      { href: "/procedures/debt-consolidation", label: "Debt Consolidation" },
      { href: "/procedures/lasik-loans", label: "LASIK Loans" },
      { href: "/procedures", label: "View All \u2192" },
    ],
  },
  {
    title: "Locations",
    links: [
      { href: "/locations/sydney", label: "Sydney" },
      { href: "/locations/melbourne", label: "Melbourne" },
      { href: "/locations/brisbane", label: "Brisbane" },
      { href: "/locations/perth", label: "Perth" },
      { href: "/locations/adelaide", label: "Adelaide" },
      { href: "/locations/gold-coast", label: "Gold Coast" },
      { href: "/locations/canberra", label: "Canberra" },
      { href: "/locations/sunshine-coast", label: "Sunshine Coast" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/calculator", label: "Loan Calculator" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/compare", label: "Compare Options" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-text-dark text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-section-x">
        {/* Brand */}
        <Link href="/" className="inline-block text-[22px] font-bold text-white mb-10">
          Cosmedi<span className="text-primary-light">Loans</span>
        </Link>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {col.title}
              </h2>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm hover:text-white transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance */}
        <div className="border-t border-white/10 pt-8 space-y-4">
          <p className="text-xs leading-relaxed">
            CosmediLoans is a lead generation service that connects consumers with
            licensed finance brokers. We do not provide credit, financial advice, or
            act as a lender. All loan applications are subject to lender assessment
            and approval. Rates and terms vary based on individual circumstances.
          </p>
          <p className="text-xs leading-relaxed">
            ABN 14 693 894 558 &nbsp;&middot;&nbsp; <a href="mailto:cosmediloans@gmail.com" className="hover:text-white transition-colors">cosmediloans@gmail.com</a> &nbsp;&middot;&nbsp; <a href="tel:0422676073" className="hover:text-white transition-colors">0422 676 073</a>
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} CosmediLoans. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
