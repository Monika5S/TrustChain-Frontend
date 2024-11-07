import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserProfileForm } from "../../components";

export function UserProfile() {
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
          const profileDoc = doc(db, "customerProfiles", storedUser.uid);
          const docSnap = await getDoc(profileDoc);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            setIsEditing(true);
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
      const profileDoc = doc(db, "customerProfiles", storedUser.uid);

      const dataToSave = {
        ...profileData,
        email: storedUser.email,
        customerId: storedUser.uid,
      };

      if (profile) {
        await updateDoc(profileDoc, dataToSave);
      } else {
        await setDoc(profileDoc, dataToSave);
      }

      setProfile(dataToSave);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="store-profile text-white">
      {/* <h1>Profile</h1> */}
      {error && <p className="error">{error}</p>}

      {isEditing ? (
        <UserProfileForm profile={profile} onSave={handleSaveProfile} />
      ) : (
        <div className="p-4 text-white">
          <h2>Profile Details</h2>
          <p>Name: {profile?.userName}</p>
          <p>Email: {profile?.email}</p>
          {/* <p>Contact: {profile?.contactNumber}</p> */}
          <p>Address: {profile?.address}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-primary text-white border border-0 rounded"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
}
