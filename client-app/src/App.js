// import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Route, Routes } from "react-router-dom";
import {
  AllCampaigns,
  CampaignDetails,
  AllProducts,
  ProductDetails,
  UserProfile,
  CreateCampaigns,
  CharityCampaigns,
  CharityCampaignDetails,
  Profile,
  StoreProfile,
  StoreOwnerProducts,
  StoreProductDetails,
  CreateProduct,
} from "./pages";
import HomeAbout from "./pages/HomeAbout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import StoreDashboard from "./pages/store/StoreDashboard";
import CharityDashboard from "./pages/charityorg/CharityDashboard";
import UserDashboard from "./pages/user/UserDashboard";

// import { Navbar, Sidebar } from "./components";

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
    //login form will select which kind of user it is and passing down sidebar para accordingly!
    <div className="App d-flex">
      {/* <div className="d-sm-flex">
        <Sidebar />
      </div> */}

      <div className="d-flex flex-column w-100">
        {/* <Navbar /> */}

        {/* <div className="d-flex justify-content-center align-items-center my-4"> */}
        <Routes>
          <Route path="/" element={<HomeAbout />} />
          {/* <Route path="/all-campaigns" element={<AllCampaigns />} /> */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/store-dashboard" element={<StoreDashboard />}>
            <Route index element={<StoreProfile />} />
            <Route path="products" element={<StoreOwnerProducts />} />
            <Route path="products/:id" element={<StoreProductDetails />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="store-profile" element={<StoreProfile />} />
          </Route>

          <Route path="/charity-dashboard" element={<CharityDashboard />}>
            <Route index element={<CharityCampaigns />} />
            <Route path="charity-campaigns" element={<CharityCampaigns />} />
            <Route path="create-campaign" element={<CreateCampaigns />} />
            <Route
              path="charity-campaign/:id"
              element={<CharityCampaignDetails />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route index element={<AllProducts />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="campaigns" element={<AllCampaigns />} />
            <Route path="campaigns/:id" element={<CampaignDetails />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
        {/* </div> */}
      </div>
    </div>
  );
}
