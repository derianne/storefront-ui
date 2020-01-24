// Theme
const breakpoints = ["320px", "768px", "1024px", "1600px"];
breakpoints.xs = breakpoints[0];
breakpoints.md = breakpoints[0];
breakpoints.lg = breakpoints[0];
breakpoints.xl = breakpoints[0];

const theme = {
  colors: {
    black: "#2E4557",
    white: "#fff",
    primary: "blue",
    blue: "#007ce0",
    navy: "#004175",

    mono50: "#fafafa",
    mono100: "#f5f5f5",
    mono200: "#eeeeee",
    mono300: "#e0e0e0",
    mono400: "#bdbdbd",
    mono500: "#9e9e9e",
    mono600: "#757575",
    mono700: "#616161",
    mono800: "#424242",
    mono900: "#212121",
    mono1000: "#000000"
  },
  typography: {
    body: {
      fontSize: 16,
      fontFamily: "sans-serif",
      lineHeight: 1.2
    },
    body2: {
      fontSize: 14,
      fontFamily: "sans-serif",
      lineHeight: 1.2
    },
    label: {
      fontSize: 13,
      fontFamily: "sans-serif",
      lineHeight: 1,
      fontWeight: 600,
      textTransform: "uppercase"
    },
    heading: {
      fontSize: 28,
      fontFamily: "serif"
    }
  },
  space: [0, 4, 8, 16, 32, 64],
  breakpoints
};

export default theme;
