/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class', // enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // use Inter font
      },
      colors: {
        primary: '#0F172A', // Dark blue/black
        secondary: '#64748B', // Grayish blue
        muted: '#94A3B8', // Lighter grayish blue
        champagne: '#F5D0A9', // Light orange/beige
        success: '#22C55E', // Green
        warning: '#F97316', // Orange
        error: '#E11D48', // Red
        info: '#0EA5E9', // Light blue
      },
    },
  },
  plugins: [],
};
