import React from "react";
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  Stack,
  SimpleGrid,
  ButtonGroup,
  IconButton,
  Img,
  HStack,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import {
  PokemonTeam,
  PokemonTeamCustom,
  useTeamContext,
} from "../../../../lib/network_data/teamProvider/TeamProvider";
import { usePokemonContext } from "../../../../lib/network_data/pokemonProvider/PokemonProvider";
import { PokemonDetailButton } from "../PokemonCard/PokemonDetailButton";
import {
  getCostsFormatted,
  useCurrencyContext,
} from "../../../../lib/currency/CurrencyProvider";
import { capitalizeFirstLetter } from "../../../../lib/msc/StringMethods";

export const TEAMTABLEVARIANTS = {
  custom: "custom",
  default: "default",
} as const;
export type TeamTableVariant = keyof typeof TEAMTABLEVARIANTS;

export const TeamTable = (props: {
  teams: PokemonTeam[] | PokemonTeamCustom[];
  bgColors: {
    bg: string;
    bg2: string;
    bg3: string;
  };
  variant: TeamTableVariant;
}) => {
  const { bg, bg2, bg3 } = props.bgColors;

  const pokemonContext = usePokemonContext();
  const currencyContext = useCurrencyContext();

  console.log(pokemonContext.getPokemonByName("pikachu"));

  return (
    <Stack
      direction={{ base: "column" }}
      w="full"
      bg={{ md: bg }}
      shadow="lg"
      borderRadius={5}
    >
      <Flex direction={{ base: "row", md: "column" }} bg={bg2} borderRadius={5}>
        <SimpleGrid
          spacingY={3}
          columns={{ base: 1, md: 5 }}
          w={{ base: 120, md: "full" }}
          textTransform="uppercase"
          bg={bg3}
          color={"gray.500"}
          py={{ base: 1, md: 4 }}
          px={{ base: 2, md: 10 }}
          fontSize="md"
          fontWeight="hairline"
          borderRadius={5}
        >
          <span>Name</span>
          <span>Creator</span>
          <span>Members</span>
          <chakra.span textAlign={{ md: "center" }}>Costs</chakra.span>
          <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
        </SimpleGrid>
        {props.teams.map((team) => {
          return (
            <SimpleGrid
              key={team.name + team.pokemon + team.creator}
              spacingY={3}
              columns={{ base: 1, md: 5 }}
              w="full"
              py={2}
              px={10}
              fontWeight="hairline"
            >
              <span>{team.name}</span>
              <chakra.span
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {team.creator ? team.creator : "default"}
              </chakra.span>
              <Flex>
                <HStack>
                  {team.pokemon.map((pokemonName, index) => {
                    const pokemon =
                      pokemonContext.getPokemonByName(pokemonName);
                    return (
                      <PokemonDetailButton
                        pokemon={pokemon}
                        button={
                          <Tooltip label={capitalizeFirstLetter(pokemon.name)}>
                            <IconButton
                              key={index}
                              icon={
                                <Image
                                  src={pokemon.sprites.small}
                                  w={50}
                                  h={50}
                                />
                              }
                              size={"sm"}
                              variant="outline"
                              alignItems={"center"}
                              justifyContent={"center"}
                              aria-label={"pokemon"}
                            />
                          </Tooltip>
                        }
                      />
                    );
                  })}
                </HStack>
              </Flex>
              <Flex justify={{ md: "center" }}>
                {getCostsFormatted(
                  currencyContext.currencySelected,
                  team.pokemon
                    .map(
                      (pokemonName) =>
                        pokemonContext.getPokemonByName(pokemonName).costs[
                          currencyContext.currencySelected
                        ]
                    )
                    .reduce((prev, current) => prev + current)
                )}
              </Flex>

              <Flex justify={{ md: "end" }}>
                <ButtonGroup variant="solid" size="sm" spacing={3}>
                  <IconButton
                    colorScheme="blue"
                    icon={<BsBoxArrowUpRight />}
                    aria-label={"test"}
                  />
                  {props.variant === TEAMTABLEVARIANTS.custom ? (
                    <>
                      <IconButton
                        colorScheme="green"
                        icon={<AiFillEdit />}
                        aria-label={"test"}
                      />
                      <IconButton
                        colorScheme="red"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                        aria-label={"test"}
                      />
                    </>
                  ) : undefined}
                </ButtonGroup>
              </Flex>
            </SimpleGrid>
          );
        })}
      </Flex>
    </Stack>
  );
};
