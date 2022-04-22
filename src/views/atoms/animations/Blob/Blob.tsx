import BlobAnimation from "../../../../assets/shared/animations/blob-2-lottie.json";
import { Box } from "@chakra-ui/react";
import  {useLottie} from "lottie-react";

export const Blob = (props: { size: number }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: BlobAnimation,
  };
  const {View} = useLottie(defaultOptions);
  return (
    <Box pointerEvents={"none"}>
      {View}
    </Box>
  );
};
