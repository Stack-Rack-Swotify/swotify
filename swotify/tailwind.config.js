/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Swotify Brand Colors (based on logo)
        swotify: {
          orange: '#F97316',
          'orange-light': '#FDBA74',
          'orange-dark': '#EA580C',
          blue: '#3B82F6',
          'blue-light': '#93C5FD',
          'blue-dark': '#2563EB',
        },
        // UI Colors - Light Mode
        primary: '#1E293B',      // Dark slate for primary text
        secondary: '#475569',    // Medium slate
        muted: '#64748B',        // Light slate
        surface: '#F8FAFC',      // Very light background
        success: '#22C55E',
        warning: '#F97316',      // Using Swotify orange
        error: '#EF4444',
        info: '#3B82F6',         // Using Swotify blue
      },
      backgroundImage: {
        // Swotify Gradients
        'swotify-gradient': 'linear-gradient(135deg, #3B82F6 0%, #F97316 100%)',
        'swotify-gradient-reverse': 'linear-gradient(135deg, #F97316 0%, #3B82F6 100%)',
        'swotify-gradient-soft': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)',
        'swotify-gradient-vertical': 'linear-gradient(180deg, #3B82F6 0%, #F97316 100%)',
      },
      boxShadow: {
        'swotify': '0 4px 20px -5px rgba(59, 130, 246, 0.25), 0 4px 20px -5px rgba(249, 115, 22, 0.25)',
        'swotify-lg': '0 10px 40px -10px rgba(59, 130, 246, 0.3), 0 10px 40px -10px rgba(249, 115, 22, 0.3)',
      },

    },
  },
  plugins: [],
};
