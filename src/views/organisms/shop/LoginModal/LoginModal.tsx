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
  Box,
  chakra,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoginContext } from "../../../../lib/login/LoginProvider";
import { Loading } from "../../../atoms/animations/Loading/Loading";

export const LoginButton = () => {
  const loginContext = useLoginContext();

  //LOGIN OR REGISTER
  const registrating_default = false;
  const [registrating, setRegistrating] = useState(registrating_default);
  const [registratingSuccess, setRegistratingSuccess] =
    useState(registrating_default);

  const handleClick_register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegistratingSuccess(true);
    }, 2000);
  };
  const handleClick_login = () => {
    setLoading(true);
    setLoginError(false);
    setTimeout(() => {
      setLoading(false);
      if (input_mail === "obi-wan") {
        loginContext.setToken("mock_tocken");
      } else {
        setLoginError(true);
      }
    }, 2000);
  };
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // FORMS / INPUTS
  const input_default = "";
  //EMAIL
  const [input_mail, setInput_mail] = useState(input_default);
  const handleInputChange_mail = (e) => setInput_mail(e.target.value);
  const isError_mail = input_mail === "";

  //NAME
  const [input_name, setInput_name] = useState(input_default);
  const handleInputChange_name = (e) => setInput_name(e.target.value);

  // PASSWORD
  const showPassword_default = false;
  const [show, setShow] = React.useState(showPassword_default);
  const [input_pw, setInput_pw] = useState(input_default);
  const handleInputChange_pw = (e) => setInput_pw(e.target.value);
  const handleClick_ShowPw = () => setShow(!show);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
  );

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      setRegistrating(registrating_default);
      setLoginError(false);
      setInput_mail(input_default);
      setInput_name(input_default);
      setInput_pw(input_default);
      setLoading(false);
      setRegistratingSuccess(false);
      setLoginError(false);
    },
  });

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        colorScheme={"teal"}
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
                <Button h="1.75rem" size="sm" onClick={handleClick_ShowPw}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              {registrating ? (
                <FormHelperText>We'll never share your email.</FormHelperText>
              ) : null}
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <VStack alignItems={"flex-end"} w={"100%"}>
              <HStack justifyContent={"flex-end"} w={"100%"}>
                <Box position={"absolute"} left={6}>
                  {loading ? (
                    <Loading size={20} />
                  ) : registrating ? (
                    registratingSuccess ? (
                      <chakra.p color={"green"}> account created! </chakra.p>
                    ) : undefined
                  ) : loginError ? (
                    <chakra.p color={"red"}> invalid credentials </chakra.p>
                  ) : (
                    <Box />
                  )}
                </Box>

                <HStack>
                  {registrating ? (
                    <Button onClick={handleClick_register}>Register</Button>
                  ) : (
                    <Button onClick={handleClick_login}>Login</Button>
                  )}
                  <Button onClick={onClose}>Close</Button>
                </HStack>
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
