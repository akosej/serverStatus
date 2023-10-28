const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#02265B",
        "primary-hover": "hsl(var(--color-primary-hover))",
        secondary: "#fab710",
        "secondary-hover": "#FEC500",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
  },
  plugins: [
    // require("@tailwindcss/typography"),
    require("daisyui"),
    // require("@tailwindcss/forms")({
    //   strategy: "base",
    // }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".primary-ring-shadow": {
          boxShadow:
            "0 0 0 2px #ffffff, 0 0 0 4px hsl(var(--color-primary) / 0.5), 0 1px 2px 0 black",
        },
        ".secondary-ring-shadow": {
          boxShadow:
            "0 0 0 2px #ffffff, 0 0 0 4px hsl(var(--color-secondary) / 0.5), 0 1px 2px 0 black",
        },
      });
    }),
  ],
};
