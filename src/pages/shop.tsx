import {
  Box,
  Center,
  chakra,
  Flex,
  Image,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { COLOR } from "../theme/Color";
import { PADDING } from "../theme/LayoutSizes";
import { LoginButton } from "../views/organisms/shop/LoginModal/LoginModal";
import React, { useEffect, useState } from "react";
import { useLoginContext } from "../lib/login/LoginProvider";
import { ShopTabs } from "../views/organisms/shop/ShopTabs/ShopTabs";
import { BREAKPOINT, BREAKPOINTNAME } from "../theme/Breakpoints";
import {
  PokemonProvider,
  usePokemonContext,
} from "../lib/network_data/pokemonProvider/PokemonProvider";
import { PokemonView } from "../views/organisms/shop/PokemonView/PokemonView";
import { TeamProvider } from "../lib/network_data/teamProvider/TeamProvider";
import { TeamView } from "../views/organisms/shop/TeamView/TeamView";
import { Media } from "../lib/responsive/Media";

const ShopPage = () => {
  const loginContext = useLoginContext();

  const supportedScreenSizeComponent = (
    <Flex
      justifyContent={"center"}
      display={{ base: "none", lg: "flex" }}
      pointerEvents={{ base: "none", lg: "auto" }}
    >
      <Box
        m={PADDING.lg}
        w={{ lg: 1440 - 12 * 2, xl: 1780 }}
        py={12}
        bg={useColorModeValue(COLOR.foreground2, "gray.300")}
        height={1200}
        borderRadius={25}
        boxShadow={"lg"}
        justifyContent={"center"}
      >
        {loginContext.token === undefined ? (
          <VStack mt={20}>
            <chakra.h1
              fontFamily={"Outfit"}
              mb={3}
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              lineHeight="shorter"
              color={useColorModeValue(
                COLOR.foreground2,
                COLOR.background2_dark
              )}
            >
              Please login to see the shop.
            </chakra.h1>
            <Image src={"/images/spongeboss.png"} height={300} w={300} />
            <LoginButton />
          </VStack>
        ) : (
          <ShopTabs
            tabs={[
              {
                name: "Available Pokémon ",
                component: <PokemonView />,
              },
              {
                name: "Teams",
                component: <TeamView />,
              },
            ]}
          />
        )}
      </Box>
    </Flex>
  );

  const unsupportedScreenSizeComponent = (
    <Center mt={40}>
      <chakra.p fontSize={"xl"}>screen width not supported.</chakra.p>
    </Center>
  );

  return (
    <PokemonProvider>
      <TeamProvider>
        {supportedScreenSizeComponent}
        <Media lessThan={BREAKPOINTNAME.lg}>
          {unsupportedScreenSizeComponent}
        </Media>
      </TeamProvider>
    </PokemonProvider>
  );
};

export default ShopPage;
