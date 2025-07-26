/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#48B7FF", // blue-700
          light: "#76C9FF", // blue-500
          dark: "#1E3A8A", // blue-900
        },
        secondary: {
          DEFAULT: "#000000", // blue-700
          dark: "#808080", // blue-500
          light: "#FFFFFF", // blue-900
        },
        tertiary: {
          DEFAULT: '#FF0000', // red
          dark: '#008000',    // green
          light: '#FFFF00',   // yellow
        },
      },
    },
  },
  plugins: [],
};
