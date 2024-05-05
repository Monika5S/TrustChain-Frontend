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
    <div className="px-4">
      <h1 className="text-white text-center">
        {title} ({campaigns.length})
      </h1>

      <div className="d-flex mt-4 column-gap-4 text-white justify-content-around align-items-start">
        {isLoading ? (
          <img src={loader} alt="loader" className="w-25 h-25" />
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
