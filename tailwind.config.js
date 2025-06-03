/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        'fade-in-out': 'fadeInOut 2s ease-in-out forwards'
      }
    },
  },
  plugins: [],
};