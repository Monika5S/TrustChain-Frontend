import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const allowedNgos = {
  ngo123: "ayushisen077@gmail.com",
  ngo789: "savy15.student@gmail.com",
};

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="d-flex align-items-center justify-content-center mt-2">
      <div className="m-5 bg-light-subtle p-4 border rounded w-50">
        <h2>Sign Up</h2>
        <form
          onSubmit={handleSignUp}
          className="pt-3 d-flex flex-column w-25 row-gap-3"
        >
          <div className="d-flex column-gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="d-flex">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="show-password-btn border border-0 bg-secondary text-white p-2"
              >
                {" "}
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="user">Customer</option>
            <option value="charity-org">Charity Organization</option>
            <option value="store">Cooperative Store</option>
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
          <button
            type="submit"
            className="rounded border border-0 p-2 mx-3 ms-0 bg-black text-white"
          >
            Sign Up
          </button>
        </form>
        {isCodeSent && (
          <p>
            A verification email has been sent to {email}. Please check your
            inbox.
          </p>
        )}
        <p className="pt-3 ">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <br />
        <Link to="/">Go Back</Link>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
