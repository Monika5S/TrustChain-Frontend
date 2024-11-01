import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ProfileForm } from "../../components";

export function StoreProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the stored user from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const fetchProfile = async () => {
        try {
          // Fetch the profile document based on the authenticated user's UID
          const profileDoc = doc(db, "storeProfiles", storedUser.uid);
          const docSnap = await getDoc(profileDoc);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            setIsEditing(true); // Set to editing mode if no profile is found
          }
        } catch (err) {
          setError("Failed to load profile.");
        }
      };

      fetchProfile();
    }
  }, []);

  // Handles saving the profile data
  const handleSaveProfile = async (profileData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const profileDoc = doc(db, "storeProfiles", storedUser.uid);

      // Ensure email and storeId are always set from the authenticated user's data
      const dataToSave = {
        ...profileData,
        email: storedUser.email, // Ensure email is the authenticated user's email
        storeId: storedUser.uid,
      };

      // Update or set the profile data in Firestore
      if (profile) {
        await updateDoc(profileDoc, dataToSave);
      } else {
        await setDoc(profileDoc, dataToSave);
      }

      // Update the state and close the editing mode
      setProfile(dataToSave);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="store-profile text-white">
      <h1>Store Profile</h1>
      {error && <p className="error">{error}</p>}

      {isEditing ? (
        // Pass profile data to the ProfileForm with the handleSaveProfile callback
        <ProfileForm profile={profile} onSave={handleSaveProfile} />
      ) : (
        <div className="p-4 text-white">
          <h2>Profile Details</h2>
          <p>Store Name: {profile?.storeName}</p>
          <p>Email: {profile?.email}</p>
          <p>Cause: {profile?.cause}</p>
          <p>Support Charity Org: {profile?.charity_org}</p>
          <p>Donation Percentage: {profile?.donationPercentage}%</p>
          <p>MetaMask Wallet Address: {profile?.store_address}</p>
          <button onClick={() => setIsEditing(true)}>Update Profile</button>
        </div>
      )}
    </div>
  );
}
