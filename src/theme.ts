export type Mode = "light" | "dark";

export const lightTheme = {
  mode: "light" as Mode,
  colors: {
    grey: "#202020",
    magnolia: "#F6F2FF",
    periwinkle: "#DCCCFf",
    background: "#ffffff",
    text: "#202020",
  },
};

export const darkTheme = {
  mode: "dark" as Mode,
  colors: {
    grey: "#202020",
    magnolia: "#F6F2FF",
    periwinkle: "#DCCCFf",
    background: "#202020",
    text: "#ffffff",
  },
};

export type Theme = typeof lightTheme;
