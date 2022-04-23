import { Button, CloseButton, useDisclosure, VStack } from "@chakra-ui/react";
import { AiFillHome, AiOutlineInbox } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import React from "react";

export const MobileNav = (props: {
  mobileNav: ReturnType<typeof useDisclosure>;
  backgroundColor: string;
}) => {
  const { mobileNav, backgroundColor } = props;
  return (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={backgroundColor}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<AiOutlineInbox />}
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  );
};
