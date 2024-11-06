import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Fetch user details from Firestore
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userWithDetails = {
          uid: user.uid,
          email: user.email,
          ...userData,
        };

        console.log("Navigating with user data:", userWithDetails);
        localStorage.setItem("user", JSON.stringify(userWithDetails));
        // Redirect based on user role
        if (userData.category === "charity-org") {
          navigate("/charity-dashboard");
        } else if (userData.category === "store") {
          navigate("/store-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setError("No user data found.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-2">
      <div className="m-5 bg-light-subtle p-4 border rounded w-50">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="pt-3">
          <div className="mb-3 d-flex flex-row">
            <input
              className="p-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type={showPassword ? "text" : "password"} // To show password
              className="p-2 ms-2"
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
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="btn bg-dark text-white rounded px-3">
            Login
          </button>
        </form>
        <p className="pt-3 ">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
        <br />
        <Link to="/">Go Back</Link>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
