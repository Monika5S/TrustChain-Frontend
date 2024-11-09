import React from "react";

import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

export function CampaignCard({
  owner,
  title,
  description,
  targetGoal,
  deadline,
  amountCollected,
  image,
  support_keyword,
  handleClick,
}) {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="CampaignCard rounded-3  w-100 border border-2 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="banner rounded-3 object-fit-cover"
      />

      <div className="d-flex flex-column p-2">
        <div className="d-flex flex-row align-items-center">
          <img src={tagType} alt="tag" className="object-fit-contain" />
          <p className="ms-2 mt-1 text-white">Category: {support_keyword}</p>
        </div>

        <div className="block mb-1">
          <h3 className="text-white text-left">{title}</h3>
          <p className="mt-1 text-align-left">{description}</p>
        </div>

        <div className="d-flex flex-row justify-content-between column-gap-2 mb-1">
          <div className="d-flex flex-column ">
            <h4 className="">{amountCollected}</h4>
            <p>Raised of {targetGoal} ETH</p>
          </div>
          <div className="d-flex flex-column ">
            <h4 className="">{remainingDays}</h4>
            <p>Days Left</p>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center">
          <div
            className="rounded rounded-circle flex justify-component-center align-items-center bg-dark"
            style={{ width: 45 + "px", height: 45 + "px" }}
          >
            <img src={thirdweb} alt="user" className="w-100" />
          </div>
          <p className="flex-1">
            by <span className="">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
