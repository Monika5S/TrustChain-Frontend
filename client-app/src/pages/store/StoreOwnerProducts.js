// StoreOwnerProducts.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { DisplayProduct } from "../../components";

export function StoreOwnerProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const ownerId = storedUser?.uid;

  useEffect(() => {
    const fetchStoreOwnerProducts = async () => {
      try {
        // Fetch all products
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter products based on ownerId
        const ownerProducts = allProducts.filter(
          (product) => product.storeId === ownerId
        );

        setProducts(ownerProducts);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Failed to fetch products. Please try again.");
      }
    };

    if (ownerId) {
      fetchStoreOwnerProducts();
    } else {
      setError("User not authenticated.");
    }
  }, [ownerId]);

  return (
    <div className="store-owner-products w-100 text-center text-white">
      {/* <h2>Your Products</h2> */}
      {error && <p className="error">{error}</p>}
      <DisplayProduct products={products} store={true} />
    </div>
  );
}
