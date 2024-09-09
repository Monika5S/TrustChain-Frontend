import React, { useState } from "react";
import { auth } from "../firebase";
// import { updateEmail } from "firebase/auth";

function VerifyOtp() {
  // const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    try {
      //using the email link verification.
      const user = auth.currentUser;

      if (user && user.emailVerified) {
        // Email is already verified
        window.location.href = "/login";
      } else {
        // Handle email verification link
        await user.reload();
        if (user.emailVerified) {
          window.location.href = "/login";
        } else {
          setError("Email not verified.");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Email Sent For Verification!</h2>
      <button onClick={handleVerifyOtp}>Verify Email</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyOtp;
