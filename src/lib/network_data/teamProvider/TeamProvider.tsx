import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePokemonContext } from "../pokemonProvider/PokemonProvider";
import axios from "axios";
import { useLoginContext } from "../../login/LoginProvider";

const LoginContext = createContext(undefined);

export type PokemonTeam = {
  name: string;
  pokemon: string[];
  costs: { euro: number; bitcoin: number; dollar: number };
  id: number;
};
export type PokemonTeamCustom = PokemonTeam & {
  creator: string;
};

export type PokemonTeams = {
  default: PokemonTeam[];
  custom: PokemonTeamCustom[];
};

export const TeamProvider: FC<any> = (props) => {
  const loginContext = useLoginContext();

  const [teams, setTeams] = useState<PokemonTeams>({ default: [], custom: [] });
  //const pokemonContext = usePokemonContext();

  useEffect(() => {
    if (loginContext.token != undefined && loginContext.name != undefined) {
      fetchTeams();
    }
  }, [loginContext.name, loginContext.token]);

  const fetchTeams = () => {
    axios({
      headers: { Authorization: `Bearer ${loginContext.token}` },
      method: "get",
      url: process.env.BACKEND_URL + "/team",
    }).then(
      (successResponse) => {
        const { data: payLoad } = successResponse;
        const { data: teams } = payLoad;
        const fetchedTeams = { default: [], custom: [] };
        teams.map((team) => {
          if (team.creator === "default") {
            fetchedTeams.default.push(team);
          } else if (team.creator === loginContext.name) {
            fetchedTeams.custom.push(team);
          }
        });
        setTeams(fetchedTeams);
      },
      (errorResponse) => {
        const { message: responseMessage } = errorResponse?.response?.data;
      }
    );
  };

  return (
    <LoginContext.Provider value={{ teams, setTeams, fetchTeams }}>
      {props.children}
    </LoginContext.Provider>
  );
};
export type TeamState = {
  teams: PokemonTeams;
  setTeams: (fetchedTeams: PokemonTeams) => void;
  fetchTeams: () => void;
};

export function useTeamContext(): TeamState {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error("useTeamContext must be used inside a `TeamProvider`");

  return context;
}
