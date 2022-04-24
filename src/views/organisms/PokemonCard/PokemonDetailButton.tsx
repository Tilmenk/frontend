import {
  Box,
  Button,
  chakra,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const PokemonDetailButton = () => {
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
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
