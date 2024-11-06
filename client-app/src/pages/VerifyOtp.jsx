import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="d-flex justify-content-center align-items-center ">
      <div className="mt-4 p-5 text-white w-50  border border-2 bg-dark">
        <h2>Email Sent For Verification!</h2>
        <button onClick={handleVerifyOtp} className="bg-dark text-white px-3">
          Verify Email
        </button>
        {error && <p>{error}</p>}

        <br />
        <br />
        <Link to="/sign-up">Go Back</Link>
      </div>
    </div>
  );
}

export default VerifyOtp;
