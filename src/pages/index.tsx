import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { COLOR } from "../theme/Color";

import React, { useState } from "react";
import { Router } from "next/router";
import { Diglett } from "../views/atoms/animations/Diglett/Diglett";

const pikachu = require("../../public/images/pikachu.png");

const IndexPage: React.FC<{ router: Router }> = (props) => {
  return (
    <>
      <Flex
        px={4}
        py={{ sm: 32, md: 6, lg: 16, xl: 32 }}
        justifyContent={{ sm: "center", md: "flex-end" }}
        alignItems={"flex-start"}
        //backgroundColor={"green"}
      >
        <Box
          w={{ sm: 300, md: 350, lg: 300, xl: 430 }}
          p={4}
          mr={{ lg: 0, "2xl": 24 }}
          //backgroundColor={"red"}
        >
          <chakra.p
            fontFamily={"Outfit"}
            mb={2}
            fontSize={{ lg: "md", xl: "xl" }}
            fontWeight="semibold"
            letterSpacing="wide"
            color={COLOR.foreground1}
            textTransform="uppercase"
          >
            For Pokelovers
          </chakra.p>
          <chakra.h1
            fontFamily={"Outfit"}
            mb={3}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight="shorter"
            color={useColorModeValue(COLOR.foreground2, COLOR.foreground2_dark)}
          >
            Come in an buy them all
          </chakra.h1>
          <chakra.p mb={5} color={COLOR.white} fontSize={{ md: "lg" }}>
            Every millennial used to collect and trade them via game boy or the
            trading card game. Today you can relive all those good childhood
            memories and create teams of Pokemon out of generation one.
          </chakra.p>
          <HStack>
            <Button
              as="a"
              w={{ base: "full", sm: "auto" }}
              variant="solid"
              color={COLOR.white}
              backgroundColor={COLOR.foreground3}
              size="lg"
              mb={{ base: 2, sm: 0 }}
              cursor="pointer"
              onClick={() => props.router.push("/shop")}
            >
              Go to shop
            </Button>
            <Button
              as="a"
              w={{ base: "full", sm: "auto" }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
              backgroundColor={COLOR.foreground4}
              onClick={() => {
                props.router.replace("https://github.com/Tilmenk");
              }}
            >
              Github link
            </Button>
          </HStack>
        </Box>
      </Flex>
      <Box pos={"absolute"} bottom={0} left={{ sm: 5, lg: 0 }}>
        <Diglett size={500} />
      </Box>
    </>
  );
};

export default IndexPage;
