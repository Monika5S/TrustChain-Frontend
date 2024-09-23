import React, { useState, useEffect } from "react";
import { DisplayCharityCampaigns } from "../../components";
import { useStateContext } from "../../context";

export function CharityCampaigns() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  async function fetchCampaigns() {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data); //campaigns data to be shown on home page
    setIsLoading(false);
  }

  //to get campaign only if contract and address is available
  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className="w-100">
      <h1>All Created campaigns</h1>
      <DisplayCharityCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
}
