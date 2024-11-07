import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export function PurchasedProducts() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.uid;

        if (!userId) {
          setError("User not authenticated.");
          return;
        }

        const productsSnapshot = await getDocs(collection(db, "products"));
        const allProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const paymentsSnapshot = await getDocs(collection(db, "payments"));
        const payments = paymentsSnapshot.docs.map((doc) => doc.data());

        const purchasedProductDetails = payments
          .filter((payment) => payment.userID === userId)
          .map((payment) => ({
            productName: payment.productName,
            storeWallet: payment.storeWallet,
          }));

        const userPurchasedProducts = purchasedProductDetails
          .map((purchase) =>
            allProducts.find(
              (product) =>
                product.name === purchase.productName &&
                product.store_address === purchase.storeWallet
            )
          )
          .filter(Boolean);

        if (userPurchasedProducts.length === 0) {
          setError("");
        } else {
          setPurchasedProducts(userPurchasedProducts);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchPurchasedProducts();
  }, []);

  return (
    <div className="purchased-products container py-4">
      <h2 className="text-center text-white mb-4">Your Purchased Products</h2>

      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row p-5">
        {purchasedProducts.length > 0 ? (
          purchasedProducts.map((product, index) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={index}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 bg-dark text-white border-0 shadow-sm">
                {product.img_url && (
                  <img
                    src={product.img_url}
                    alt={product.name}
                    className="card-img-top rounded-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.desc}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <span>Price: {product.price} ETH</span>
                    <span>Status: {product.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No products found.</p>
        )}
      </div>
    </div>
  );
}
