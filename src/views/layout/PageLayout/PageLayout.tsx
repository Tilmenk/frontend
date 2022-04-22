import { Box, Container } from "@chakra-ui/react";
import { FC } from "react";
import Head from "next/head";
import BackgroundDesktop from "../../../assets/desktop/background/background1.svg";
import BackgroundDesktop_md from "../../../assets/desktop/background/background_md.svg";
import BackgroundMobile from "../../../assets/mobile/background/background1.svg";
import Background2Mobile from "../../../assets/mobile/background/background2.svg";
import { AppProps } from "next/app";
import { BREAKPOINTNAME } from "../../../theme/Breakpoints";
import { ChooseResponsive } from "../../../lib/responsive/ChooseResponsive";
import { PADDING } from "../../../theme/LayoutSizes";
import { COLOR } from "../../../theme/Color";

export type LayoutProps = {
  router: AppProps["router"];
};

export const PageLayout: FC<LayoutProps> = (props) => {
  return (
    <Box as={"main"}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Henk - Home</title>
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
      <Box height={"auto"} width={"100vw"} position={"absolute"} zIndex={-1}>
        <ChooseResponsive
          defaultComponent={
            <>
              <BackgroundDesktop />
             {/* <Box w={"100%"} h={300} bgColor={COLOR.foreground2} />*/}
              {/*<Background2Desktop />*/}
            </>
          }
          breakpointComponents={{
            [BREAKPOINTNAME.md] : (   <BackgroundDesktop_md />),
            [BREAKPOINTNAME.sm]: (
              <>
                <BackgroundMobile />
                <Box w={"100%"} h={100} bgColor={COLOR.foreground2} />
                <Background2Mobile />
              </>
            ),
          }}
        />
      </Box>
        {props.children}
    </Box>
  );
};
