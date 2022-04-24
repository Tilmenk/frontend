import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  List,
  Skeleton,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { COLOR } from "../theme/Color";
import { TYPO } from "../theme/Typo";
import { Blob } from "../views/atoms/animations/Blob/Blob";
import { PADDING } from "../theme/LayoutSizes";
import { ChooseResponsive } from "../lib/responsive/ChooseResponsive";
import { BREAKPOINTNAME } from "../theme/Breakpoints";
import { LoginButton } from "../views/organisms/LoginModal/LoginModal";
import React, { useEffect, useState } from "react";
import { useLoginContext } from "../lib/login/LoginProvider";
import {
  Pokemon,
  PokemonCard,
} from "../views/organisms/PokemonCard/PokemonCard";
import { ShopPagination } from "../views/organisms/ShopPagination/ShopPagination";
import { ShopTabs } from "../views/organisms/ShopTabs/ShopTabs";

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
];

const ShopPage = () => {
  const loginContext = useLoginContext();
  return (
    <Box
      m={PADDING.lg}
      py={12}
      bg={useColorModeValue(COLOR.foreground2, "gray.300")}
      height={1200}
      borderRadius={25}
      boxShadow={"lg"}
      justifyContent={"center"}
    >
      <ShopTabs
        tabs={[
          {
            name: "All Pokemon",
            component:
              loginContext.token === undefined ? (
                <VStack mt={20}>
                  <chakra.h1
                    fontFamily={"Outfit"}
                    mb={3}
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    lineHeight="shorter"
                    color={useColorModeValue(
                      COLOR.foreground2,
                      COLOR.background2_dark
                    )}
                  >
                    Please login to see the shop.
                  </chakra.h1>
                  <Image src={"/images/spongeboss.png"} height={300} w={300} />
                  <LoginButton />
                </VStack>
              ) : (
                <Box mx={24} bg={"gray.900"}>
                  <VStack>
                    <Box>
                      <Wrap spacing={6}>
                        {mockPokemon.map((pokemon) => (
                          <PokemonCard key={pokemon.name} pokemon={pokemon} />
                        ))}
                      </Wrap>
                    </Box>
                    <ShopPagination />
                  </VStack>
                </Box>
              ),
          },
          { name: "All Teams", component: <Box h={5} w={5} bg={"green"} /> },
        ]}
      />
    </Box>
  );
};

export default ShopPage;
