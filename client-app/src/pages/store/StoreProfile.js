import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
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

  // Updates the products with the new profile data
  const updateProductsWithProfileData = async (
    storeId,
    charity_org,
    donationPercentage
  ) => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("storeId", "==", storeId));
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        const productRef = doc.ref;
        batch.update(productRef, {
          charity_org: charity_org,
          donation_percentage: donationPercentage,
        });
      });

      await batch.commit();
      console.log("Products successfully updated with new profile data.");
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  // Handles saving the profile data
  const handleSaveProfile = async (profileData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const profileDoc = doc(db, "storeProfiles", storedUser.uid);

      const dataToSave = {
        ...profileData,
        email: storedUser.email,
        storeId: storedUser.uid,
      };

      // Save store profile data
      if (profile) {
        await updateDoc(profileDoc, dataToSave);
      } else {
        await setDoc(profileDoc, dataToSave);
      }

      // Update products with new profile values
      await updateProductsWithProfileData(
        storedUser.uid,
        profileData.charity_org,
        profileData.donationPercentage
      );

      setProfile(dataToSave);
      setIsEditing(false);
      setError("");
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="store-profile text-white">
      <h1>Store Profile</h1>
      {error && <p className="error">{error}</p>}

      {isEditing ? (
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
