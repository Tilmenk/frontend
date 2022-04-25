import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Skeleton,
  Img,
} from "@chakra-ui/react";
import {
  CURRENCY,
  returnAsciiCurrencySymbol,
  useCurrency,
} from "../../../lib/currency/CurrencyProvider";
import { PokemonDetailButton } from "./PokemonDetailButton";

export type Pokemon = {
  //properties from microservices
  imageUrl: string;
  costs: {
    [CURRENCY.dollar]: number;
    [CURRENCY.euro]: number;
    [CURRENCY.bitcoin]: number;
  };
  //properties from warehouse
  name: string;
  type1: string;
  type2: string;
  health: number;
  attack: number;
  attack_sp: number;
  defense: number;
  defense_sp: number;
  speed: number;
  legendary: boolean;
};

export const PokemonCard = (props: {
  pokemon?: Pokemon;
  placeholder?: boolean;
}) => {
  const currencyContext = useCurrency();

  const [fetching, setFetching] = useState(false);

  return (
    // @ts-ignore
    <Skeleton isLoaded={!fetching} {...props}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mx="auto"
      >
        <Img
          src={props.pokemon.imageUrl}
          objectFit={"scale-down"}
          bg={props.pokemon.legendary ? "#FFD60A" : "gray.300"}
          h={200}
          w={200}
          rounded="lg"
          boxShadow="dark-lg"
          p="6"
          bgPos="center"
          onLoad={() => setFetching(false)}
        ></Img>
        <Box
          w={{ base: 56, md: 36 }}
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
              {props.pokemon.costs[currencyContext.currencySelected]}
            </chakra.span>

            {/*  <chakra.button
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
          </chakra.button>*/}
            <PokemonDetailButton pokemon={props.pokemon} />
          </Flex>
        </Box>
      </Flex>
    </Skeleton>
  );
};
