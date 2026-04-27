/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Cabinet Grotesk", "system-ui", "sans-serif"],
        display: ["Cabinet Grotesk", "system-ui", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 25px 90px rgba(7, 10, 16, 0.45)"
      }
    }
  },
  plugins: []
};
