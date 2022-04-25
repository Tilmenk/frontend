import { Box, VStack, Wrap } from "@chakra-ui/react";
import { PokemonCard } from "../../../molecules/shop/PokemonCard/PokemonCard";
import { ShopPagination } from "../../../molecules/shop/ShopPagination/ShopPagination";
import React, { useState } from "react";
import { usePokemonContext } from "../../../../lib/network_data/pokemonProvider/PokemonProvider";

export const PokemonView = () => {
  const pokemonContext = usePokemonContext();
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <VStack my={4}>
      <Wrap
        spacing={4}
        justify="flex-start"
        w={{ lg: 980, xl: 1280 }}
        h={813}
        mb={8}
      >
        {pokemonContext.pokemonAvailable
          .slice(pageNumber * 18, pageNumber * 18 + 18)
          .map((pokemon, index) => (
            <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
          ))}
      </Wrap>
      <Box shadow={"lg"}>
        <ShopPagination
          total={pokemonContext.pokemonAvailable.length}
          defaultCurrent={1}
          onChange={(newPage) => setPageNumber(newPage - 1)}
          current={pageNumber + 1}
        />
      </Box>
    </VStack>
  );
};
