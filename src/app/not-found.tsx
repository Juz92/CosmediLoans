import Link from "next/link";
import { Search, Home, Stethoscope, Calculator, Mail } from "lucide-react";
import { Card, Button } from "@/components/ui";

const helpfulLinks = [
  {
    href: "/",
    icon: Home,
    title: "Homepage",
    description: "Return to the CosmodiLoans homepage",
  },
  {
    href: "/procedures",
    icon: Stethoscope,
    title: "Procedures",
    description: "Browse procedures we finance",
  },
  {
    href: "/calculator",
    icon: Calculator,
    title: "Loan Calculator",
    description: "Estimate your repayments",
  },
  {
    href: "/contact",
    icon: Mail,
    title: "Contact Us",
    description: "Get in touch with our team",
  },
];

export default function NotFound() {
  return (
    <>
      <section className="section-padding bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] min-h-[50vh] flex items-center">
        <div className="container-narrow text-center">
          <p className="text-6xl font-bold text-primary mb-4">404</p>
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Page Not Found
          </h1>
          <p className="text-body text-text-body max-w-lg mx-auto mb-8">
            Sorry, the page you are looking for does not exist or has been moved.
            Try one of the links below or use our search to find what you need.
          </p>

          {/* Search Suggestion */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex items-center gap-3 p-4 bg-surface rounded-card border border-border">
              <Search
                className="h-5 w-5 text-text-muted shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-text-body text-left">
                Looking for a specific procedure? Visit our{" "}
                <Link
                  href="/procedures"
                  className="text-primary font-semibold hover:underline"
                >
                  procedures page
                </Link>{" "}
                to browse all available options, or check our{" "}
                <Link
                  href="/faq"
                  className="text-primary font-semibold hover:underline"
                >
                  FAQ
                </Link>{" "}
                for answers to common questions.
              </p>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
            {helpfulLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card hover className="h-full text-center">
                  <link.icon
                    className="h-8 w-8 text-primary mx-auto mb-3"
                    aria-hidden="true"
                  />
                  <h2 className="text-sm font-bold text-text-dark mb-1">
                    {link.title}
                  </h2>
                  <p className="text-xs text-text-body">{link.description}</p>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Button as={Link} href="/" size="lg">
              Back to Homepage
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
