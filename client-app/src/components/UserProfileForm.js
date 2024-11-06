import React, { useState } from "react";

export function UserProfileForm({ profile, onSave }) {
  const [formData, setFormData] = useState({
    userName: profile?.userName || "",
    // email: profile?.email || "",
    // contactNumber: profile?.contactNumber || "",
    address: profile?.address || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.userName ||
      !formData.address
      //   !formData.email ||

      //   !formData.contactNumber ||
    ) {
      setError("All fields are required!");
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <p className="error">{error}</p>}
      <br />
      <label>Name:</label> <br />
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
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
      {/* <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div> */}
      {/* <div> */}
      <br />
      <br />
      <label>Address:</label>
      <br />
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      {/* </div> */}
      <br />
      <br />
      <button
        type="submit"
        className="p-2 bg-primary text-white rounded rounded-2"
      >
        {profile ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
}
