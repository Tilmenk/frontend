import React, { useState } from "react";
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
  Box,
  Center,
  Divider,
} from "@chakra-ui/react";
import { RiAddFill, RiMoreFill } from "react-icons/ri";
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
import { AddTeamModal } from "./AddTeamModal";
import { Loading } from "../../../atoms/animations/Loading/Loading";
import axios from "axios";
import { useLoginContext } from "../../../../lib/login/LoginProvider";
import { BACKEND_URL } from "../../../../lib/constants/constants";

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
  isCustomTeams?: boolean;
}) => {
  const loginContext = useLoginContext();

  const { isCustomTeams } = props;

  const { bg, bg2, bg3 } = props.bgColors;

  const teamContext = useTeamContext();
  const pokemonContext = usePokemonContext();
  const currencyContext = useCurrencyContext();

  const [deleteLoading, setDeleteLoading] = useState(
    Object.fromEntries(props.teams.map((team, index) => [team.name, false]))
  );

  const deleteTeam = (index: number, teamName: string, teamId: number) => {
    setDeleteLoading({ ...deleteLoading, [teamName]: true });
    console.log(teamId);

    axios({
      headers: { Authorization: `Bearer ${loginContext.token}` },
      method: "delete",
      url: BACKEND_URL + `/team/${teamId}`,
    }).then(
      (successResponse) => {
        setDeleteLoading({ ...deleteLoading, [teamName]: false });
        teamContext.fetchTeams();
      },
      (errorResponse) => {
        setDeleteLoading({ ...deleteLoading, [teamName]: false });
      }
    );
    /* if (isCustomTeams) {
      setTimeout(() => {
        const tempTeam = teamContext.teams.custom;
        tempTeam.splice(index, 1);
        teamContext.setTeams({
          ...teamContext.teams,
          custom: [...tempTeam],
        });
        setDeleteLoading({ ...deleteLoading, [teamName]: false });
      }, 1000);
    }*/
  };

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
          <chakra.span textAlign={{ lg: "right", xl: "center" }}>
            Costs
          </chakra.span>
          <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
        </SimpleGrid>
        {props.teams.map((team, teamIndex) => {
          return (
            <SimpleGrid
              key={team.name + team.pokemon + team.creator}
              spacingY={3}
              columns={{ base: 1, md: 5 }}
              w="full"
              py={2}
              px={10}
              fontWeight="hairline"
              alignItems={"center"}
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
                        key={pokemonName + index}
                        pokemon={pokemon}
                        button={
                          <IconButton
                            key={pokemonName}
                            icon={
                              <Tooltip
                                label={capitalizeFirstLetter(pokemon.name)}
                              >
                                <Image
                                  src={pokemon.imageUrl_small}
                                  boxSize={55}
                                  objectFit="cover"
                                />
                              </Tooltip>
                            }
                            size={"md"}
                            variant="outline"
                            alignItems={"center"}
                            justifyContent={"center"}
                            aria-label={"pokemon"}
                          />
                        }
                      />
                    );
                  })}
                </HStack>
              </Flex>
              <chakra.span textAlign={{ md: "right", xl: "center" }}>
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
              </chakra.span>

              <Flex justify={{ md: "end" }}>
                <ButtonGroup variant="solid" size="sm" spacing={3}>
                  {props.variant === TEAMTABLEVARIANTS.custom ? (
                    <>
                      {/* <IconButton
                        colorScheme="green"
                        icon={<AiFillEdit />}
                        aria-label={"test"}
                      />*/}
                      {deleteLoading[team.name] ? (
                        <Loading size={10} />
                      ) : (
                        <IconButton
                          colorScheme="red"
                          variant="outline"
                          icon={<BsFillTrashFill />}
                          aria-label={"test"}
                          onClick={() =>
                            deleteTeam(teamIndex, team.name, team.id)
                          }
                        />
                      )}
                    </>
                  ) : undefined}
                  {/* <IconButton
                    colorScheme="blue"
                    icon={<RiMoreFill />}
                    aria-label={"test"}
                  />*/}
                </ButtonGroup>
              </Flex>
            </SimpleGrid>
          );
        })}
        {isCustomTeams ? (
          <>
            <Divider />
            <Center w="full" py={2} px={10}>
              <AddTeamModal
                button={
                  <Button rightIcon={<RiAddFill />} size={"md"} w={70}>
                    add
                  </Button>
                }
              />
            </Center>
          </>
        ) : null}
      </Flex>
    </Stack>
  );
};
