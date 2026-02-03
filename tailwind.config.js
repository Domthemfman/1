/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crystal: {
          primary: '#60a5fa',
          secondary: '#a78bfa',
          accent: '#34d399',
        },
      },
    },
  },
  plugins: [],
}
