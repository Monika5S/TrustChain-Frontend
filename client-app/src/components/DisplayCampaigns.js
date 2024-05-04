import React from "react";
import { useNavigate } from "react-router-dom";
import { CampaignCard } from "./CampaignCard";
import { loader } from "../assets";

export function DisplayCampaigns({ title, isLoading, campaigns }) {
  const navigate = useNavigate();

  function handleNavigate(campaign) {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  }

  return (
    <div>
      <h1 className="text-white">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-4 column-gap-4 text-white">
        {isLoading ? (
          <img src={loader} alt="loader" className="w-50 h-50" />
        ) : (
          ""
        )}

        {!isLoading && campaigns.length === 0 ? (
          <p className="text-white">There is No Campaign yet!</p>
        ) : (
          ""
        )}

        {!isLoading && campaigns.length > 0
          ? campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))
          : "No data available!"}
      </div>
    </div>
  );
}
