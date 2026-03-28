import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0b0f19",
          card: "rgba(15, 23, 42, 0.55)",
        },
        accent: {
          cyan: "#22d3ee",
          purple: "#a78bfa",
        },
      },
      backgroundImage: {
        "gradient-accent":
          "linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #6366f1 100%)",
        "grid-pattern":
          "linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(34, 211, 238, 0.35), 0 0 60px -12px rgba(167, 139, 250, 0.25)",
        "glow-sm":
          "0 0 24px -6px rgba(34, 211, 238, 0.3), 0 0 40px -10px rgba(167, 139, 250, 0.2)",
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.88", transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
