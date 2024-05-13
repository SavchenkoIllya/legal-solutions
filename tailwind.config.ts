import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: '#DC2F2F',
        dark: '#363636',
        gray: '#DBDBDB',
        light: '#F8F8F8',
        "red-hovered": '#DC2F2F70',
      },
      boxShadow: {
        "DEFAULT": "4px 4px 10px rgba(0,0,0,0.1)"
      }
    },
  },
  plugins: [],
};
export default config;
