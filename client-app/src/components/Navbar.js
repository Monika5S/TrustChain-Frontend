import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton } from "./";
import { payment } from "../assets";
import { ethers } from "ethers";

export function Navbar() {
  const { disconnect, connect, address } = useStateContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [balance, setBalance] = useState(null);

  // Check MetaMask availability
  const checkMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      setErrorMessage(
        "MetaMask extension is not installed. Please install it to connect."
      );
    } else {
      setErrorMessage(""); // Clear any previous errors if MetaMask is available
    }
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Fetch wallet balance when connected
  const fetchBalance = async () => {
    if (address && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(Number(balanceInEth).toFixed(3));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  // Handle MetaMask connection and updates
  useEffect(() => {
    checkMetaMask();
    fetchBalance();
  }, [address]);

  return (
    <div className="Navbar d-flex flex-row justify-content-end m-3">
      <div className="d-flex column-gap-4 align-items-center">
        {/* Show error message if MetaMask is not installed */}
        {errorMessage && (
          <p style={{ color: "red", marginRight: "10px" }}>{errorMessage}</p>
        )}

        {/* Display wallet address and balance if connected */}
        {address && (
          <div>
            <p style={{ margin: "5px 0 0", color: "white" }}>
              Address: {shortenAddress(address)}
            </p>
            {balance && (
              <p style={{ margin: "5px 0 0", color: "white" }}>
                Balance: {balance} ETH
              </p>
            )}
          </div>
        )}

        <Link to="#">
          <div className="rounded rounded-circle p-1 bg-dark d-flex justify-content-center align-items-center cursor-pointer">
            <img src={payment} alt="user" className="profile img-wrapper" />
          </div>
        </Link>

        <CustomButton
          btnType="button"
          title={address ? "Disconnect" : "Connect"}
          styles={address ? "bg-success" : "bg-danger"}
          handleClick={() => {
            if (address) {
              disconnect();
              setBalance(null); // Clear balance on disconnect
            } else {
              connect();
            }
          }}
        />
      </div>
    </div>
  );
}
