import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CosmodiLoans | Medical Procedure Financing Australia",
    template: "%s | CosmodiLoans",
  },
  description:
    "Compare rates from 20+ lenders for dental, IVF, cosmetic surgery and any medical procedure. Free broker-matched quotes in 60 seconds.",
  metadataBase: new URL("https://cosmedloans.com.au"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
