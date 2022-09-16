/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js"
  ],
  theme: {
    extend: {
      maxHeight: {
        '40vh': '40vh',
        '80vh': '80vh'
      },
      colors: {
        'dark-rgba': 'rgba(12,12,12,0.9)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
