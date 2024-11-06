import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../../context";
import { CountBox, CustomButton } from "../../components";
import { calculateBarPercentage, daysLeft } from "../../utils";
import { thirdweb } from "../../assets";

export function CharityCampaignDetails() {
  const location = useLocation();
  const { campaign } = location.state || {};
  // console.log(product, campaign);

  const { getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(campaign.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(campaign.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

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
        </div>

        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
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

          <div>
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
                <p className="">No donators yet!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
