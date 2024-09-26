// CreateProduct.js
import React, { useState } from "react";
import { db } from "../../firebase"; // Ensure correct path to firebase config
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

export function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [status, setStatus] = useState("available");
  const [error, setError] = useState("");

  const handleCreateProduct = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storeId = storedUser?.uid; // Fetch storeId or UID of the store owner

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
        storeId, // Ensure storeId is properly defined
        support_cause: storeProfileData.cause || "all",
        donation_percentage: storeProfileData.donationPercentage || 1,
        createdAt: new Date(),
      };

      console.log("Creating Product with Data:", productData);

      await addDoc(collection(db, "products"), productData);
      alert("Product created successfully.");
    } catch (error) {
      console.error("Failed to create product:", error.message);
      setError(`Failed to create product. Please try again. ${error.message}`);
    }
  };

  return (
    <div className="d-flex flex-column m-5 p-4 border rounded">
      <h1>Create a New Product</h1>
      {error && <p className="error">{error}</p>}
      <form>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Image URL"
          value={productImg}
          onChange={(e) => setProductImg(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Description"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
        />
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="sold out">Sold Out</option>
        </select>
        <br />
        <button type="button" onClick={handleCreateProduct}>
          Create Product
        </button>
      </form>
    </div>
  );
}
