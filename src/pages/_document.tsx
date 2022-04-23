import { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { theme } from "../theme/Color";

export default function Document() {
  return (
    <Html>
      <Head />
      <body
        style={{ margin: 0, height: "100vh", width: "100vw", maxWidth: "100%" }}
      >
        <ColorModeScript initialColorMode={theme.config.initialColormode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
