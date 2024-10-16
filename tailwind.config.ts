import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";  // NextUI için gerekli plugin

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui(), // NextUI pluginini Tailwind'e dahil ediyoruz
  ],
};

export default config;
