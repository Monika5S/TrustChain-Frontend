import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function StoreProductDetails() {
  const { state } = useLocation();
  const [storeDetails, setStoreDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling between view and edit
  const [productName, setProductName] = useState(state.name);
  const [productImg, setProductImg] = useState(state.img_url);
  const [productPrice, setProductPrice] = useState(state.price);
  const [productDesc, setProductDesc] = useState(state.desc);
  const [status, setStatus] = useState(state.status);

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

  const handleUpdateProduct = async () => {
    try {
      const productDocRef = doc(db, "products", state.id); // Assuming `state.id` is the product ID
      await updateDoc(productDocRef, {
        name: productName,
        // img_url: productImg,
        price: productPrice,
        desc: productDesc,
        status: status,
      });
      setIsEditing(false);
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="px-5 py-3 my-3 mx-5 border border-3 rounded-5 text-white">
      <div className="w-100 d-flex justify-content-around align-items-center mt-2 column-gap-5">
        <div className="flex-1 w-25">
          <img
            src={productImg}
            alt="product"
            className="w-100 object-fit-cover rounded-5"
          />
        </div>

        <div className="w-75 text-align-left px-3">
          {isEditing ? (
            <>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control mb-2"
              />
              {/* <input
                type="text"
                value={productImg}
                onChange={(e) => setProductImg(e.target.value)}
                className="form-control mb-2"
              /> */}
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control mb-2"
              />
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                className="form-control mb-2"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control mb-2"
              >
                <option value="available">Available</option>
                <option value="sold out">Sold Out</option>
              </select>
              <button
                className="btn btn-primary mt-2"
                onClick={handleUpdateProduct}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h4 className="text-white text-uppercase">{productName}</h4>
              <h6>Price: {productPrice} ETH</h6>
              <p className="pt-3">{productDesc}</p>
              <button
                className="btn btn-secondary mt-2"
                onClick={() => setIsEditing(true)} // Toggle to edit mode
              >
                Edit Details
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-2 d-flex flex-column p-4">
        <div>
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
