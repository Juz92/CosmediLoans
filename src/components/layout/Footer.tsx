import Link from "next/link";

const footerColumns = [
  {
    title: "Procedures",
    links: [
      { href: "/procedures/dental-loans", label: "Dental Loans" },
      { href: "/procedures/ivf-financing", label: "IVF Financing" },
      { href: "/procedures/breast-augmentation-loans", label: "Cosmetic Surgery" },
      { href: "/procedures/lasik-loans", label: "LASIK Loans" },
      { href: "/procedures/bariatric-surgery-loans", label: "Bariatric Surgery" },
      { href: "/procedures", label: "View All \u2192" },
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
      { href: "/guides", label: "Guides" },
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
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
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
            CosmodiLoans is a lead generation service that connects consumers with
            licensed finance brokers. We do not provide credit, financial advice, or
            act as a lender. All loan applications are subject to lender assessment
            and approval. Rates and terms vary based on individual circumstances.
          </p>
          <p className="text-xs leading-relaxed">
            [PLACEHOLDER: Credit Representative Number] | [PLACEHOLDER: Australian
            Credit Licence Number] | [PLACEHOLDER: Credit Guide Link]
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} CosmodiLoans. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
