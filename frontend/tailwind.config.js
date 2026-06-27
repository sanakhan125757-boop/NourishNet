/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // Emerald 500
        secondary: "#047857", // Emerald 700
        dark: "#1f2937", // Gray 800
        light: "#f3f4f6", // Gray 100
      }
    },
  },
  plugins: [],
}
