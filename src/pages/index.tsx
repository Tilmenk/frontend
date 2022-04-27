import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  useColorModeValue,
  Image,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { COLOR } from "../theme/Color";

import React, { useState } from "react";
import { Router } from "next/router";
import { Diglett } from "../views/atoms/animations/Diglett/Diglett";
import { Greeting } from "../views/organisms/index/Greeting/Greeting";
import { CurrencyState } from "../lib/currency/CurrencyProvider";

const pikachu = require("../../public/images/pikachu.png");

const IndexPage: React.FC<{ router: Router; currencyState: CurrencyState }> = (
  props
) => {
  return (
    <>
      <Flex
        px={{ sm: 6, md: 6, lg: 24, xl: 32 }}
        py={{ sm: 6, md: 6, lg: 16, xl: 32 }}
        justifyContent={{ sm: "center", md: "flex-end" }}
        alignItems={"flex-start"}
        //backgroundColor={"green"}
      >
        <Greeting router={props.router} />
      </Flex>
      <Flex>
        <VStack
          ml={{ sm: 8, md: 16, lg: 16, xl: 32 }}
          alignItems={"flex-start"}
        >
          <chakra.p mb={5} color={COLOR.white} fontSize={{ md: "lg" }}>
            This project was created by <strong>Tilmann Schade</strong> & <br />
            <strong>Henk van der Sloot</strong> for
            <strong>
              <span
                style={{
                  color: useColorModeValue(COLOR.foreground2, "#76B900"),
                }}
              >
                {" "}
                KBE@HTW-Berlin:Ai
              </span>
            </strong>
          </chakra.p>
        </VStack>
      </Flex>
    </>
  );
};

export default IndexPage;
