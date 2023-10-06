/** @type {import('tailwindcss').Config} */
module.exports = {
  /** corePlugins: {
    preflight: false,
  },*/
  important: "#root",
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
};
