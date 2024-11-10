import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../../context";
import { CountBox, CustomButton } from "../../components";
import { calculateBarPercentage, daysLeft } from "../../utils";
import { thirdweb } from "../../assets";

import { db } from "../../firebase"; // Ensure correct path to firebase config
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

export function CampaignDetails() {
  const location = useLocation();
  const { product, campaign } = location.state || {};
  const navigate = useNavigate();
  // console.log(product, campaign);
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = campaign ? daysLeft(campaign.deadline) : "";

  const fetchDonators = async () => {
    const data = campaign ? await getDonations(campaign.pId) : "";

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to proceed.");
      return;
    }

    if (!address) {
      alert("Please connect your wallet to donate."); // Alert user if not connected
      return; // Exit the function if wallet is not connected
    }

    setIsLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.uid;

    try {
      const donate_percentage = product.donation_percentage;
      const donate_amount = amount * (donate_percentage / 100);

      // Call the donate function and get the transaction receipt
      const txReceipt = await donate(
        campaign?.pId || 0,
        product.price,
        product.price,
        donate_percentage,
        product.store_address
      );

      const transactionHash = txReceipt?.receipt.transactionHash;

      const paymentData = {
        userID: userId,
        userWallet: address,
        productName: product.name,
        productPrice: product.price,
        storeWallet: product.store_address,
        charityWallet: campaign?.owner || null,
        campaignTitle: campaign?.title || "Direct Purchase",
        campaignId: campaign?.pId || -1,
        PaidAmount: product.price,
        donatedAmount: donate_amount,
        timestamp: new Date(),
        transactionHash: transactionHash,
      };

      await addDoc(collection(db, "payments"), paymentData);
      navigate("/user-dashboard/payments");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error processing payement:", error);
      alert("Error processing your payement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5 py-3 my-3 mx-5 w-75 border border-3 rounded-5 text-white">
      {isLoading && "Loading"}

      <div className="mt-1 d-flex flex-column column-gap-5">
        <div className="flex-1">
          <h5 className="text-white">Pay using Metamask Wallet</h5>
          <p className="text-left">
            Empowering change through seamless giving and cooperative support.
            Every purchase drives impact.
          </p>

          <div className="d-flex w-100 border justify-content-around align-items-center p-3 rounded-3 column-gap-3">
            {product ? (
              <div className="w-25 h-25">
                <img src={product.img} alt={product.name} className="w-100" />
                <h6>{product.name}</h6>
                <h5>Price: {product.price} ETH</h5>
              </div>
            ) : (
              <div></div>
            )}

            <div>
              {campaign && (
                <div className="mt-3 text-left">
                  <h6>cooperative Store | Donation Breakdown</h6>
                  <p>
                    Amount going to the store:{" "}
                    {product.price -
                      (product.price * product.donation_percentage) / 100}{" "}
                    ETH
                  </p>
                  <p>
                    Amount going to charity campaign:{" "}
                    {(product.price * product.donation_percentage) / 100} ETH
                  </p>
                </div>
              )}

              <CustomButton
                btnType="button"
                title="Purchase Product"
                styles="w-auto bg-primary"
                handleClick={handleDonate}
              />
              <br />

              <div className="rounded-3 mt-3">
                <h6 className="text-white">
                  Every contribution counts—give with purpose, shop with heart
                  🌞
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {campaign ? (
        <div className="p-5 pb-2">
          <h4>Supported Campaign Details</h4>
          <div className="w-100 d-flex justify-content-around align-items-center mt-2">
            <div className="flex-1">
              <img
                src={campaign?.image}
                alt="campaign"
                className="w-100 object-fit-cover rounded-5"
              />
              {/* <div className="mt-2 bg-secondary">
            <div
              className="bg-dark-subtle"
              style={{
                width: `${calculateBarPercentage(
                  state.targetGoal,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div> */}
            </div>

            <div className="w-100 d-flex flex-row justify-content-center align-items-center">
              <CountBox title="Days Left" value={remainingDays} />
              <CountBox
                title={`Raised of ${campaign?.targetGoal}`}
                value={campaign?.amountCollected}
              />
              <CountBox title="Total Donators" value={donators.length} />
            </div>
          </div>
        </div>
      ) : (
        <p>🛍️ This is a direct purchase with no associated campaign.</p>
      )}

      {campaign ? (
        <div className="flex-2 d-flex flex-column p-5 pt-0">
          <div>
            <h5 className="text-white uppercase">Creator</h5>

            <div className="my-2 d-flex flex-row align-items-center">
              <div className="w-25 h-25 d-flex align-items-center justify-content-center rounded-5 cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-25 h-25 object-fit-contain"
                />
              </div>
              <div>
                <h5 className="text-white">{campaign.owner}</h5>
                <p className="my-1">Owner Campaign</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-white text-uppercase">Description</h5>

            <div className="mt-1">
              <p className="">{campaign.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
