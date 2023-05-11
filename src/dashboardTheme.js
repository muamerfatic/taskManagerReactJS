import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    purple: {
      main: "#9F4298",
    },
    yellowish: {
      main: "#CFDB31",
    },
    lightPurple: {
      main: "#D1AFD3",
    },
    lightGray: {
      main: "#E6E7E8",
    },

    myFont: {
      main: "#333333",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#9F4298",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
});
export default theme;
