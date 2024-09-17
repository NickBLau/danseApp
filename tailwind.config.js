/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primarycolor: "#5E2E53",
        purple: "#913693",
        hotPink: "#E856EB",
        pink: "#E1A1E9",
        gray: "#EAEAEA",
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Roboto: ["Roboto, ", "sans-serif"],
        RacingSansOne: ["Racing Sans One", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
