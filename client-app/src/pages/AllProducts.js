// AllStoreProducts.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { DisplayProduct } from "../components";

export function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="all-store-products">
      <h2>All Digital Products</h2>
      {error && <p className="error">{error}</p>}
      <DisplayProduct products={products} />
    </div>
  );
}
