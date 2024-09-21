import React from "react";
import { useNavigate } from "react-router-dom";
import { CampaignCard } from "./CampaignCard";
import { loader } from "../assets";
import { providers } from "ethers";

export function DisplayCampaigns({ title, isLoading, campaigns, product }) {
  const navigate = useNavigate();

  function handleNavigate(campaign) {
    // console.log( product);
    navigate(`/user-dashboard/campaigns/${campaign.title}`, {
      state: { ...product, campaign },
    });
  }

  // const filteredCampaigns = campaigns.filter(
  //   (campaign) => campaign.support_keyword === product.support_cause
  // );
  const filteredCampaigns = campaigns;

  // console.log(product);
  return (
    <div className="px-4 w-100">
      <h1 className="text-white text-center">
        {title} ({campaigns.length})
      </h1>

      <div className="w-100 d-flex mt-4 column-gap-4 text-white justify-content-around align-items-start">
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
          ? filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))
          : "No data available!"}
        {0 === 1 ? (
          <div>
            {product.price}, {product.img_url}, {product.name}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
