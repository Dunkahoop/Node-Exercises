import { createTheme } from "@mui/material/styles";
export default createTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(168, 255, 251, 1)",
      main: "rgba(18, 226, 226, 1)",
      dark: "rgba(48, 159, 159, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    secondary: {
      light: "rgba(116, 129, 255, 1)",
      main: "rgba(0, 40, 245, 1)",
      dark: "rgba(17, 27, 197, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
