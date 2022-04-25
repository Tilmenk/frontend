import { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/color-mode";

export default function Document() {
  const test = <ColorModeScript initialColorMode={"dark"} />;
  return (
    <Html>
      <Head />
      <body
        style={{ margin: 0, height: "100vh", width: "100vw", maxWidth: "100%" }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
