import {
  Badge,
  Box,
  Button,
  chakra,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  getCostsFormatted,
  returnAsciiCurrencySymbol,
  useCurrencyContext,
} from "../../../../lib/currency/CurrencyProvider";
import { capitalizeFirstLetter } from "../../../../lib/msc/StringMethods";
import { Pokemon } from "../../../../lib/network_data/pokemonProvider/PokemonProvider";

const PokemonTypeToColor = {
  normal: "gray",
  fire: "red",
  water: "blue",
  electric: "yellow",
  grass: "green",
  ice: "blue",
  fighting: "black",
  poison: "purple",
  ground: "orange",
  flying: "white",
  psychic: "yellow",
  bug: "green",
  rock: "orange",
  ghost: "gray",
  dragon: "red",
  dark: "black",
  steel: "teal",
  fairy: "pink",
} as const;

export const PokemonDetailButton = (props: {
  pokemon: Pokemon;
  button: JSX.Element;
}) => {
  const currencyContext = useCurrencyContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      {React.cloneElement(props.button, {
        onClick: () => {
          setOverlay(<OverlayOne />);
          onOpen();
        },
      })}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            <chakra.p> {capitalizeFirstLetter(props.pokemon.name)} </chakra.p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={12}>
            <HStack justifyContent={"space-between"}>
              <VStack alignItems={"flex-start"}>
                <HStack>
                  <chakra.p>type 1:</chakra.p>
                  <Badge colorScheme={PokemonTypeToColor[props.pokemon.type1]}>
                    {props.pokemon.type1}
                  </Badge>
                </HStack>
                <HStack>
                  <chakra.p>type 2:</chakra.p>
                  <Badge colorScheme={PokemonTypeToColor[props.pokemon.type2]}>
                    {props.pokemon.type2}
                  </Badge>
                </HStack>
                <HStack>
                  <chakra.p>health:</chakra.p>
                  <Badge colorScheme={"white"}>{props.pokemon.health}</Badge>
                </HStack>
                <HStack>
                  <chakra.p>attack:</chakra.p>
                  <Badge colorScheme={"white"}>{props.pokemon.attack}</Badge>
                </HStack>
                <HStack>
                  <chakra.p>special attack:</chakra.p>
                  <Badge colorScheme={"white"}>{props.pokemon.attack_sp}</Badge>
                </HStack>
              </VStack>
              <VStack alignItems={"flex-start"}>
                <HStack>
                  <chakra.p>defense:</chakra.p>
                  <Badge colorScheme={"white"}>{props.pokemon.defense}</Badge>
                </HStack>
                <HStack>
                  <chakra.p>special defense:</chakra.p>
                  <Badge colorScheme={"white"}>
                    {props.pokemon.defense_sp}
                  </Badge>
                </HStack>
                <HStack>
                  <chakra.p>speed:</chakra.p>
                  <Badge colorScheme={"white"}>{props.pokemon.speed}</Badge>
                </HStack>
                <HStack>
                  <chakra.p>legendary:</chakra.p>
                  <Badge
                    colorScheme={props.pokemon.legendary ? "yellow" : "white"}
                  >
                    {String(props.pokemon.legendary)}
                  </Badge>
                </HStack>
                <HStack>
                  <chakra.p>costs:</chakra.p>
                  <Badge colorScheme={"white"}>
                    {getCostsFormatted(
                      currencyContext.currencySelected,
                      props.pokemon.costs[currencyContext.currencySelected]
                    )}
                  </Badge>
                </HStack>
              </VStack>
            </HStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
