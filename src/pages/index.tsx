import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { COLOR } from "../theme/Color";

import React, { useState } from "react";
import { Router } from "next/router";
import { Diglett } from "../views/atoms/animations/Diglett/Diglett";
import { Greeting } from "../views/organisms/Greeting/Greeting";

const pikachu = require("../../public/images/pikachu.png");

const IndexPage: React.FC<{ router: Router }> = (props) => {
  return (
    <>
      <Flex
        px={4}
        py={{ sm: 32, md: 6, lg: 16, xl: 32 }}
        justifyContent={{ sm: "center", md: "flex-end" }}
        alignItems={"flex-start"}
        //backgroundColor={"green"}
      >
        <Greeting router={props.router} />
      </Flex>
    </>
  );
};

export default IndexPage;
