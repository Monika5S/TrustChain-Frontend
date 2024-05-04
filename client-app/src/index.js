import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// desiredChainId={ChainId.Localhost}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThirdwebProvider
    activeChain="localhost"
    clientId="ddd0702aa6546d7423a875009a9eb400"
    desiredChainId={ChainId.Localhost}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
