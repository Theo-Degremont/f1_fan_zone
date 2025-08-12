import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées F1 Fan Zone - Thème sombre
        'f1-red': {
          900: '#830F00',
          800: '#C41700', 
          600: '#DA3B23',
          400: '#FF705D',
          200: '#FFB7AD',
        },
        'f1-gray': {
          900: '#000000',
          800: '#1C1C1C',
          700: '#2B2B2B',
          600: '#383838',
          500: '#555555',
          100: '#F2F2F2',
          50: '#FFFFFF',
        },
      },
      fontFamily: {
        'f1': ['Racing Sans One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
