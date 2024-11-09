import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
// import { ethers } from "ethers";

export function ProfileForm({ profile, onSave }) {
  const [formData, setFormData] = useState({
    storeName: profile?.storeName || "",
    cause: profile?.cause || "",
    charity_org: profile?.charity_org || "",
    donationPercentage: profile?.donationPercentage || 1,
    store_address: profile?.store_address || "",
  });
  const [error, setError] = useState("");
  const [isAddressVerified, setIsAddressVerified] = useState(false); // To track if the address is verified

  const { contract, address, getCharityOrgs } = useStateContext();

  const causes = [
    "Education",
    "Health",
    "Environment",
    "Animal Welfare",
    "Poverty Alleviation",
  ];

  // Fetch charity organizations
  const [charity_orgs, setCharityOrgs] = useState([]);
  async function fetchCharityOrgs() {
    try {
      const orgs = await getCharityOrgs();
      setCharityOrgs(orgs);
    } catch (error) {
      console.error("Failed to fetch charity organizations:", error);
    }
  }

  useEffect(() => {
    if (contract) {
      fetchCharityOrgs();
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyAddress = () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to proceed.");
      return;
    }

    // Check if the user is connected
    if (!address) {
      alert("Please connect your Metamask wallet.");
      return;
    }
    // Check if the MetaMask address matches the store address
    if (address.toLowerCase() === formData.store_address.toLowerCase()) {
      setIsAddressVerified(true);
      setError("");
    } else {
      setIsAddressVerified(false);
      setError("MetaMask address does not match the provided store address.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate donation percentage
    if (formData.donationPercentage < 0 || formData.donationPercentage > 5) {
      setError("Donation percentage must be between 1% and 5%.");
      return;
    }

    // Proceed to save if the address is verified
    if (!isAddressVerified) {
      setError("Please verify the MetaMask address before submitting.");
      return;
    }

    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form p-4 w-100 border rounded shadow-sm"
    >
      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="storeName" className="form-label">
          Store Name
        </label>
        <input
          type="text"
          id="storeName"
          name="storeName"
          className="form-control"
          value={formData.storeName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="charity_org" className="form-label">
          Support Charity Organization
        </label>
        <select
          id="charity_org"
          name="charity_org"
          className="form-select"
          value={formData.charity_org}
          onChange={handleChange}
        >
          <option value="">Select a Campaign</option>
          {charity_orgs.map((charity_org) => (
            <option key={charity_org} value={charity_org}>
              {charity_org}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 d-flex justify-content-between column-gap-3">
        <div>
          <label htmlFor="cause" className="form-label">
            Cause
          </label>
          <select
            id="cause"
            name="cause"
            className="form-select"
            value={formData.cause}
            onChange={handleChange}
            required
          >
            <option value="">Select a Cause</option>
            {causes.map((cause) => (
              <option key={cause} value={cause}>
                {cause}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="donationPercentage" className="form-label">
            Donation Percentage (0% - 5%)
          </label>
          <input
            type="number"
            id="donationPercentage"
            name="donationPercentage"
            className="form-control"
            value={formData.donationPercentage}
            onChange={handleChange}
            min="0"
            max="5"
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="store_address" className="form-label">
          MetaMask Wallet Address
        </label>
        <div className="d-flex justify-content-between column-gap-3">
          <input
            type="text"
            id="store_address"
            name="store_address"
            className="form-control px-2"
            value={formData.store_address}
            onChange={handleChange}
            required
          />

          {/* Button to verify address */}

          <button
            type="button"
            onClick={handleVerifyAddress}
            className={`btn ${
              isAddressVerified ? "btn-success" : "btn-danger"
            }`}
          >
            {isAddressVerified ? "Address Verified" : "Verify Address"}
          </button>
        </div>
      </div>

      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isAddressVerified}
        >
          {profile ? "Update Profile" : "Create Profile"}
        </button>
      </div>
    </form>
  );
}
