/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '512': '30rem'
      },
      height :{
        '28' : '28.5rem',
        '73':'45.5rem'
      }
    },
  },
  plugins: [],
}

