import {
  Box,
  Button,
  chakra,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { COLOR } from "../../../../theme/Color";

import React from "react";
import { Router } from "next/router";

export const Greeting = (props: { router: Router }) => {
  return (
    <Box
      w={{ sm: 300, md: 350, lg: 400, xl: 460 }}
      p={4}
      mr={{ base: 0, lg: 0, "2xl": 24 }}
      //backgroundColor={"green"}
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
        Come in and see Pokemon
      </chakra.h1>
      <chakra.p mb={5} color={COLOR.white} fontSize={{ md: "lg" }}>
        This frontend is connected to a Spring-Boot backend that manages a set
        of Pokémon. In our shop you can create teams of these Pokémon and check
        their stats!
      </chakra.p>
      <HStack>
        {/*<Button
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
        </Button>*/}
        {/* <Button
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
        </Button>*/}
      </HStack>
    </Box>
  );
};
