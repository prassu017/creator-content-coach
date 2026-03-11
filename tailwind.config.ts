import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#baddfd",
          300: "#7dc2fc",
          400: "#38a3f8",
          500: "#0e87e9",
          600: "#026bc7",
          700: "#0355a1",
          800: "#074985",
          900: "#0c3d6e",
        },
        surface: {
          50: "#fafbfc",
          100: "#f3f5f7",
          200: "#e8ebef",
          300: "#d5dae1",
          400: "#a3adb8",
        },
        ink: {
          900: "#111827",
          700: "#374151",
          500: "#6b7280",
          300: "#9ca3af",
        },
        accent: {
          coral: "#ff6b6b",
          mint: "#51cf66",
          amber: "#fcc419",
          violet: "#845ef7",
        },
      },
      fontFamily: {
        display: ['"DM Sans"', "system-ui", "sans-serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
