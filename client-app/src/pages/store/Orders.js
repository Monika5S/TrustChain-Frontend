import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Ensure correct path to Firebase config
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [storeWallet, setStoreWallet] = useState(null); // To store the store's wallet address
  const [error, setError] = useState(""); // For error handling

  // Fetch store profile to get the storeWallet address
  const fetchStoreProfile = async (userId) => {
    try {
      const storeProfileDoc = doc(db, "storeProfiles", userId);
      const storeProfileSnap = await getDoc(storeProfileDoc);

      if (storeProfileSnap.exists()) {
        setStoreWallet(storeProfileSnap.data().store_address);
      } else {
        setError("Store profile not found.");
      }
    } catch (err) {
      console.error("Error fetching store profile:", err);
      setError("Error fetching store profile.");
    }
  };

  // Fetch user data from customerProfiles collection based on userId
  const fetchUserProfile = async (userId) => {
    try {
      const userProfileDoc = doc(db, "customerProfiles", userId);
      const userProfileSnap = await getDoc(userProfileDoc);

      if (userProfileSnap.exists()) {
        return userProfileSnap.data();
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return null;
    }
  };

  const fetchOrders = async () => {
    try {
      // Get the store's wallet address from the profile
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.uid) {
        await fetchStoreProfile(storedUser.uid);
      }

      const querySnapshot = await getDocs(collection(db, "payments"));
      const filteredOrders = [];

      for (const docSnap of querySnapshot.docs) {
        const order = docSnap.data();
        if (order.storeWallet === storeWallet) {
          const userProfile = await fetchUserProfile(order.userID);
          if (userProfile) {
            order.userName = userProfile.userName;
            order.userEmail = userProfile.email;
          }

          filteredOrders.push({
            id: docSnap.id,
            ...order,
          });
        }
      }

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [storeWallet]);

  return (
    <div className="orders-page p-5">
      <h2 className="text-white">Order Details</h2>
      {error && <p className="error text-red">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found for this store.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-item border border-3 rounded-5 p-4 my-4 mb-5 text-white"
            >
              <h5>Product Name: {order.productName}</h5>
              <p>Buyer Wallet: {order.userWallet}</p>
              <p>Name: {order.userName}</p>
              <p>Email: {order.userEmail}</p>
              <br />
              <p>Payment Status: Paid</p>
              <p>Amount Paid: {order.PaidAmount} ETH</p>
              <p>Donated Amount: {order.donatedAmount} ETH</p>
              {order.charityWallet && (
                <>
                  <p>Campaign: {order.campaignTitle}</p>
                  <p>Charity Wallet: {order.charityWallet}</p>
                </>
              )}
              <br />
              <p>Transaction ID: {order.transactionHash}</p>
              <p>
                Date:{" "}
                {new Date(order.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
