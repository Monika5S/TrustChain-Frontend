import React, { useState } from "react";
import { auth } from "../firebase";

function VerifyOtp() {
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const user = auth.currentUser;

      if (user && user.emailVerified) {
        window.location.href = "/login";
      } else {
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
