/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#ebdcc5',
          300: '#dec29d',
          400: '#cfa373',
          500: '#c28952',
          600: '#b47345',
          700: '#965a3b',
          800: '#794a34',
          900: '#623d2d',
          dark: '#1a1615',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Outfit', 'Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
