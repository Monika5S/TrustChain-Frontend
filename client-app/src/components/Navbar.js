import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton } from "./";
import { thirdweb, payment } from "../assets";
// import { metamaskWallet } from "@thirdweb-dev/react";
// const metamaskConfig = metamaskWallet();

export function Navbar() {
  // const navigate = useNavigate();
  // const address = "0xabc";
  const { disconnect, connect, address } = useStateContext();

  return (
    <div className="Navbar d-flex flex-row justify-content-end m-3">
      <div className="d-flex column-gap-4 align-items-center">
        <CustomButton
          btnType="button"
          title={address ? "Disconnect" : "Connect"}
          styles={address ? "bg-success" : "bg-danger"}
          handleClick={() => {
            if (address) disconnect();
            // navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="#">
          <div className="rounded rounded-circle p-1 bg-dark d-flex justify-content-center align-items-center cursor-pointer">
            <img src={payment} alt="user" className="profile img-wrapper" />
          </div>
        </Link>
      </div>
    </div>
  );
}
