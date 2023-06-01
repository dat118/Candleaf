"use client";

import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import theme, { createEmotionCache } from "@/assets/material";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const clientSideEmotionCache = createEmotionCache();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            {children}
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
