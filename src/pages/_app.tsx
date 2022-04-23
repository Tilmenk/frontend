import { ChakraProvider, ThemeConfig } from "@chakra-ui/react";
import { MainLayout } from "../views/layout/MainLayout/MainLayout";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { COLOR, COLORNAME } from "../theme/Color";
import { MediaContextProvider } from "../lib/responsive/Media";
import React, { FC, useEffect, useState } from "react";
import { CurrencyProvider } from "../lib/currency/CurrencyProvider";
import { LoginProvider } from "../lib/login/LoginProvider";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      // styles for the `body`
      body: {
        fontFamily: "Outfit",
        bg: mode(
          COLOR[COLORNAME.background1],
          COLOR[COLORNAME.background1_dark]
        )(props),
        color: "white",
      },
    }),
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

const Website = (props: AppProps) => {
  const { router, pageProps, Component } = props;

  return (
    <ChakraProvider theme={theme}>
      <MediaContextProvider>
        <LoginProvider>
          <CurrencyProvider>
            <MainLayout router={router}>
              <Component {...pageProps} router={router} key={router.route} />
            </MainLayout>
          </CurrencyProvider>
        </LoginProvider>
      </MediaContextProvider>
    </ChakraProvider>
  );
};

export default Website;
