/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // include all your app files
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // ✅ include Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // ✅ add Flowbite plugin
  ],
};
