import { createTheme } from "@mui/material";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import createCache from "@emotion/cache";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
});

// Refer link: https://mui.com/material-ui/guides/interoperability/#css-injection-order
const createEmotionCache = () =>
  createCache({
    key: "css",
    prepend: true,
  });

export default theme;
export { palette, typography, breakpoints, createEmotionCache };
