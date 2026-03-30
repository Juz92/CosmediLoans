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
          DEFAULT: "#1e40af",
          light: "#3b82f6",
          wash: "#eff6ff",
        },
        surface: "#ffffff",
        background: "#f8fafc",
        border: "#e2e8f0",
        success: "#22c55e",
        text: {
          dark: "#0f172a",
          body: "#475569",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-h1": ["48px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.5px" }],
        "section-h2": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-h4": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        form: "0 8px 32px rgba(0,0,0,0.08)",
        hover: "0 8px 24px rgba(30,64,175,0.1)",
      },
      borderRadius: {
        card: "16px",
        button: "8px",
      },
      spacing: {
        "section-x": "60px",
        "section-y": "80px",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
