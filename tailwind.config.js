/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17153B', // Darkest (background)
        secondary: '#C8ACD6', // Lighter (text)
        tertiary: "#2E236C", // Dark
        accent: '2E236C', // Accent color
        highlight: '#718096', // Highlight color
        blueish: '#7e9cd6', // Off-white color
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}