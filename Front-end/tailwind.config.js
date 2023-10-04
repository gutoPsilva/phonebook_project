/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spartan: "'League Spartan', sans-serif",
        poppins: "'Poppins', sans-serif",
      },
      colors: {
        "dk-stone": "#262221",
      },
    },
  },
  plugins: [],
};

