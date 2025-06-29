/** @type {import('tailwindcss').Config} */
import { Colors } from "./constants/Colors.ts";
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customYellow: "rgb(255,188,3, 0.3)",
        background: "#f9fafe",
        navyBlue: `${Colors.primary.navyBlue}`,
        green: `${Colors.primary.green}`,
        darkPurple: `${Colors.primary.darkPurple}`,
        bg_violet: Colors.secondary.bg_violet,
        bg_green: Colors.secondary.bg_green,
        bg_yellow: Colors.secondary.bg_yellow,
        light_violet: Colors.secondary.lightViolet,
        dark_violet: Colors.primary.darkViolet,
        light_green: Colors.secondary.bg_green,
        light_red: "#FEE9ED",
        light_navy: "#EAEFFF",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
