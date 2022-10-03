import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export default function Wallets(props) {
  const [wallet, setWallet] = useState(0);
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {props.children}
    </WalletContext.Provider>
  );
}
