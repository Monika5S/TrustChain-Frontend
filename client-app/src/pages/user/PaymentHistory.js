import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [visiblePayments, setVisiblePayments] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.uid;

        if (!userId) {
          setError("User not authenticated.");
          return;
        }

        console.log("Fetching payment history for user:", userId);

        // Fetch all payments
        const querySnapshot = await getDocs(collection(db, "payments"));
        const allPayments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("All fetched payments:", allPayments);

        // Filter payments based on userId and sort by timestamp (latest first)
        const userPayments = allPayments
          .filter((payment) => payment.userID === userId)
          .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds); // Sort by timestamp

        console.log("Filtered and sorted user payments:", userPayments);

        if (userPayments.length === 0) {
          setError("No payment history available.");
        } else {
          setPaymentHistory(userPayments);
        }
      } catch (err) {
        console.error("Error fetching payment history:", err.message);
        setError("Failed to fetch payment history. Please try again.");
      }
    };

    fetchPaymentHistory();
  }, []);

  // Function to load more payments
  const loadMorePayments = () => {
    setVisiblePayments((prevVisible) => prevVisible + 5);
  };

  return (
    <div className="payment-history-page w-100 p-4">
      <h1 className="text-center text-white">Transaction Details</h1>
      {error && <p className="text-center text-white">{error}</p>}
      {paymentHistory.length === 0 && !error && (
        <p className="text-center text-white">No Payment History Available</p>
      )}
      {paymentHistory.length > 0 && (
        <div className="history-table w-100 text-white">
          {paymentHistory.slice(0, visiblePayments).map((payment) => (
            <div key={payment.id} className="payment-item border-bottom py-3">
              <h4 className="text-white">Product: {payment.productName}</h4>
              <p>Price: {payment.productPrice} ETH</p>
              <p>Paid to: {payment.storeWallet}</p>
              <p>Transaction Id: {payment.transactionHash}</p>

              <h6>Campaign Donation Data</h6>
              <p>Campaign: {payment.campaignTitle}</p>
              <p>Campaign Owner(Metamask): {payment.charityWallet}</p>
              {/* <p>Campaign ID: {payment.campaignId}</p> */}
              <p>Donation: {payment.donatedAmount} ETH</p>

              <p>
                Timestamp:{" "}
                {payment.timestamp
                  ? new Date(
                      payment.timestamp.seconds * 1000
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}
          {visiblePayments < paymentHistory.length && (
            <button onClick={loadMorePayments} className="btn btn-primary mt-3">
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
