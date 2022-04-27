import {
  Badge,
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  getCostsFormatted,
  returnAsciiCurrencySymbol,
  useCurrencyContext,
} from "../../../../lib/currency/CurrencyProvider";
import { capitalizeFirstLetter } from "../../../../lib/msc/StringMethods";
import {
  Pokemon,
  usePokemonContext,
} from "../../../../lib/network_data/pokemonProvider/PokemonProvider";
import Select from "react-select";
import { camelCaseAttributes } from "framer-motion/types/render/svg/utils/camel-case-attrs";
import { Loading } from "../../../atoms/animations/Loading/Loading";
import { useTeamContext } from "../../../../lib/network_data/teamProvider/TeamProvider";
import { useLoginContext } from "../../../../lib/login/LoginProvider";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : "black",
  }),
  control: (provided, state) => ({
    ...provided,
    width: 200,
  }),
};

export const AddTeamModal = (props: { button: JSX.Element }) => {
  const currencyContext = useCurrencyContext();
  const pokemonContext = usePokemonContext();
  const teamContext = useTeamContext();
  const loginContext = useLoginContext();

  const [loading, setLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const initialSelectedPokemon = {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
  };

  const [selectedPokemonState, setSelectedPokemonState] = useState(
    initialSelectedPokemon
  );

  const setPokemonAtIndex = (index: number, pokemonName: string) => {
    setSelectedPokemonState({ ...selectedPokemonState, [index]: pokemonName });
  };

  const createTeam = () => {
    setCreateError("");

    console.log(input_name);
    if (teamContext.teams.custom.find((team) => team.name === input_name)) {
      console.log("filter true");
      setCreateError("nameAlreadyExists");
      return;
    }

    if (
      Object.values(selectedPokemonState).every(
        (x) => x != undefined && pokemonContext.getPokemonByName(x) != undefined
      )
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        teamContext.setTeams({
          ...teamContext.teams,
          custom: [
            ...teamContext.teams.custom,
            {
              name: input_name,
              creator: loginContext.name,
              pokemon: Object.values(selectedPokemonState),
            },
          ],
        });
        onClose();
      }, 1000);
    } else {
      setCreateError("notEnoughPokemon");
    }
  };

  //NAME
  const defaultName = "MyTeam" + "-" + (teamContext.teams.custom.length + 1);
  const [input_name, setInput_name] = useState(defaultName);
  const handleInputChange_name = (e) => setInput_name(e.target.value);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      setSelectedPokemonState(initialSelectedPokemon);
      setCreateError("");
      setInput_name(defaultName);
    },
    onOpen() {
      setInput_name(defaultName);
    },
  });
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const hello = { value: "test", label: "test" };
  return (
    <>
      {React.cloneElement(props.button, {
        onClick: () => {
          setOverlay(<OverlayOne />);
          onOpen();
        },
      })}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            <chakra.p> Choose 6 Pokemon! </chakra.p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={12}>
            <VStack alignItems={"flex-start"}>
              <HStack w={"full"} justifyContent={"space-between"}>
                <chakra.p mr={4}>Pokemon 1:</chakra.p>
                <Select
                  onChange={(newValue) => {
                    setPokemonAtIndex(1, newValue.value);
                  }}
                  styles={customStyles}
                  options={pokemonContext.pokemonAvailable.map((pokemon) => {
                    return {
                      value: pokemon.name,
                      label: capitalizeFirstLetter(pokemon.name),
                    };
                  })}
                ></Select>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"}>
                <chakra.p mr={4}>Pokemon 2:</chakra.p>
                <Select
                  onChange={(newValue) => {
                    setPokemonAtIndex(2, newValue.value);
                  }}
                  styles={customStyles}
                  options={pokemonContext.pokemonAvailable.map((pokemon) => {
                    return {
                      value: pokemon.name,
                      label: capitalizeFirstLetter(pokemon.name),
                    };
                  })}
                ></Select>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"}>
                <chakra.p mr={4}>Pokemon 3:</chakra.p>
                <Select
                  onChange={(newValue) => {
                    setPokemonAtIndex(3, newValue.value);
                  }}
                  styles={customStyles}
                  options={pokemonContext.pokemonAvailable.map((pokemon) => {
                    return {
                      value: pokemon.name,
                      label: capitalizeFirstLetter(pokemon.name),
                    };
                  })}
                ></Select>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"}>
                <chakra.p mr={4}>Pokemon 4:</chakra.p>
                <Select
                  onChange={(newValue) => {
                    setPokemonAtIndex(4, newValue.value);
                  }}
                  styles={customStyles}
                  options={pokemonContext.pokemonAvailable.map((pokemon) => {
                    return {
                      value: pokemon.name,
                      label: capitalizeFirstLetter(pokemon.name),
                    };
                  })}
                ></Select>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"}>
                <chakra.p mr={4}>Pokemon 5:</chakra.p>
                <Select
                  onChange={(newValue) => {
                    setPokemonAtIndex(5, newValue.value);
                  }}
                  styles={customStyles}
                  options={pokemonContext.pokemonAvailable.map((pokemon) => {
                    return {
                      value: pokemon.name,
                      label: capitalizeFirstLetter(pokemon.name),
                    };
                  })}
                ></Select>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"}>
                <chakra.p mr={4}>Pokemon 6:</chakra.p>
                <Select
                  onChange={(newValue) => {
                    setPokemonAtIndex(6, newValue.value);
                  }}
                  styles={customStyles}
                  options={pokemonContext.pokemonAvailable.map((pokemon) => {
                    return {
                      value: pokemon.name,
                      label: capitalizeFirstLetter(pokemon.name),
                    };
                  })}
                ></Select>
              </HStack>
            </VStack>
            <FormControl isRequired={true} mt={4}>
              <FormLabel htmlFor="firstName">Team name</FormLabel>
              <Input
                maxLength={12}
                id="email"
                type="email"
                value={input_name}
                onChange={handleInputChange_name}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Box position={"absolute"} left={6}>
                {loading ? (
                  <Loading size={20} />
                ) : createError === "notEnoughPokemon" ? (
                  <chakra.p color={"red"}> Select 6 Pokemon. </chakra.p>
                ) : createError === "nameAlreadyExists" ? (
                  <chakra.p color={"red"}> Name already exists. </chakra.p>
                ) : undefined}
                <Box />
              </Box>
              <Button onClick={onClose}> cancel </Button>
              <Button onClick={createTeam}> create </Button>
            </HStack>
            <VStack />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
