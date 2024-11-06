import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logo, logout, sun } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, isActive, name, imgUrl, handleClick, disabled }) => (
  <div
    className={`Icon icon-wrapper p-2 m-3 rounded d-flex justify-content-center align-items-center cursor-pointer ${
      isActive === name ? "bg-secondary" : "bg-none grayscale"
    } ${!disabled ? "cursor-pointer" : ""} ${styles}`}
    onClick={handleClick}
  >
    <img src={imgUrl} alt="icon" />
  </div>
);

export function Sidebar(props) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  var navlinks_user;

  // Define navlinks based on the user role
  if (props.user === "customer") {
    navlinks_user = navlinks.customer;
  } else if (props.user === "store") {
    navlinks_user = navlinks.store;
  } else {
    navlinks_user = navlinks.charityOrg;
  }

  // Handle Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="Sidebar d-flex flex-column position-sticky top-0 vh-100">
      <Link to="/" className="text-decoration-none mb-5">
        <Icon styles="bg-dark border border-0 p-3 mb-0" imgUrl={logo} />
        <p className="mb-0 ps-3 mt-0 pt-0 fs-5 text-subtle-dark fw-bold">
          TRUSTCHAIN
        </p>
      </Link>

      <div className="nav-links d-flex flex-column justify-content-between align-items-center bg-transparent rounded p-1 m-2 ">
        {navlinks_user.map((link) => (
          <Icon
            key={link.name}
            {...link}
            isActive={isActive}
            handleClick={() => {
              setIsActive(link.name);
              navigate(link.link);
            }}
          />
        ))}

        <button
          className="logout-button btn btn-primary mt-5 p-2 rounded"
          onClick={handleLogout}
        >
          <img src={logout} alt="Logout" className="me-2" />
        </button>
      </div>
    </div>
  );
}
