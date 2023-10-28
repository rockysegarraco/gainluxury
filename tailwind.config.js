/** @type {import('tailwindcss').Config} */
module.exports = {
  /** corePlugins: {
    preflight: false,
  },*/
  important: "#root",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-font-inter")],
};
