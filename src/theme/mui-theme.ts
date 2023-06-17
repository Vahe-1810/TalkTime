import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    neutral: {
      main: "#212121",
      contrastText: "#fff",
    },
    primary: {
      main: "#766ac8",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputProps: {
          sx: {
            color: "white",
            bgcolor: "rgba(0,0,0,0.8)",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            },
            ":focus-within": {
              bgcolor: "rgba(0,0,0,0.5)",
            },
            borderRadius: "15px",
          },
          disableUnderline: true,
        },
        InputLabelProps: {
          sx: {
            color: "#787878",
          },
        },
        variant: "filled",
      },
    },
    MuiTypography: {
      defaultProps: {
        color: "#ffffff",
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "#212121",
        },
      },
    },
    MuiDivider: {
      defaultProps: {
        sx: {
          ":before, :after": {
            background: "#ffffff",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
