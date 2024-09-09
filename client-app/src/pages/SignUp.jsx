import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const allowedNgos = {
  ngo123: "ngo123@example.com",
  ngo456: "ngo456@example.com",
  ngo789: "savy15.student@gmail.com",
};

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (category === "charity-org") {
        // Check if ngoId and email match the allowed NGOs
        if (allowedNgos[ngoId] !== email) {
          setError("Invalid NGO ID or email.");
          return;
        }
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Store user details in Firestore using the UID as the document ID
      await setDoc(doc(db, "users", user.uid), {
        email,
        category,
        ngoId: category === "charity-org" ? ngoId : null,
      });

      setIsCodeSent(true);
      window.location.href = "/verify-otp"; // Redirect to email verification page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="user">User</option>
          <option value="charity-org">Charity Organization</option>
          <option value="store">Store</option>
        </select>
        {category === "charity-org" && (
          <input
            type="text"
            placeholder="NGO ID"
            value={ngoId}
            onChange={(e) => setNgoId(e.target.value)}
            required
          />
        )}
        <button type="submit">Sign Up</button>
      </form>
      {isCodeSent && (
        <p>
          A verification email has been sent to {email}. Please check your
          inbox.
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignUp;
