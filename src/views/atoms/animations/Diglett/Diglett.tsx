import DiglettAnimation from "../../../../../public/animations/19225-diglett.json";
import { Box } from "@chakra-ui/react";
import { useLottie } from "lottie-react";

export const Diglett = (props: { size: number }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: DiglettAnimation,
  };
  const { View } = useLottie(defaultOptions);
  return <Box pointerEvents={"none"}>{View}</Box>;
};
