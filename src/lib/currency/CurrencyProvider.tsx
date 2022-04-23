import React, { createContext, FC, useContext, useRef, useState } from "react";

export const CURRENCY = {
  euro: "euro",
  dollar: "dollar",
  bitcoin: "bitcoin",
};
const CurrencyContext = createContext(undefined);

export const CurrencyProvider: FC<any> = (props) => {
  //[React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>, T] {

  const [currencySelected, setCurrency] = useState(CURRENCY.euro);

  const toggleCurrency = () => {
    if (currencySelected === CURRENCY.euro) {
      setCurrency(CURRENCY.dollar);
    } else if (currencySelected === CURRENCY.dollar) {
      setCurrency(CURRENCY.bitcoin);
    } else {
      setCurrency(CURRENCY.euro);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currencySelected, toggleCurrency }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export type CurrencyState = {
  currencySelected: string;
  toggleCurrency: () => void;
};

export function useCurrency(): CurrencyState {
  const context = useContext(CurrencyContext);

  if (!context)
    throw new Error("useCurrency must be used inside a `CurrencyProvider`");

  return context;
}
