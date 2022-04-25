import {
  Box,
  Button,
  chakra,
  Container,
  Divider,
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
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Pikachu",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    type1: "Electro",
    type2: "Ground",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },

  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Squirtle",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    type1: "Electro",
    type2: "Ground",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },
  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    type1: "Electro",
    type2: "Ground",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },
  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur2",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    type1: "Electro",
    type2: "Ground",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },
  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Bulbasaur3",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    type1: "Electro",
    type2: "Ground",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },
  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "Moltres",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/146.svg",
    type1: "Fire",
    type2: "Flying",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: true,
  },
];

const ShopPage = () => {
  const loginContext = useLoginContext();
  const [pageNumber, setPageNumber] = useState(0);
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
        <ShopTabs
          tabs={[
            {
              name: "Available Pokémon ",
              component: (
                <VStack my={4}>
                  <Wrap
                    spacing={4}
                    justify="flex-start"
                    w={1280}
                    h={813}
                    mb={8}
                  >
                    {mockPokemon
                      .slice(pageNumber * 18, pageNumber * 18 + 18)
                      .map((pokemon, index) => (
                        <PokemonCard
                          key={pokemon.name + index}
                          pokemon={pokemon}
                        />
                      ))}
                  </Wrap>
                  <Box shadow={"lg"}>
                    <ShopPagination
                      total={mockPokemon.length}
                      defaultCurrent={1}
                      onChange={(newPage) => setPageNumber(newPage - 1)}
                      current={pageNumber + 1}
                    />
                  </Box>
                </VStack>
              ),
            },
            { name: "Teams", component: <Box h={5} w={5} bg={"green"} /> },
          ]}
        />
      )}
    </Box>
  );
};

export default ShopPage;
