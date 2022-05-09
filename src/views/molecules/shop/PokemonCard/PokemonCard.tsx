import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Skeleton,
  Img,
  Button,
} from "@chakra-ui/react";
import {
  CURRENCY,
  getCostsFormatted,
  returnAsciiCurrencySymbol,
  useCurrencyContext,
} from "../../../../lib/currency/CurrencyProvider";
import { PokemonDetailButton } from "./PokemonDetailButton";
import { Pokemon } from "../../../../lib/network_data/pokemonProvider/PokemonProvider";
import { BREAKPOINT } from "../../../../theme/Breakpoints";

export const PokemonCard = (props: {
  pokemon?: Pokemon;
  placeholder?: boolean;
}) => {
  const currencyContext = useCurrencyContext();

  const [fetching, setFetching] = useState(false);

  return (
    // @ts-ignore
    <Skeleton isLoaded={!fetching} {...props}>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Img
          src={props.pokemon.imageUrl_large}
          objectFit={"scale-down"}
          bg={props.pokemon.legendary ? "#FFD60A" : "gray.300"}
          h={{ lg: 180, xl: 200 }}
          w={{ lg: 180, xl: 200 }}
          rounded="lg"
          boxShadow="dark-lg"
          p={6}
          bgPos="center"
          onLoad={() => setFetching(false)}
        ></Img>
        <Box
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
            fontSize={{ lg: "sm", xl: "md" }}
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
              fontSize={{ lg: "sm", xl: "md" }}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.200")}
              mr={2}
            >
              {getCostsFormatted(
                currencyContext.currencySelected,
                props.pokemon.costs[currencyContext.currencySelected]
              )}
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
            <PokemonDetailButton
              pokemon={props.pokemon}
              button={
                <Button
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
                  Details
                </Button>
              }
            />
          </Flex>
        </Box>
      </Flex>
    </Skeleton>
  );
};
