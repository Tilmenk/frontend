import { Router } from "next/router";
import {
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  Box,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { FaMoon, FaSun, FaHeart, FaBitcoin, FaShopify } from "react-icons/fa";
import {
  AiFillGithub,
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiFillShop,
} from "react-icons/ai";
import { BiDollar, BiEuro } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import React from "react";
import { useViewportScroll } from "framer-motion";
import { COLOR } from "../../../theme/Color";
import { Diglett } from "../../atoms/animations/Diglett/Diglett";
import { MobileNav } from "./MobileNav";
import {
  CURRENCY,
  CurrencyProvider,
  CurrencyState,
  useCurrency,
} from "../../../lib/currency/CurrencyProvider";

export const Header = (props: {
  router: Router;
  currencyState: CurrencyState;
}) => {
  const currencyContext = useCurrency();

  const mobileNav = useDisclosure();

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  //"gray.800"
  const backgroundColor = useColorModeValue(COLOR.foreground3, "gray.800");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  // @ts-ignore
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const ShopButton = (
    <Button
      ml={2}
      leftIcon={
        <Icon
          as={FaShopify}
          w="5"
          h="5"
          color={useColorModeValue(COLOR.foreground3, "gray.800")}
          mr="2"
        />
      }
      variant="solid"
      onClick={() => props.router.push("/shop")}
      color={useColorModeValue(COLOR.foreground3, "gray.800")}
      backgroundColor={useColorModeValue(COLOR.foreground2, COLOR.foreground1)}
    >
      Shop
    </Button>
  );

  const HomeButton = (
    <Button
      style={{ fontFamily: "Outfit", fontSize: "25px" }}
      leftIcon={<Image src={"/images/pikachu.png"} height={30} w={30} />}
      variant="ghost"
      onClick={() => {
        props.router.replace("/");
      }}
      color={useColorModeValue(COLOR.foreground2, COLOR.foreground1)}
    >
      Home
    </Button>
  );

  return (
    <Box pos="relative" maxW={"100%"}>
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={backgroundColor}
        // borderTop="6px solid"
        // borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex align="center">{HomeButton}</Flex>

            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color={useColorModeValue(COLOR.foreground2, COLOR.foreground1)}
            >
              <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                <Link
                  isExternal
                  aria-label="Go to Choc UI GitHub page"
                  href="https://github.com/Tilmenk"
                >
                  <Icon
                    as={AiFillGithub}
                    display="block"
                    transition="color 0.2s"
                    w="7"
                    h="7"
                    _hover={{ color: "gray.600" }}
                  />
                </Link>
              </HStack>
              <IconButton
                size="md"
                fontSize="2xl"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color={useColorModeValue(COLOR.foreground2, COLOR.foreground1)}
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              <IconButton
                size="md"
                fontSize="3xl"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color={useColorModeValue(COLOR.foreground2, COLOR.foreground1)}
                ml={{ base: "0", md: "3" }}
                onClick={() => {
                  currencyContext.toggleCurrency();
                }}
                icon={
                  currencyContext.currencySelected === CURRENCY.euro ? (
                    <BiEuro />
                  ) : currencyContext.currencySelected === CURRENCY.dollar ? (
                    <BiDollar />
                  ) : (
                    <FaBitcoin />
                  )
                }
              />
              {ShopButton}

              {/* <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />*/}
            </Flex>
          </Flex>
          <MobileNav mobileNav={mobileNav} backgroundColor={backgroundColor} />
        </chakra.div>
      </chakra.header>
      <Box
        pos={"absolute"}
        left={{ sm: 5, lg: -10 }}
        style={{ transform: "rotate(180deg)" }}
      >
        <Diglett size={200} />
      </Box>
    </Box>
  );
};
