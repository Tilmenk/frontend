import React, { createContext, FC, useContext, useRef, useState } from "react";
import { CURRENCY } from "../../currency/CurrencyProvider";

const LoginContext = createContext(undefined);

export type Pokemon = {
  //properties from microservices
  sprites: { small: string; large: string };
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

const mockPokemon: Pokemon[] = [
  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "pikachu",
    sprites: {
      small:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      large:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
    type1: "electric",
    type2: "ground",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },

  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "squirtle",
    sprites: {
      small:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      large:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    },
    type1: "water",
    type2: undefined,
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },
  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "bulbasaur",
    sprites: {
      small:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      large:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },
    type1: "grass",
    type2: "poison",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: false,
  },

  {
    costs: { dollar: 69, bitcoin: 0.01, euro: 50 },
    name: "moltres",
    sprites: {
      small:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
      large:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png",
    },
    type1: "fire",
    type2: "flying",
    health: 65,
    attack: 45,
    attack_sp: 60,
    defense: 50,
    defense_sp: 40,
    speed: 70,
    legendary: true,
  },
];

export const PokemonProvider: FC<any> = (props) => {
  //TODO: replace mock data
  const [pokemonAvailable, setPokemonAvailable] =
    useState<Pokemon[]>(mockPokemon);

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
