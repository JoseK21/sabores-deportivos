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
          "50": "#f2fbf3",
          "100": "#e1f7e3",
          "200": "#c5edc8",
          "300": "#97de9e",
          "400": "#62c66c",
          "500": "#3daa47",
          "600": "#31973b",
          "700": "#276e2e",
          "800": "#235829",
          "900": "#1e4923",
          "950": "#0c2710",
        },
      },
    },
  },
  plugins: [],
};
export default config;
