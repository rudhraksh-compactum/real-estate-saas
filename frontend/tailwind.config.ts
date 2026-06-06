import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Dark Theme - Goodwood inspired
        ivory: {
          DEFAULT: '#F5F3EF',
          50: '#FDFCF9',
          100: '#F5F3EF',
          200: '#E8E4DC',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#2A2A2A',
          100: '#333333',
          200: '#404040',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
        gold: {
          DEFAULT: '#C9A962',
          light: '#D4B978',
          dark: '#A68B4B',
        },
        forest: {
          DEFAULT: '#1E3A2F',
          light: '#2A4A3F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      letterSpacing: {
        widest: '0.2em',
      },
 },
  },
  plugins: [],
};

export default config;
