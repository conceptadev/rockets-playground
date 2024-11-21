import createTheme from "@mui/material/styles/createTheme";
import { fontSize, fontWeight, fontVariants } from "./font";
import { PaletteColor, PaletteColorOptions } from "@mui/material/styles";
import { alpha } from "@mui/system";

declare module "@mui/material/styles" {
  interface Palette {
    chipSuccess: PaletteColor;
    chipDefault: PaletteColor;
    chipError: PaletteColor;
    chipInfo: PaletteColor;
    chipWarning: PaletteColor;
    chipOrange: PaletteColor;
    link: PaletteColor;
  }

  interface PaletteOptions {
    chipSuccess?: PaletteColorOptions;
    chipDefault?: PaletteColorOptions;
    chipError?: PaletteColorOptions;
    chipInfo?: PaletteColorOptions;
    chipWarning?: PaletteColorOptions;
    chipOrange?: PaletteColorOptions;
    link?: PaletteColorOptions;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    chipSuccess: true;
    chipDefault: true;
    chipError: true;
    chipInfo: true;
    chipWarning: true;
    chipOrange: true;
  }
}
declare module "@mui/material/Link" {
  interface LinkPropsColorOverrides {
    link: true;
  }
}

const themeColors = createTheme({
  palette: {
    primary: {
      main: "#000",
      dark: "#000",
      light: "#333",
      contrastText: "#8AE501",
    },
    info: {
      main: "#8AE501",
      dark: "#599400",
      light: "#d9ffa1",
    },
    background: {
      default: "#fff",
    },
    chipSuccess: {
      main: "#D1FAE5",
      contrastText: "#1B5E20",
    },
    chipDefault: {
      main: "#EBEBEB",
      contrastText: "#616161",
    },
    chipError: {
      main: "#FEE2E2",
      contrastText: "#C62828",
    },
    chipInfo: {
      main: "#E3F2FD",
      contrastText: "#1565C0",
    },
    chipWarning: {
      main: "#FEF3C7",
      contrastText: "#92400E",
    },
    chipOrange: {
      main: "#FFD2B2",
      contrastText: "#92400E",
    },
    link: {
      main: "#2196F3",
    },
    grey: {
      900: "#191919",
    },
  },
});

export const themeLight = createTheme(themeColors, {
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root.MuiTypography-body1": {
            color: themeColors.palette.grey[700],
            ...fontVariants.body1,
          },
          "& .MuiTypography-caption": {
            ...fontVariants.caption,
          },
          "& .MuiLink-button": {
            color: themeColors.palette.link.main,
            textDecorationColor: themeColors.palette.link.main,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: fontWeight.normal,
        },
        h1: fontVariants.h1,
        h2: fontVariants.h2,
        h3: fontVariants.h3,
        h4: fontVariants.h4,
        h5: { ...fontVariants.h5, fontSize: `${fontSize.h5} !important` }, // Hack to force drawer menu title size
        h6: fontVariants.h6,
        subtitle1: {
          ...fontVariants.subtitle1,
          color: themeColors.palette.grey[700],
        },
        subtitle2: fontVariants.subtitle2,
        body1: fontVariants.body1,
        body2: fontVariants.body2,
        caption: fontVariants.caption,
        overline: fontVariants.overline,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          ...fontVariants.caption,
        },
        root: {
          "& p": {
            color: "black",
            ...fontVariants.body1,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          fontSize: fontSize.caption,
        },
        root: {
          "&.Rockets-MultiSelect-Chip": {
            backgroundColor: alpha(themeColors.palette.info.main, 0.2),
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: themeColors.palette.success.light,
          textDecorationColor: themeColors.palette.success.light,
          "&[disabled]": {
            color: themeColors.palette.action.disabled,
            textDecorationColor: themeColors.palette.action.disabled,
            pointerEvents: "none",
          },
          "&.MuiLink-button": {
            color: themeColors.palette.link.main,
            textDecorationColor: themeColors.palette.link.main,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: themeColors.palette.info.main,
          },
          "&.MuiCheckbox-indeterminate": {
            color: themeColors.palette.info.main,
          },
        },
      },
    },
  },
});
