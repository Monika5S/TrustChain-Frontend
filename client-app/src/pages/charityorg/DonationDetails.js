import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import { db } from "../../firebase"; // Import your Firebase db configuration
import { collection, getDocs, query, where } from "firebase/firestore"; // Import necessary Firestore methods

export function DonationDetails() {
  const { address } = useStateContext(); // Getting the connected wallet address from context
  const [donationDetails, setDonationDetails] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch donation details
  const fetchDonationDetails = async () => {
    try {
      // Get all payment data from Firestore
      const paymentsQuery = query(collection(db, "payments"));
      const paymentsSnapshot = await getDocs(paymentsQuery);

      let donations = [];

      for (const doc of paymentsSnapshot.docs) {
        const paymentData = doc.data();

        // If the charity wallet or store wallet matches the connected wallet address, add the donation
        if (
          paymentData.charityWallet === address ||
          paymentData.storeWallet === address
        ) {
          // Fetch store and user details using the related IDs
          const storeRef = collection(db, "storeProfiles");
          const storeQuery = query(
            storeRef,
            where("storeAddress", "==", paymentData.storeWallet)
          );
          const storeSnapshot = await getDocs(storeQuery);

          let storeDetails = {};
          storeSnapshot.forEach((storeDoc) => {
            storeDetails = storeDoc.data();
          });

          // Fetch user details from customerProfiles using userID
          const userRef = collection(db, "customerProfiles");
          const userQuery = query(
            userRef,
            where("customerId", "==", paymentData.userID)
          );
          const userSnapshot = await getDocs(userQuery);

          let userDetails = {};
          userSnapshot.forEach((userDoc) => {
            userDetails = userDoc.data();
          });

          // Collecting the details of the donation including store info and user info
          donations.push({
            ...paymentData,
            storeName: storeDetails.storeName,
            storeEmail: storeDetails.email,
            userName: userDetails.userName,
            userEmail: userDetails.email,
            donationPercentage: storeDetails.donationPercentage,
            campaignTitle: paymentData.campaignTitle,
          });
        }
      }

      setDonationDetails(donations); // Update state with the fetched donation details
    } catch (error) {
      setError("Failed to fetch donation details.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (address) {
      fetchDonationDetails(); // Fetch donation details when the wallet address is available
    }
  }, [address]); // Re-run when the address changes

  return (
    <div className="container m-0 w-75 ">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2 className="mb-4 mx-0 text-white">Donation Details</h2>

      {donationDetails.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No donations found for this wallet.
        </div>
      ) : (
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Cooperative Store</th>
                  <th>Email</th>
                  <th>Donor Name</th>
                  <th>Email</th>
                  <th>Campaign</th>
                  <th>Amount Donated</th>
                  <th>Donation Percentage</th>
                  <th>Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {donationDetails.map((donation, index) => (
                  <tr key={index}>
                    <td>{donation.storeName}</td>
                    <td>{donation.storeEmail}</td>
                    <td>{donation.userName}</td>
                    <td>{donation.userEmail}</td>
                    <td>{donation.campaignTitle}</td>
                    <td>{donation.donatedAmount}ETH</td>
                    <td>{donation.donationPercentage}%</td>
                    <td>{donation.transactionHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
