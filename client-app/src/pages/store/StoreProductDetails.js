import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export function StoreProductDetails() {
  const { state } = useLocation();
  const [storeDetails, setStoreDetails] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const storeDocRef = doc(db, "storeProfiles", state.storeId); // Assume storeId is part of product state
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

  return (
    <div className="px-5 py-3 my-3 mx-5 border border-3 rounded-5 text-white">
      <div className="w-100 d-flex justify-content-around align-items-center mt-2 column-gap-5">
        <div className="flex-1 w-25">
          <img
            src={state.img_url}
            alt="product"
            className="w-100 object-fit-cover rounded-5"
          />
        </div>

        <div className="w-75 text-align-left px-3">
          <h4 className="text-white text-uppercase">{state.name}</h4>
          <br />
          <h6>Price: {state.price} ETH</h6>
        </div>
      </div>

      <div className="flex-2 d-flex flex-column p-4">
        <div>
          <div className="mt-1">
            <p>{state.desc}</p>
          </div>

          <h6 className="py-3">Seller Details</h6>
          {storeDetails ? (
            <>
              <p>Store Name: {storeDetails.storeName}</p>
              <p>Email Address: {storeDetails.email}</p>
              <p>
                Donation Percentage to support Charity:{" "}
                {storeDetails.donationPercentage}%
              </p>
              <p>MetaMask Wallet Address: {storeDetails.store_address}</p>
            </>
          ) : (
            <p>Loading store details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
