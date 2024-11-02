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

  const remainingDays = daysLeft(campaign.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(campaign.pId);

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
        campaign.pId,
        product.price,
        amount,
        donate_percentage,
        product.store_address
      );
      // console.log(txReceipt, txReceipt.receipt.transactionHash);
      const transactionHash = txReceipt?.receipt.transactionHash;
      // Prepare payment data
      const paymentData = {
        userID: userId,
        userWallet: address,
        productName: product.name,
        productPrice: product.price,
        storeWallet: product.store_address,
        charityWallet: campaign.owner,
        campaignTitle: campaign.title,
        campaignId: campaign.pId,
        PaidAmount: amount,
        donatedAmount: donate_amount,
        timestamp: new Date(),
        transactionHash: transactionHash, // Get the transaction hash from the receipt
      };

      // Store the payment data in Firestore
      await addDoc(collection(db, "payments"), paymentData);

      // Navigate to payments page after successful donation
      navigate("/user-dashboard/payments");

      // Set a timeout to reload after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1 second delay (adjust as needed)
    } catch (error) {
      console.error("Error processing payement:", error);
      alert("Error processing your payement. Please try again."); // Provide user feedback
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // const handleDonate = async () => {
  return (
    <div className="px-5 py-3 my-3 mx-5 w-75 border border-3 rounded-5 text-white">
      {isLoading && "Loading"}

      <div className="w-100 p-5 d-flex justify-content-around align-items-center mt-2">
        <div className="flex-1">
          <img
            src={campaign.image}
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
            title={`Raised of ${campaign.targetGoal}`}
            value={campaign.amountCollected}
          />
          <CountBox title="Total Donators" value={donators.length} />
        </div>
      </div>

      <div className="mt-1 d-flex flex-column column-gap-5">
        <div className="flex-2 d-flex flex-column">
          <div>
            <h4 className="text-white uppercase">Creator</h4>

            <div className="my-2 d-flex flex-row align-items-center">
              <div className="w-25 h-25 d-flex align-items-center justify-content-center rounded-5 cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-25 h-25 object-fit-contain"
                />
              </div>
              <div>
                <h4 className="text-white">{campaign.owner}</h4>
                <p className="my-1">Owner Campaign</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-uppercase">Description</h4>

            <div className="mt-1">
              <p className="">{campaign.description}</p>
            </div>
          </div>

          {/* <div>
            <h4 className="text-white text-uppercase">Donators</h4>

            <div className="d-flex flex-column column-gap-2">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="d-flex justify-content-start align-items-center column-gap-2"
                  >
                    <p className="">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="">{item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="">Be the first to join the cause!</p>
              )}
            </div>
          </div> */}
        </div>

        <div className="flex-1">
          <h5 className="text-white">Pay using Metamask Wallet</h5>
          <p className="text-left">
            Empowering change through seamless giving and cooperative support.
            Eery purchase drives impact.
          </p>

          <div className="d-flex w-100 border  justify-content-around align-items-center p-3 rounded-3 column-gap-3">
            {product ? (
              <div className="w-25 h-25">
                <img src={product.img} alt={product.name} className="w-100" />
                <h6>{product.name}</h6>
                <h5>Price: {product.price} ETH</h5>
              </div>
            ) : (
              <div></div>
            )}

            <div className="mt-3">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-50 py-2 bg-transparent  text-white placeholder:text-[#4b5264] rounded-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="rounded-3">
                <h6 className="text-white">
                  Every contribution counts—give with purpose, shop with heart."
                </h6>
              </div>

              <CustomButton
                btnType="button"
                title="PAY"
                styles="w-auto bg-primary"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
