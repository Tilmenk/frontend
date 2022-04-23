import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import Head from "next/head";
import BackgroundDesktop_lg from "../../../../public/backgrounds/desktop/background_lg.svg";
import BackgroundDesktop_lg_dark from "../../../../public/backgrounds/desktop/background_lg_dark.svg";
import BackgroundDesktop_md from "../../../../public/backgrounds/desktop/background_md.svg";
import BackgroundDesktop_md_dark from "../../../../public/backgrounds/desktop/background_md_dark.svg";
import BackgroundMobile from "../../../../public/backgrounds/mobile/background.svg";
import BackgroundMobile_dark from "../../../../public/backgrounds/mobile/background_dark.svg";
import { AppProps } from "next/app";
import { BREAKPOINTNAME } from "../../../theme/Breakpoints";
import { ChooseResponsive } from "../../../lib/responsive/ChooseResponsive";
import { Header } from "../../organisms/Header/Header";
import { COLOR } from "../../../theme/Color";

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
      <Header router={props.router} />
      <Box
        height={"auto"}
        width={"100%"}
        position={"absolute"}
        zIndex={-1}
        backgroundColor={"green"}
      >
        <ChooseResponsive
          defaultComponent={useColorModeValue(
            <BackgroundDesktop_lg />,
            <BackgroundDesktop_lg_dark />
          )}
          breakpointComponents={{
            [BREAKPOINTNAME.lg]: useColorModeValue(
              <BackgroundDesktop_md />,
              <BackgroundDesktop_md_dark />
            ),
            [BREAKPOINTNAME.md]: useColorModeValue(
              <BackgroundDesktop_md />,
              <BackgroundDesktop_md_dark />
            ),
            [BREAKPOINTNAME.sm]: useColorModeValue(
              <BackgroundMobile />,
              <BackgroundMobile_dark />
            ),
          }}
        />
      </Box>
      {props.children}
    </Box>
  );
};
