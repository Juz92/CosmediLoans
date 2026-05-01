import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0d2b5c",
          light: "#087f8f",
          wash: "#eaf7fb",
          hero: "#f7fdff",
          mist: "#f0f5ff",
          sky: "#e0ecff",
          ice: "#e8f0ff",
          deep: "#1e3a8a",
        },
        surface: "#ffffff",
        background: "#f8fafc",
        border: "#e2e8f0",
        success: "#22c55e",
        text: {
          dark: "#0f172a",
          body: "#475569",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-h1": ["48px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.5px" }],
        "section-h2": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-h4": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        "body": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "small": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        form: "0 8px 32px rgba(0,0,0,0.08)",
        hover: "0 8px 24px rgba(30,64,175,0.1)",
        "brand-soft": "0 18px 42px -30px rgba(13,43,92,0.72)",
        "brand-panel": "0 24px 60px -38px rgba(13,43,92,0.76)",
      },
      backgroundImage: {
        "hero-surface": "linear-gradient(180deg, #f7fdff 0%, #ffffff 72%, #f8fafc 100%)",
      },
      borderRadius: {
        card: "16px",
        button: "8px",
      },
      spacing: {
        "section-x": "60px",
        "section-y": "80px",
        "card": "28px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
