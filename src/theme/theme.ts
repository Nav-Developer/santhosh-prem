import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0b1020",
      light: "#1a2340",
      dark: "#070a14",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff3b30",
      light: "#ff6a5e",
      dark: "#d62a20",
      contrastText: "#ffffff",
    },
    background: { default: "#0b1020", paper: "#111830" },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.6)" },
  },
});

export default theme;
