export interface FontSize {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  subtitle1: string;
  subtitle2: string;
  body1: string;
  body2: string;
  caption: string;
  overline: string;
}

export interface FontWeight {
  light: number;
  normal: number;
  semibold: number;
  bold: number;
  extraBold: number;
}

export const fontSize: FontSize = {
  h1: "96px",
  h2: "60px",
  h3: "48px",
  h4: "34px",
  h5: "24px",
  h6: "20px",
  subtitle1: "16px",
  subtitle2: "14px",
  body1: "16px",
  body2: "14px",
  caption: "12px",
  overline: "16px",
};

export const fontWeight: FontWeight = {
  light: 300,
  normal: 400,
  semibold: 500,
  bold: 600,
  extraBold: 700,
};

export const fontVariants = {
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.light,
  },
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.light,
  },
  h3: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.normal,
  },
  h4: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.bold,
  },
  h5: {
    fontSize: fontSize.h5,
    fontWeight: fontWeight.normal,
  },
  h6: {
    fontSize: fontSize.h6,
    fontWeight: fontWeight.semibold,
  },
  subtitle1: {
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeight.normal,
  },
  subtitle2: {
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeight.semibold,
  },
  body1: {
    fontSize: fontSize.body1,
    fontWeight: fontWeight.normal,
  },
  body2: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.normal,
  },
  caption: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.normal,
  },
  overline: {
    fontSize: fontSize.overline,
    fontWeight: fontWeight.normal,
  },
};
