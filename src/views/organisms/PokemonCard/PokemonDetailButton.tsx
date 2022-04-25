import {
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

export const PokemonDetailButton = (props: { pokemon: Pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
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
            <chakra.p> {props.pokemon.name} </chakra.p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <VStack></VStack>
              <VStack />
            </HStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
