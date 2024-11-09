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
        <div className="p-4 bg-dark text-white rounded shadow-sm">
          <h2 className="mb-4">Profile Details</h2>

          <div className="mb-3">
            <strong>Store Name:</strong> <span>{profile?.storeName}</span>
          </div>

          <div className="mb-3">
            <strong>Email:</strong> <span>{profile?.email}</span>
          </div>

          <div className="mb-3">
            <strong>Cause:</strong> <span>{profile?.cause}</span>
          </div>

          <div className="mb-3">
            <strong>Support Charity Org:</strong>{" "}
            <span>{profile?.charity_org}</span>
          </div>

          <div className="mb-3">
            <strong>Donation Percentage:</strong>{" "}
            <span>{profile?.donationPercentage}%</span>
          </div>

          <div className="mb-3">
            <strong>MetaMask Wallet Address:</strong>{" "}
            <span>{profile?.store_address}</span>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-warning mt-3 w-50"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
}
