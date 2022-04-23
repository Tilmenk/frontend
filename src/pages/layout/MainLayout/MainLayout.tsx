import { Box, Container } from "@chakra-ui/react";
import { FC } from "react";
import Head from "next/head";
import BackgroundDesktop_lg from "../../../../public/backgrounds/desktop/background_lg.svg";
import BackgroundDesktop_md from "../../../../public/backgrounds/desktop/background_md.svg";
import BackgroundMobile from "../../../../public/backgrounds/mobile/background.svg";
import { AppProps } from "next/app";
import { BREAKPOINTNAME } from "../../../theme/Breakpoints";
import { ChooseResponsive } from "../../../lib/responsive/ChooseResponsive";

export type LayoutProps = {
  router: AppProps["router"];
};

export const MainLayout: FC<LayoutProps> = (props) => {
  return (
    <Box as={"main"} h={"100vh"} w={"100%"}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KBE - Frontend</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box
        height={"auto"}
        width={"100%"}
        position={"absolute"}
        zIndex={-1}
        backgroundColor={"green"}
      >
        <ChooseResponsive
          defaultComponent={<BackgroundDesktop_lg />}
          breakpointComponents={{
            [BREAKPOINTNAME.lg]: <BackgroundDesktop_md />,
            [BREAKPOINTNAME.md]: <BackgroundDesktop_md />,
            [BREAKPOINTNAME.sm]: (
              <>
                <BackgroundMobile />
              </>
            ),
          }}
        />
      </Box>
      {props.children}
    </Box>
  );
};
