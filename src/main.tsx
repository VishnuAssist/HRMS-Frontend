// src/main.tsx
import React from "react";import { HelmetProvider } from "@dr.pogodin/react-helmet";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@mui/material/styles";
import { getAppTheme } from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "./hooks";

// ⭐ This wrapper uses Redux state so theme updates instantly
const ThemeProviderConnected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useAppSelector((s) => s.ui.mode); // LIVE from Redux
  const theme = getAppTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const RootApp = () => (
  <Provider store={store}>
      <HelmetProvider>
    <ThemeProviderConnected>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProviderConnected>
    </HelmetProvider>
  </Provider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<RootApp />);
