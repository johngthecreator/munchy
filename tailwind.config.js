/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'hand':['"Comic Sans MS"', 'sans-serif']
      },
      boxShadow: {
        'block': '5px 5px 0px 0px #000',
      },
      keyframes: {
        moveAround: {
          '0%, 100%': { top: '20%', left: '20%' },
          '20%': { top: '15%', left: '60%' },
          '40%': { top: '80%', left: '75%' },
          '60%': { top: '60%', left: '40%' },
          '80%': { top: '80%', left: '30%' },
        },
      },
      animation: {
        moveAround: 'moveAround 50s infinite',
      },
    },
  },
  plugins: [],
}
