module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        purple: {
          100: "#EEEFF7",
          500: "#5564A9",
        },
        yellow: {
          100: "#FEFBF5",
          500: "#F58E1F",
        },
      },
    },
  },
  plugins: [],
};
