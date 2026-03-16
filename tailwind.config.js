/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#ec1f81',
        accent: '#00bcd4',
        'bg-light': '#f8f9fa',
        'text-dark': '#08060d',
        'text-muted': '#666666',
      },
    },
  },
  plugins: [],
}