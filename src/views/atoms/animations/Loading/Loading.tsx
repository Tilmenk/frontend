import LoadingLottie from "../../../../../public/animations/loading.json";
import { Box } from "@chakra-ui/react";
import { useLottie } from "lottie-react";

export const Loading = (props: { size: number }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
  };
  const { View } = useLottie(defaultOptions);
  return (
    <Box pointerEvents={"none"} h={props.size} w={props.size}>
      {View}
    </Box>
  );
};
