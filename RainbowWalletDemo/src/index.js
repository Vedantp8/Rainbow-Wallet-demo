import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import Wallets from "./Utils/ConnectWallet"

import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, createClient, configureChains, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains(
  [
    // chain.mainnet,
    chain.polygonMumbai,
    chain.polygon,
    // chain.optimism,
    // chain.arbitrum
  ],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wallets>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} coolMode>
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
      </Wallets>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
