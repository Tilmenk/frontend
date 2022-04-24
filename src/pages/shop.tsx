import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  List,
  useColorModeValue,
  VStack,
  Wrap,
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
import {
  Pokemon,
  PokemonCard,
} from "../views/organisms/PokemonCard/PokemonCard";
import { ShopPagination } from "../views/organisms/ShopPagination/ShopPagination";

const mockPokemon: Pokemon[] = [
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Pikachu",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  },
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Squirtle",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    price: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
];

const ShopPage = () => {
  const loginContext = useLoginContext();
  return (
    <Flex
      m={PADDING.lg}
      mb={16}
      bg={useColorModeValue(COLOR.foreground2, "gray.300")}
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
            Please login to see the shop.
          </chakra.h1>
          <Image src={"/images/spongeboss.png"} height={300} w={300} />
          <LoginButton />
        </VStack>
      ) : (
        <VStack>
          <Box my={8} mx={24} w={"100%"} bg={"gray.400"}>
            <Wrap spacing={6}>
              {mockPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </Wrap>
          </Box>
          <ShopPagination />
        </VStack>
      )}
    </Flex>
  );
};

export default ShopPage;
