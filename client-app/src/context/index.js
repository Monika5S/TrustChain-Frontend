import React, { useContext, createContext } from "react";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import {
//   CommonSymbolSchema,
//   EditionMetadataWithOwnerOutputSchema,
// } from "@thirdweb-dev/sdk";
import { useMetamask, useDisconnect } from "@thirdweb-dev/react";
import CooperativeCharityABI from "../CooperativeCharityABI.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    CooperativeCharityABI
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  // const connect = useConnect();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.targetGoal,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
          form.charity_org,
          form.support_keyword,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
      throw new Error(error.message);
    }
  };

  //fetching info from contract to display!
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      targetGoal: ethers.utils.formatEther(campaign.targetGoal.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
      charity_org: campaign.charity_org,
      support_keyword: campaign.support_keyword,
    }));

    return parsedCampaings;
  };

  //to get only owner created campaigns
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (
    pId,
    price,
    amount,
    donate_percentage,
    store_address
  ) => {
    try {
      const tx = await contract.call(
        "donateToCampaign",
        [pId, ethers.utils.parseEther(price), donate_percentage, store_address],
        {
          value: ethers.utils.parseEther(amount),
        }
      );

      console.log("Transaction receipt:", tx);

      return tx;
    } catch (error) {
      console.error("Error in donate function:", error);
      throw error;
    }
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const getCharityOrgs = async () => {
    const charitys = await contract.call("getCharityOrgs");
    return charitys;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getCharityOrgs,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
