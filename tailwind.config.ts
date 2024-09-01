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
        red: "#DC2F2F",
        dark: "#363636",
        gray: "#DBDBDB",
        light: "#F8F8F8",
        "red-hovered": "#DC2F2F70",
      },
      boxShadow: {
        DEFAULT: "4px 4px 10px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        logo: "url('/app/assets/Logo.svg')",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        brightness: {
          '0%, 100%': { filter: 'brightness(0.75)' },
          '50%': { filter: 'brightness(1)' },
        },
      },
      animation: {
        reveal: "reveal 0.5s ease-out forwards",
        brightness: 'brightness 1s infinite',
      },
    },
  },
};
export default config;
