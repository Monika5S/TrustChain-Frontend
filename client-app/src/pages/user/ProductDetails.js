import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../../components";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [storeDetails, setStoreDetails] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const storeDocRef = doc(db, "storeProfiles", state.storeId);
        const storeDoc = await getDoc(storeDocRef);

        if (storeDoc.exists()) {
          setStoreDetails(storeDoc.data());
        } else {
          console.error("No store profile found for this product.");
        }
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    };

    fetchStoreDetails();
  }, [state.storeId]);

  function handleBuy() {
    const product = {
      name: state.name,
      img: state.img_url,
      price: state.price,
      desc: state.desc,
      donation_percentage:
        storeDetails?.donationPercentage || state.donation_percentage,
      store_address: storeDetails?.store_address || state.store_address,
    };

    if (product.donation_percentage < 1) {
      navigate("/user-dashboard/campaigns/none", { state: { product } });
    } else {
      navigate("/user-dashboard/campaigns", { state: { product } });
    }
  }

  return (
    <div className="px-5 py-3 my-3 mx-5 border border-3 rounded-5 text-white">
      <div className="w-100 d-flex justify-content-around align-items-center mt-2 column-gap-5">
        <div className="flex-1 w-50">
          <img
            src={state.img_url}
            alt="product"
            className="w-75 object-fit-cover rounded-5"
          />
        </div>

        <div className="w-50 text-align-left px-3">
          <h4>Price: {state.price} ETH</h4>
          <h6 className="py-3">
            Want To Buy The Product? <br />
            First Select A Campaign of your choice.
          </h6>
          <CustomButton
            btnType="button"
            title="Select Campaign"
            styles="w-auto bg-primary"
            handleClick={handleBuy}
          />

          <h6 className="py-3">
            All the charity campaigns are supported by the Cooperative Stores.
            They donate some percent of the product price to support the
            campaign.
          </h6>
        </div>
      </div>

      <div className="flex-2 d-flex flex-column p-4">
        <div>
          <h4 className="text-white text-uppercase">{state.name}</h4>
          <div className="mt-1">
            <p>{state.desc}</p>
            <p>{state.more}</p>
          </div>

          <h6 className="py-3">Store and Charity Details</h6>
          {storeDetails ? (
            <>
              <p>Store Name: {storeDetails.storeName}</p>
              <p>Supported Charity Organization: {storeDetails.charity_org}</p>
              <p>Donation Percentage: {storeDetails.donationPercentage}%</p>
              <p>Store MetaMask Wallet Address: {storeDetails.store_address}</p>
            </>
          ) : (
            <p>Loading store details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
