/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gold: "#b29155",
      purple: "#E0B0FF",
      black: "#151515",
      grey: "#282828",
      white: "#ffffff",
      red: "#ff0033",
      green: "#198754",
    },
    fontFamily: {
      heading: ["Unbounded", "monospace"],
      sub: ["Inter", "serif"],
      hindi: ["Tiro Devanagari Hindi"],
      space: ["Space Grotesk"],
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.560rem",
      banner: "5.560rem",
    },
    extend: {
      backdropBlur: {
        lg: "200px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
