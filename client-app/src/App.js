// import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Profile,
  CreateCampaigns,
  CampaignDetails,
  CooperativeStore,
} from "./pages";
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
    <div className="App d-flex">
      <div className="d-sm-flex">
        <Sidebar />
      </div>

      <div className="d-flex flex-column w-100">
        <Navbar />

        <div className="d-flex justify-content-center align-items-center my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cooperative-store" element={<CooperativeStore />} />

            <Route path="/create-campaign" element={<CreateCampaigns />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
