import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ["var(--font-p)", "Poppins", "system-ui", "Segoe UI", "Arial", "sans-serif"] },
    colors: { bg: "#EEF3FA", navy: "#2B2F45", ink: "#0F1330", brand: "#E31E24", brandDark: "#C1191F", muted: "#6B7280", line: "#E5E7EB" },
  } },
  plugins: [],
};
export default config;
