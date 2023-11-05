/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        // title: ["Young Serif", ...defaultTheme.fontFamily.serif],
        title: ["Nunito", ...defaultTheme.fontFamily.serif],
      },
      dropShadow: {
        card: ".4rem .4rem 0 #27272a",
        title: "0 0 0 1rem #27272a",
      },
      aspectRatio: {
        card: "4 / 3",
      },
    },
  },
  plugins: [],
};
