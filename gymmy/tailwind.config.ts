import type { Config } from "tailwindcss";

const config: Config = {
  content: [

    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary-background': '#2B2D38',
      'primary-color': '#dc396c',
    },
  },
  plugins: [],
};
export default config;
