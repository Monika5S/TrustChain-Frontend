import React, { useState, useEffect } from "react";
import { DisplayCampaigns } from "../../components";
import { useStateContext } from "../../context";
import { useLocation } from "react-router-dom";

export function AllCampaigns() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();
  const { state } = useLocation();
  console.log(state);

  async function fetchCampaigns() {
    setIsLoading(true);
    const data = await getCampaigns();
    console.log(data);
    setCampaigns(data); //campaigns data to be shown on home page
    setIsLoading(false);
  }

  //to get campaign only if contract and address is available
  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="Store Supported Charity Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
      product={state}
    />
  );
}
