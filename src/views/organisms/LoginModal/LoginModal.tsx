import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoginContext } from "../../../lib/login/LoginProvider";

export const LoginButton = () => {
  const loginContext = useLoginContext();

  //LOGIN OR REGISTER
  const [registrating, setRegistrating] = useState(false);

  //EMAIL
  const [input_mail, setInput_mail] = useState("");
  const handleInputChange_mail = (e) => setInput_mail(e.target.value);
  const isError_mail = input_mail === "";

  //NAME
  const [input_name, setInput_name] = useState("");
  const handleInputChange_name = (e) => setInput_name(e.target.value);

  // PASSWORD
  const [show, setShow] = React.useState(false);

  const [input_pw, setInput_pw] = useState("");
  const handleInputChange_pw = (e) => setInput_pw(e.target.value);

  const handleClick = () => setShow(!show);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        login
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            Please enter {registrating ? "register" : " login"} credentials.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired={registrating}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={input_mail}
                onChange={handleInputChange_mail}
              />
              {registrating ? (
                <FormHelperText>We'll never share your email.</FormHelperText>
              ) : null}
              {isError_mail ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : undefined}
            </FormControl>
            {registrating ? (
              <FormControl isRequired={registrating}>
                <FormLabel htmlFor="firstName">First name</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={input_name}
                  onChange={handleInputChange_name}
                />
                {registrating ? (
                  <FormHelperText>We'd like to greet you!</FormHelperText>
                ) : null}
                {isError_mail ? (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                ) : undefined}
              </FormControl>
            ) : null}
            <InputGroup size="md" mt={2}>
              <Input
                isRequired={registrating}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              {registrating ? (
                <FormHelperText>We'll never share your email.</FormHelperText>
              ) : null}
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <VStack alignItems={"flex-end"}>
              <HStack>
                {registrating ? (
                  <Button onClick={onClose}>Register</Button>
                ) : (
                  <Button onClick={onClose}>Login</Button>
                )}
                <Button onClick={onClose}>Close</Button>
              </HStack>
              {registrating ? (
                <Button
                  onClick={() => setRegistrating(false)}
                  mr={2}
                  variant="link"
                >
                  back to login
                </Button>
              ) : (
                <Button
                  onClick={() => setRegistrating(true)}
                  mr={2}
                  variant="link"
                >
                  no account? register here
                </Button>
              )}
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
