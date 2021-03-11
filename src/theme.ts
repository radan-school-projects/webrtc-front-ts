import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

declare module "@material-ui/core/styles/createPalette" {
  // eslint-disable-next-line no-unused-vars
  interface Palette {
    openTitle: React.CSSProperties["color"];
    protectedTitle: React.CSSProperties["color"];
    // type: "light" | "dark";
  }
  // eslint-disable-next-line no-unused-vars
  interface PaletteOptions {
    openTitle: React.CSSProperties["color"];
    protectedTitle: React.CSSProperties["color"];
    // type: "light" | "dark";
  }
}

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'Open Sans'", "sans-serif"].join(","),
    // fontFamily: ["Pacifico", "cursive"].join(","),
  },
  palette: {
    primary: {
      light: "#5c67a3",
      main: "#3f4771",
      dark: "#2e355b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000",
    },
    openTitle: "#3f4771",
    protectedTitle: pink["400"],
    error: {
      light: "#FDECEA",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    // type: "light",
  },
});

export default theme;
