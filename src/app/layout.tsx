import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UTMCapture } from "@/components/analytics/UTMCapture";
import { GA4 } from "@/components/analytics/GA4";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, BRAND, LEGAL, SITE_ORIGIN } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CosmediLoans | Medical Procedure Financing Australia",
    template: "%s | CosmediLoans",
  },
  description:
    "Compare rates from 20+ lenders for dental, IVF, cosmetic surgery and any medical procedure. Free broker-matched quotes in 60 seconds.",
  metadataBase: new URL("https://www.cosmediloans.com.au"),
  openGraph: {
    images: [{ url: "/Images/SOCIAL SHARING IMAGE.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Images/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/Images/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/Images/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "FinancialService"],
      "@id": absoluteUrl("/#organization"),
      name: BRAND,
      url: SITE_ORIGIN,
      logo: absoluteUrl("/Images/Logo.png"),
      image: absoluteUrl("/Images/SOCIAL SHARING IMAGE.png"),
      email: LEGAL.email,
      telephone: LEGAL.phone,
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: LEGAL.email,
        telephone: LEGAL.phone,
        areaServed: "AU",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: BRAND,
      url: SITE_ORIGIN,
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <JsonLd data={siteSchema} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:rounded-button focus:shadow-form"
        >
          Skip to main content
        </a>
        <GA4 />
        <UTMCapture />
        <Navbar />
        <main id="main-content" className="pb-20 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
