import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--color-surface-2) / <alpha-value>)",
        cloud: "rgb(var(--color-cloud) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        "amber-solid": "rgb(var(--color-amber-solid) / <alpha-value>)",
        "ink-solid": "rgb(var(--color-ink-solid) / <alpha-value>)",
        signal: "rgb(var(--color-signal) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;