// src/components/ProfileForm.js
import React, { useState } from "react";

export function ProfileForm({ profile, onSave }) {
  const [formData, setFormData] = useState({
    storeName: profile?.storeName || "",
    // email: profile?.email || "",
    cause: profile?.cause || "",
    donationPercentage: profile?.donationPercentage || 1,
  });
  const [error, setError] = useState("");

  const causes = [
    "Education",
    "Health",
    "Environment",
    "Animal Welfare",
    "Poverty Alleviation",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate donation percentage
    if (formData.donationPercentage < 1 || formData.donationPercentage > 5) {
      setError("Donation percentage must be between 1% and 5%.");
      return;
    }

    onSave(formData); // Save the profile data
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <p className="error">{error}</p>}
      <div>
        <label>Store Name:</label>
        <input
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div> */}
      <div>
        <label>Cause:</label>
        <select
          name="cause"
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
        <label>Donation Percentage (1% - 5%):</label>
        <input
          type="number"
          name="donationPercentage"
          value={formData.donationPercentage}
          onChange={handleChange}
          min="1"
          max="5"
        />
      </div>
      <button type="submit">
        {profile ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
}
