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
        "dk-stone": "#232529",
        "cz-claro": "#313338",
        "cz-escuro": "#1C1C1C",
      },
    },
  },
  plugins: [],
};

