import { createTheme } from "@mui/material/styles";
export default createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    common: {
      black: "#000",
      white: "rgba(255, 255, 255, 1)",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(172, 77, 255, 1)",
      main: "rgba(144, 19, 254, 1)",
      dark: "rgba(99, 0, 185, 1)",
      "contrastText": "rgba(0, 0, 0, 1)"
    },
    secondary: {
      light: "rgba(154, 201, 255, 1)",
      main: "rgba(74, 144, 226, 1)",
      dark: "rgba(0, 0, 255, 1)",
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
    }
  },
});
