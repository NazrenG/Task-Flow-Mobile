/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { blue, green } from "react-native-reanimated/lib/typescript/Colors";

const tintColorLight = "#0a7ea4";
const tintColorDark = "red";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  primary: {
    darkPurple: "rgb(93, 69, 251)",
    navyBlue: "#3c21f7",
    darkViolet:"#403955",
    seafoamGreen: "rgb(0, 236, 204)",
    yellow: "rgb(255, 184, 0)",
    green: "rgb(0, 188, 139)",
    orange: "rgb(239, 127, 90)",
    dark: "#0a7ea4",
  }, 
  secondary:{
    yellow: "#FFBC03",
    lightYellow: "#fbd56f",
    bg_yellow: "#f8ebc5",
    green: "#059669",
    lightGreen: "#34D399",
    bg_green: "#caf8e7",
    violet: "#3C21F7",
    lightViolet: "#7661fd",
    bg_violet: "#c2b8ff",
  }
};
