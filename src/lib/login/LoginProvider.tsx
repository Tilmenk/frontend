import React, { createContext, FC, useContext, useRef, useState } from "react";

const LoginContext = createContext(undefined);

export const LoginProvider: FC<any> = (props) => {
  //[React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>, T] {

  const [token, setToken] = useState("undefined");

  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {props.children}
    </LoginContext.Provider>
  );
};
export type LoginState = {
  token: string;
  setToken: (string) => void;
};

export function useLoginContext(): LoginState {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error("useLoginContext must be used inside a `LoginProvider`");

  return context;
}
