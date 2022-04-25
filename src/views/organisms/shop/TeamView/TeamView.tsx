import {
  TeamTable,
  TEAMTABLEVARIANTS,
} from "../../../molecules/shop/TeamTable/TeamTable";
import React from "react";
import { useTeamContext } from "../../../../lib/network_data/teamProvider/TeamProvider";
import { useLoginContext } from "../../../../lib/login/LoginProvider";
import {
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

export const TeamView = () => {
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");

  const teamContext = useTeamContext();
  const loginContext = useLoginContext();

  return (
    <VStack mt={8} px={24} alignItems={"flex-start"}>
      <chakra.p color={"black"}>Default teams</chakra.p>
      <TeamTable
        teams={teamContext.teams.default}
        bgColors={{ bg, bg2, bg3 }}
        variant={TEAMTABLEVARIANTS.default}
      />
      <chakra.p color={"black"}>Your teams</chakra.p>
      <TeamTable
        teams={teamContext.teams.custom}
        bgColors={{ bg, bg2, bg3 }}
        variant={TEAMTABLEVARIANTS.custom}
      />
    </VStack>
  );
};
