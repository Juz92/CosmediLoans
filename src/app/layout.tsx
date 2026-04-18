import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UTMCapture } from "@/components/analytics/UTMCapture";
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
    icon: "/Images/favicon APP ICON.png",
    apple: "/Images/favicon APP ICON.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:rounded-button focus:shadow-form"
        >
          Skip to main content
        </a>
        <UTMCapture />
        <Navbar />
        <main id="main-content" className="pb-20 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
