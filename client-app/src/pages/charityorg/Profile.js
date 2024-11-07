import React, { useEffect, useState } from "react";
import charityorgData from "../../charityorgData.json";

export function Profile() {
  const [ngo, setNgo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedNgoID = storedUser.ngoId;
    if (!storedNgoID) {
      setError("Charity Organization ID not found!");
      return;
    }

    // Find NGO data from JSON file based on stored ngoid
    const ngoDetails = charityorgData.find((ngo) => ngo.ngoid === storedNgoID);

    if (ngoDetails) {
      setNgo(ngoDetails);
    } else {
      setError("NGO details not found.");
    }
  }, []);

  return (
    <div className="container mt-5 p-4 bg-dark text-white rounded shadow d-flex flex-column align-items-center justify-content-center w-50 mx-5">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : ngo ? (
        <div className="">
          <h2 className="text-center">NGO Profile</h2>
          <hr className="mb-4" />
          <div className="mb-4">
            <h4>{ngo.name}</h4>
            <p>
              <strong>Email:</strong> {ngo.email}
            </p>
            <p>
              <strong>Location:</strong> {ngo.location}
            </p>
            <p>
              <strong>Working Sector:</strong> {ngo.workingSector}
            </p>
            <p>
              <strong>About Us:</strong> {ngo.about}
            </p>
          </div>
          <div className="alert alert-warning mt-4">
            <p>
              <strong>Note:</strong> Please connect with MetaMask to view and
              manage your created campaigns.
            </p>
          </div>
        </div>
      ) : (
        <p>Loading NGO details...</p>
      )}
    </div>
  );
}
