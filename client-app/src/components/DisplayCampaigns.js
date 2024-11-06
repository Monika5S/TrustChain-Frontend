import React from "react";
import { useNavigate } from "react-router-dom";
import { CampaignCard } from "./CampaignCard";
import { loader } from "../assets";
// import { providers } from "ethers";

export function DisplayCampaigns({ title, isLoading, campaigns, product }) {
  const navigate = useNavigate();

  function handleNavigate(campaign) {
    navigate(`/user-dashboard/campaigns/${campaign.title}`, {
      state: { ...product, campaign },
    });
  }

  // Filter campaigns based on the product's charity organization and support cause
  const campaignsByOrgAndCause = campaigns.filter(
    (campaign) =>
      campaign.charity_org === product.charity_org &&
      campaign.support_keyword === product.support_cause
  );

  const campaignsByCauseOnly = campaigns.filter(
    (campaign) => campaign.support_keyword === product.support_cause
  );

  const filteredCampaigns =
    campaignsByOrgAndCause.length > 0
      ? campaignsByOrgAndCause
      : campaignsByCauseOnly.length > 0
      ? campaignsByCauseOnly
      : campaigns;

  console.log(product);
  return (
    <div className="px-4 w-100">
      <h1 className="text-white text-center">
        {title} ({campaigns.length})
      </h1>
      <h6 className="text-white text-center p-2">
        select a charity campaign of your choice to continue the product
        purchase!
      </h6>

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
