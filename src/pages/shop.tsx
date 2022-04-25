import {
  Box,
  Center,
  chakra,
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
import { ChooseResponsive } from "../lib/responsive/ChooseResponsive";
import { BREAKPOINT, BREAKPOINTNAME } from "../theme/Breakpoints";
import {
  PokemonProvider,
  usePokemonContext,
} from "../lib/network_data/pokemonProvider/PokemonProvider";
import { PokemonView } from "../views/organisms/shop/PokemonView/PokemonView";
import { TeamProvider } from "../lib/network_data/teamProvider/TeamProvider";
import { TeamView } from "../views/organisms/shop/TeamView/TeamView";

const ShopPage = () => {
  const loginContext = useLoginContext();

  return (
    <PokemonProvider>
      <TeamProvider>
        <ChooseResponsive
          defaultComponent={
            <Center mt={40}>
              <chakra.p fontSize={"xl"}>screen width not supported.</chakra.p>
            </Center>
          }
          breakpointComponents={{
            //TODO: set to xl for prod
            [BREAKPOINTNAME.xl]: (
              <Box
                m={PADDING.lg}
                w={1800}
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
                    <Image
                      src={"/images/spongeboss.png"}
                      height={300}
                      w={300}
                    />
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
            ),
          }}
        />
      </TeamProvider>
    </PokemonProvider>
  );
};

export default ShopPage;
