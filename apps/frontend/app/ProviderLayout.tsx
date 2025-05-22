"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/muiTheme";
import { Provider } from "react-redux";
import { store } from "../store/store";

type ProviderLayoutProps = {
  children: React.ReactNode;
};

const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};
export default ProviderLayout;
