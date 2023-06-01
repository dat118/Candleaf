const white = "#FFFFFF";
const black = "#272727";

type TPalette = Record<string, any> & { mode: "light" | "dark" };

const palette: TPalette = {
  mode: "light",
  common: {
    black,
    white,
  },
  primary: {
    main: "#56B280",
    light:
      "linear-gradient(90.04deg, rgba(86, 178, 128, 0.2) 0.04%, rgba(86, 178, 128, 0.4) 97.95%);",
    contrastText: white,
  },
  grey: {
    50: "#D6D6D6",
    100: "#898989",
    200: "#A8A8A8",
    300: "#818181",
  },
  text: {
    primary: black,
    secondary: "#56B280",
    disabled: black,
    icon: "",
  },
  background: {
    default: "rgba(86, 178, 128, 0.1);",
  },
  action: {},
  gradient: {},
  shadow: {
    disabled: "#565861",
    primary: "#2D49A0",
    secondary: "#8E5D24",
  },
};

export default palette;
