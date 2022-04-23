import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { COLOR } from "../theme/Color";
import { Text } from "../views/atoms/Text/Text";
import { TYPO } from "../theme/Typo";
import { Blob } from "../views/atoms/animations/Blob/Blob";
import { PADDING } from "../theme/LayoutSizes";
import { ChooseResponsive } from "../lib/responsive/ChooseResponsive";
import { BREAKPOINTNAME } from "../theme/Breakpoints";
import { LoginButton } from "../views/organisms/LoginModal/LoginModal";
import React, { useState } from "react";
import { useLoginContext } from "../lib/login/LoginProvider";

const ShopPage = () => {
  const loginContext = useLoginContext();
  console.log(loginContext);
  return (
    <Flex
      m={PADDING.lg}
      mb={16}
      bg={useColorModeValue(COLOR.foreground2, COLOR.foreground1_dark)}
      height={"90%"}
      borderRadius={25}
      boxShadow={"lg"}
      justifyContent={"center"}
    >
      {loginContext.token === undefined ? (
        <VStack mt={20}>
          <chakra.h1
            fontFamily={"Outfit"}
            mb={3}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight="shorter"
            color={useColorModeValue(COLOR.foreground2, COLOR.background2_dark)}
          >
            You're not logged in!
          </chakra.h1>
          <Image src={"/images/spongeboss.png"} height={300} w={300} />
          <LoginButton />
        </VStack>
      ) : undefined}
    </Flex>
  );
};

export default ShopPage;
