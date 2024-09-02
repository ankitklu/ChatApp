/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: "#04a784",
        primaryDense : "#008069",
        background: "#eff2f5"
      }
    },
  },
  plugins: [],
}

