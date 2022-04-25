import React, { createContext, FC, useContext, useRef, useState } from "react";
import { usePokemonContext } from "../pokemonProvider/PokemonProvider";

const LoginContext = createContext(undefined);

export type PokemonTeam = {
  name: string;
  pokemon: string[];
};
export type PokemonTeamCustom = PokemonTeam & {
  creator: string;
};

export type PokemonTeams = {
  default: PokemonTeam[];
  custom: PokemonTeamCustom[];
};
const mockTeams: PokemonTeams = {
  default: [
    {
      name: "default_1",
      pokemon: [
        "pikachu",
        "squirtle",
        "bulbasaur",
        "moltres",
        "blastoise",
        "charmander",
      ],
    },
    {
      name: "default_2",
      pokemon: [
        "pikachu",
        "squirtle",
        "bulbasaur",
        "moltres",
        "blastoise",
        "charmander",
      ],
    },
    {
      name: "default_3",
      pokemon: [
        "pikachu",
        "squirtle",
        "bulbasaur",
        "moltres",
        "blastoise",
        "charmander",
      ],
    },
  ],
  custom: [
    {
      name: "MyTeam",
      creator: "Henk",
      pokemon: [
        "pikachu",
        "squirtle",
        "bulbasaur",
        "moltres",
        "blastoise",
        "charmander",
      ],
    },
  ],
};

export const TeamProvider: FC<any> = (props) => {
  //TODO: fetch data
  const [teams, setTeams] = useState<PokemonTeams>(mockTeams);
  //const pokemonContext = usePokemonContext();

  return (
    <LoginContext.Provider value={{ teams, setTeams }}>
      {props.children}
    </LoginContext.Provider>
  );
};
export type TeamState = {
  teams: PokemonTeams;
  setTeams: (fetchedTeams: PokemonTeams) => void;
};

export function useTeamContext(): TeamState {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error("useTeamContext must be used inside a `TeamProvider`");

  return context;
}
