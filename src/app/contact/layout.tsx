import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the CosmediLoans team. We typically respond within 2 business hours. Ask about medical financing, rates, or procedures.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us",
    description:
      "Get in touch with the CosmediLoans team. We typically respond within 2 business hours.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
