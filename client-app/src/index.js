import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThirdwebProvider
    activeChain="localhost"
    clientId="ddd0702aa6546d7423a875009a9eb400"
    desiredChainId={31337}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
