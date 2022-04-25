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
import { Pokemon } from "./PokemonCard";
import {
  returnAsciiCurrencySymbol,
  useCurrency,
} from "../../../../lib/currency/CurrencyProvider";
import { capitalizeFirstLetter } from "../../../../lib/msc/StringMethods";

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

export const PokemonDetailButton = (props: { pokemon: Pokemon }) => {
  const currencyContext = useCurrency();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        height={6}
        bg="gray.800"
        fontSize="xs"
        fontWeight="bold"
        color="white"
        px={2}
        rounded="lg"
        textTransform="uppercase"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
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
                    {props.pokemon.costs[currencyContext.currencySelected]}{" "}
                    {returnAsciiCurrencySymbol(
                      currencyContext.currencySelected
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
