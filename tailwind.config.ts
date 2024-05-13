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
        'red-hovered': '#DC2F2F',
      },
    },
  },
  plugins: [],
};
export default config;
