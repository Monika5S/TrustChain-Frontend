// CreateProduct.js
import React, { useState } from "react";
import { db } from "../../firebase"; // Ensure correct path to firebase config
import { collection, addDoc } from "firebase/firestore";

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

      const productData = {
        name: productName,
        img_url: productImg,
        price: productPrice,
        desc: productDesc,
        status,
        storeId, // Ensure storeId is properly defined
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
    <div>
      <h1>Create a New Product</h1>
      {error && <p className="error">{error}</p>}
      <form>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={productImg}
          onChange={(e) => setProductImg(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="sold out">Sold Out</option>
        </select>
        <button type="button" onClick={handleCreateProduct}>
          Create Product
        </button>
      </form>
    </div>
  );
}
