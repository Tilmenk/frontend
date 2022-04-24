import React from "react";
import { chakra, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  CURRENCY,
  returnAsciiCurrencySymbol,
  useCurrency,
} from "../../../lib/currency/CurrencyProvider";
import { PokemonDetailButton } from "./PokemonDetailButton";

export type Pokemon = {
  name: string;
  price: {
    [CURRENCY.dollar]: number;
    [CURRENCY.euro]: number;
    [CURRENCY.bitcoin]: number;
  };
  imageUrl: string;
};
export const PokemonCard = (props: { pokemon: Pokemon }) => {
  const currencyContext = useCurrency();
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="sm"
      mx="auto"
    >
      <Box
        bg="gray.300"
        h={64}
        w="full"
        rounded="lg"
        boxShadow="dark-lg"
        p="6"
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPos="center"
        style={{
          backgroundImage: `url(${props.pokemon.imageUrl})`,
        }}
      ></Box>
      <Box
        w={{ base: 56, md: 64 }}
        bg={useColorModeValue("white", "gray.800")}
        mt={-5}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <chakra.h3
          py={2}
          textAlign="center"
          fontWeight="bold"
          textTransform="uppercase"
          color={useColorModeValue("gray.800", "white")}
          letterSpacing={1}
        >
          {props.pokemon.name}
        </chakra.h3>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}
          bg={useColorModeValue("gray.200", "gray.700")}
        >
          <chakra.span
            fontWeight="bold"
            color={useColorModeValue("gray.800", "gray.200")}
          >
            {returnAsciiCurrencySymbol(currencyContext.currencySelected)}
            {props.pokemon.price[currencyContext.currencySelected]}
          </chakra.span>
          <chakra.button
            height={6}
            bg="gray.800"
            fontSize="xs"
            fontWeight="bold"
            color="white"
            px={2}
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: useColorModeValue("gray.700", "gray.600"),
            }}
            _focus={{
              bg: useColorModeValue("gray.700", "gray.600"),
              outline: "none",
            }}
          >
            Add to Team
          </chakra.button>
          <PokemonDetailButton />
        </Flex>
      </Box>
    </Flex>
  );
};
