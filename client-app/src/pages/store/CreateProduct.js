import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { CustomButton } from "../../components";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

export function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [status, setStatus] = useState("available");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateProduct = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storeId = storedUser?.uid;

      if (!storeId) {
        throw new Error("Store ID is missing.");
      }

      // Fetch store profile to get the cause
      const storeProfileDoc = doc(db, "storeProfiles", storedUser.uid);
      const storeDocSnap = await getDoc(storeProfileDoc);
      const storeProfileData = storeDocSnap.exists()
        ? storeDocSnap.data()
        : null;

      const productData = {
        name: productName,
        img_url: productImg,
        price: productPrice,
        desc: productDesc,
        status,
        storeId,
        charity_org: storeProfileData.charity_org,
        store_address: storeProfileData.store_address,
        support_cause: storeProfileData.cause || "all",
        donation_percentage: storeProfileData.donationPercentage || 1,
        createdAt: new Date(),
      };

      console.log("Creating Product with Data:", productData);

      await addDoc(collection(db, "products"), productData).then(() => {
        alert("Product created successfully.");
      });
      navigate("/store-dashboard/products/");
    } catch (error) {
      console.error("Failed to create product:", error.message);
      setError(`Failed to create product. Please try again. ${error.message}`);
    }
  };

  return (
    <div className="d-flex text-white flex-column m-5 ">
      <h1 className="p-3">Create a New Product</h1>
      {error && <p className="error">{error}</p>}
      <form className="d-flex flex-column px-5 py-4 border rounded">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />

        <label>Product Image</label>
        <input
          type="text"
          placeholder="Image URL"
          value={productImg}
          onChange={(e) => setProductImg(e.target.value)}
        />
        <br />

        <label>Product Price</label>
        <input
          type="text"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <br />

        <label>Product Description</label>
        <textarea
          placeholder="Description"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
        />
        <br />

        <label>Product Availability</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="sold out">Sold Out</option>
        </select>
        <br />
        <button
          type="button"
          className="p-2 rounded w-50 text-white bg-primary border border-0"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
