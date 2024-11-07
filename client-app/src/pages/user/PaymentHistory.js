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

  // Simple print function
  const printTransaction = (paymentId) => {
    const content = document.getElementById(paymentId);
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(content.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="payment-history-page w-100 p-4">
      <h1 className="text-center text-white mb-4">Transaction Details</h1>
      {error && <p className="text-center text-white">{error}</p>}
      {paymentHistory.length === 0 && !error && (
        <p className="text-center text-white">No Payment History Available</p>
      )}
      {paymentHistory.length > 0 && (
        <div className="history-table w-100 text-white p-3">
          {paymentHistory.slice(0, visiblePayments).map((payment) => (
            <div
              key={payment.id}
              className="payment-item border-bottom py-3 mb-3 p-4 rounded shadow-sm"
              id={payment.id}
            >
              <div>
                <h4 className="text-primary">Product: {payment.productName}</h4>
                <p>
                  <strong>Price:</strong> {payment.productPrice} ETH
                </p>
                <p>
                  <strong>Paid to:</strong> {payment.storeWallet}
                </p>
                <p>
                  <strong>Transaction Id:</strong> {payment.transactionHash}
                </p>

                <h6 className="text-success">
                  Cooperative Store Supported Charity Donation
                </h6>
                <p>
                  <strong>Campaign:</strong> {payment.campaignTitle}
                </p>
                <p>
                  <strong>Campaign Owner (Metamask):</strong>{" "}
                  {payment.charityWallet}
                </p>
                <p>
                  <strong>Donation:</strong> {payment.donatedAmount} ETH
                </p>

                <p>
                  <strong>Timestamp:</strong>{" "}
                  {payment.timestamp
                    ? new Date(
                        payment.timestamp.seconds * 1000
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Print Button */}
              <button
                onClick={() => printTransaction(payment.id)}
                className="btn btn-secondary mt-3"
              >
                Print
              </button>
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
