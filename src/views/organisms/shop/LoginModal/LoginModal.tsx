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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoginContext } from "../../../../lib/login/LoginProvider";
import { Loading } from "../../../atoms/animations/Loading/Loading";
import axios from "axios";
import { BACKEND_URL } from "../../../../lib/constants/constants";
import { COLOR } from "../../../../theme/Color";

export const LoginButton = (props: { disabled: boolean }) => {
  const loginContext = useLoginContext();

  //LOGIN OR REGISTER
  const registering_default = false;
  const [registering, setRegistering] = useState(registering_default);
  const [registeringError, setRegisteringError] = useState<String | undefined>(
    undefined
  );
  const [registeringSuccess, setRegisteringSuccess] =
    useState(registering_default);

  const handleClick_register = () => {
    setLoading(true);
    setRegisteringSuccess(false);
    setRegisteringError(undefined);

    axios({
      method: "post",
      url: BACKEND_URL + "/user",
      data: {
        email: input_mail,
        firstName: input_name,
        password: input_pw,
      },
    }).then(
      (successResponse) => {
        const { data: payLoad } = successResponse;
        const { message, data } = payLoad;
        if (message != undefined) {
          setRegisteringSuccess(true);
        } else {
        }
        setTimeout(() => setLoading(false), 500);
      },
      (errorResponse) => {
        const { message: responseMessage } = errorResponse?.response?.data;
        setRegisteringError(responseMessage);
        setTimeout(() => setLoading(false), 500);
      }
    );
  };
  const handleClick_login = () => {
    setLoading(true);
    setLoginError(false);
    axios({
      method: "post",
      url: BACKEND_URL + "/login",
      data: {
        email: input_mail,
        password: input_pw,
      },
    }).then(
      (successResponse) => {
        const { data } = successResponse;
        const { access_token } = data;
        if (access_token != undefined) {
          loginContext.setToken(access_token);
          loginContext.setName(input_mail);
        } else {
          setLoginError(true);
        }
        setTimeout(() => setLoading(false), 500);
      },
      (errorResponse) => {
        setLoginError(true);
        setTimeout(() => setLoading(false), 500);
      }
    );
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
  const isError_name = input_name === "";

  // PASSWORD
  const showPassword_default = false;
  const [show, setShow] = React.useState(showPassword_default);
  const [input_pw, setInput_pw] = useState(input_default);
  const handleInputChange_pw = (e) => setInput_pw(e.target.value);
  const handleClick_ShowPw = () => setShow(!show);
  const isError_pw = input_pw === "";

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
  );

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      setRegistering(registering_default);
      setLoginError(false);
      setInput_mail(input_default);
      setInput_name(input_default);
      setInput_pw(input_default);
      setShow(false);
      setLoading(false);
      setRegisteringSuccess(false);
      setLoginError(false);
    },
  });

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        disabled={props.disabled}
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
          <ModalHeader color={useColorModeValue(COLOR.black, COLOR.white)}>
            Please enter {registering ? "register" : " login"} credentials.
          </ModalHeader>
          <ModalCloseButton
            color={useColorModeValue(COLOR.black, COLOR.white)}
          />
          <ModalBody>
            <FormControl
              isRequired={registering}
              color={useColorModeValue(COLOR.black, COLOR.white)}
            >
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={input_mail}
                onChange={handleInputChange_mail}
                color={useColorModeValue(COLOR.black, COLOR.white)}
              />
              {registering ? (
                <FormHelperText>We'll never share your email.</FormHelperText>
              ) : null}
              {registeringError ? (
                <FormErrorMessage>registeringError</FormErrorMessage>
              ) : undefined}
            </FormControl>
            {registering ? (
              <FormControl isRequired={registering}>
                <FormLabel
                  htmlFor="firstName"
                  color={useColorModeValue(COLOR.black, COLOR.white)}
                >
                  First name
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={input_name}
                  onChange={handleInputChange_name}
                  color={useColorModeValue(COLOR.black, COLOR.white)}
                />
                {registering ? (
                  <FormHelperText>We'd like to greet you!</FormHelperText>
                ) : null}
              </FormControl>
            ) : null}
            <InputGroup size="md" mt={2}>
              <Input
                isRequired={registering}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={handleInputChange_pw}
                color={useColorModeValue(COLOR.black, COLOR.white)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick_ShowPw}
                  color={useColorModeValue(COLOR.black, COLOR.white)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              {registering ? (
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
                  ) : registering ? (
                    registeringSuccess ? (
                      <chakra.p color={"green"}> account created! </chakra.p>
                    ) : registeringError ? (
                      <chakra.p color={"red"} w={250}>
                        {registeringError}
                      </chakra.p>
                    ) : undefined
                  ) : loginError ? (
                    <chakra.p color={"red"}> invalid credentials </chakra.p>
                  ) : (
                    <Box />
                  )}
                </Box>

                <HStack>
                  {registering ? (
                    <Button
                      onClick={handleClick_register}
                      disabled={isError_mail || isError_name || isError_pw}
                      color={useColorModeValue(COLOR.black, COLOR.white)}
                    >
                      Register
                    </Button>
                  ) : (
                    <Button
                      onClick={handleClick_login}
                      color={useColorModeValue(COLOR.black, COLOR.white)}
                    >
                      Login
                    </Button>
                  )}
                  <Button
                    onClick={onClose}
                    color={useColorModeValue(COLOR.black, COLOR.white)}
                  >
                    Close
                  </Button>
                </HStack>
              </HStack>
              {registering ? (
                <Button
                  onClick={() => setRegistering(false)}
                  mr={2}
                  variant="link"
                  color={useColorModeValue(COLOR.black, COLOR.white)}
                >
                  back to login
                </Button>
              ) : (
                <Button
                  onClick={() => setRegistering(true)}
                  mr={2}
                  variant="link"
                  color={useColorModeValue(COLOR.black, COLOR.white)}
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
