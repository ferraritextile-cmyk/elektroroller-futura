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
        primary: {
          50: '#eefbf5',
          100: '#d6f5e6',
          200: '#b0ead1',
          300: '#7dd9b5',
          400: '#48c194',
          500: '#10a37f',
          600: '#0c6b58',
          700: '#0a5a4a',
          800: '#0b473c',
          900: '#0a3b33',
        },
        ocean: {
          50: '#f0f5ff',
          100: '#dfe8f8',
          200: '#b9cef0',
          300: '#7da8e4',
          400: '#4a85d4',
          500: '#2968be',
          600: '#1a4f9e',
          700: '#163f80',
          800: '#14356a',
          900: '#0f2137',
        },
        premium: {
          navy: '#0f2137',
          navyLight: '#1a3352',
          petrol: '#0c3b2f',
          gold: '#d4940a',
          goldLight: '#f0b429',
        },
        trust: {
          green: '#16a34a',
          blue: '#2563eb',
        },
        'cta-orange': {
          500: '#d4940a',
          600: '#b8800a',
          700: '#9a6b08',
        },
        'cta-green': {
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        },
        cream: '#faf8f5',
        'warm-gray': '#f5f2ed',
      },
      fontSize: {
        'base': '20px',
        'lg': '22px',
        'xl': '26px',
        '2xl': '30px',
        '3xl': '36px',
        '4xl': '44px',
        '5xl': '52px',
        '6xl': '60px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(0,0,0,0.06)',
        'warm-lg': '0 8px 40px rgba(0,0,0,0.08)',
        'warm-xl': '0 12px 60px rgba(0,0,0,0.1)',
        'glow-emerald': '0 0 30px rgba(12, 107, 88, 0.2)',
        'glow-amber': '0 0 30px rgba(212, 148, 10, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
