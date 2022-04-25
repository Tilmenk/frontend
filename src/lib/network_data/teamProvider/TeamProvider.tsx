import React, { createContext, FC, useContext, useRef, useState } from "react";

const LoginContext = createContext(undefined);

export type PokemonTeam = {
  name: string;
  pokemon: string[];
};

export const TeamProvider: FC<any> = (props) => {
  const [teams, setTeams] = useState<PokemonTeam[]>([]);

  return (
    <LoginContext.Provider value={{ teams, setTeams }}>
      {props.children}
    </LoginContext.Provider>
  );
};
export type LoginState = {
  teams: PokemonTeam[];
  setTeams: (fetchedTeams: PokemonTeam[]) => void;
};

export function useTeamContext(): LoginState {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error("useTeamContext must be used inside a `TeamProvider`");

  return context;
}
