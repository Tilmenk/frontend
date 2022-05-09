import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CURRENCY } from "../../currency/CurrencyProvider";
import { useLoginContext } from "../../login/LoginProvider";
import axios from "axios";

const LoginContext = createContext(undefined);

export type Pokemon = {
  //properties from microservices
  imageUrl_large: string;
  imageUrl_small: string;
  costs: {
    [CURRENCY.dollar]: number;
    [CURRENCY.euro]: number;
    [CURRENCY.bitcoin]: number;
  };
  //properties from warehouse
  name: string;
  type1: PokemonType;
  type2?: PokemonType;
  health: number;
  attack: number;
  attack_sp: number;
  defense: number;
  defense_sp: number;
  speed: number;
  legendary: boolean;
};

export const POKEMONTYPE = {
  normal: "normal",
  fire: "fire",
  water: "water",
  electric: "electric",
  grass: "grass",
  ice: "ice",
  fighting: "fighting",
  poison: "poison",
  ground: "ground",
  flying: "flying",
  psychic: "psychic",
  bug: "bug",
  rock: "rock",
  ghost: "psychic",
  dragon: "dragon",
  dark: "dark",
  steel: "steel",
  fairy: "fairy",
} as const;
export type PokemonType = keyof typeof POKEMONTYPE;

export const PokemonProvider: FC<any> = (props) => {
  const loginContext = useLoginContext();

  useEffect(() => {
    if (loginContext.token != undefined) {
      axios({
        headers: { Authorization: `Bearer ${loginContext.token}` },
        method: "get",
        url: process.env.BACKEND_URL + "/pokemon",
      }).then(
        (successResponse) => {
          const { data: payLoad } = successResponse;
          const { data: pokemon } = payLoad;
          console.log(pokemon);
          setPokemonAvailable(pokemon);
        },
        (errorResponse) => {
          const { message: responseMessage } = errorResponse?.response?.data;
        }
      );
    }
  }, [loginContext.token]);

  //TODO: replace mock data
  const [pokemonAvailable, setPokemonAvailable] = useState<Pokemon[]>([]);

  function getPokemonByName(name: string): Pokemon {
    let pokemon: Pokemon | undefined = undefined;
    pokemon = pokemonAvailable.find((pokemon) => pokemon.name === name);
    if (!pokemon) console.log("Pokemon named '" + name + "' not found!");

    return pokemon;
  }

  return (
    <LoginContext.Provider
      value={{ pokemonAvailable, setPokemonAvailable, getPokemonByName }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export type PokemonState = {
  pokemonAvailable: Pokemon[];
  setPokemonAvailable: (fetchedPokemon: Pokemon[]) => void;
  getPokemonByName(name: string): Pokemon;
};

export function usePokemonContext(): PokemonState {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error(
      "usePokemonContext must be used inside a `PokemonProvider`"
    );

  return context;
}
