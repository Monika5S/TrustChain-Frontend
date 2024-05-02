// import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Route, Routes } from "react-router-dom";
import { Home, Profile } from "./pages";
import { Navbar, Sidebar } from "./components";

export default function App() {
  return (
    // <main className="main">
    //   <div className="container">
    //     <div className="header">
    //       <h1 className="title">Welcome to Trustchain</h1>

    //       {/* <div className="connect">
    //         <ConnectWallet />
    //       </div> */}
    //     </div>

    //   </div>
    // </main>
    <div className="Container">
      <div className="relative">
        <Sidebar />
      </div>

      <div className="flex">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
