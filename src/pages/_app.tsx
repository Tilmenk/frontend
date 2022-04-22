import { ChakraProvider } from "@chakra-ui/react";
import { PageLayout } from "../views/layout/PageLayout/PageLayout";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { COLOR, COLORNAME } from "../theme/Color";
import { MediaContextProvider } from "../lib/responsive/Media";
import {useRouter} from "next/router";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      // styles for the `body`
      body: {
        bg: mode(
          COLOR[COLORNAME.background1],
          COLOR[COLORNAME.background1_dark]
        )(props),
        color: "white",
      },
    }),
  },
});

const Website = (props: AppProps) => {

  const { router, pageProps, Component } = props;
  return (
    <ChakraProvider theme={theme}>
      <MediaContextProvider>
        <PageLayout router={router}>
          <Component {...pageProps} router={router} key={router.route} />
        </PageLayout>
      </MediaContextProvider>
    </ChakraProvider>
  );
};

export default Website;
