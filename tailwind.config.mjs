// tailwind.config.mjs
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0C120C",
        magenta: "#A23B72",
        ashgray: "#C7D6D5",
        ghostwhite: "#ECEBF3",
        lapis: "#336699",
      },
    },
  },
  plugins: [],
};
