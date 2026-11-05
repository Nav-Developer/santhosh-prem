import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0a0a0a",
      light: "#1a1a1a",
      dark: "#050505",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c6ff00",
      light: "#d9ff4d",
      dark: "#9be000",
      contrastText: "#000000",
    },
    background: {
      default: "#0a0a0a",
      paper: "#111111",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.6)",
    },
  },
});

export default theme;
