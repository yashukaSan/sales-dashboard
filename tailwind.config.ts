import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#f0f4ff",
          100: "#dce6fd",
          200: "#b9cdfb",
          300: "#85a9f8",
          400: "#507cf2",
          500: "#2c5be8",
          600: "#1e43cc",
          700: "#1a35a6",
          800: "#1a2f86",
          900: "#1b2d6b",
          950: "#121c46",
        },
        secondary: {
          50:  "#f5f7f5",
          100: "#e8ece7",
          200: "#d1d9d0",
          300: "#adbcab",
          400: "#829880",
          500: "#617a5f",
          600: "#4d614b",
          700: "#3e4f3c",
          800: "#344132",
          900: "#2c372a",
          950: "#161e15",
        },
        neutral: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        accent: {
          amber:  "#b45309",
          teal:   "#0f766e",
          rose:   "#be123c",
          slate:  "#475569",
        },
      },
      fontFamily: {
        sans:    ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono:    ["var(--font-geist-mono)", "ui-monospace"],
        display: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
