import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
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

export function Sidebar({ user, org, store }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="Sidebar d-flex flex-column ">
      <Link to="/">
        <Icon styles="bg-dark p-3" imgUrl={logo} />
      </Link>

      <div className="nav-links d-flex flex-column justify-content-between align-items-center bg-transparent rounded p-1 m-2 ">
        {navlinks.map((link) => (
          <Icon
            key={link.name} //for mapping
            {...link}
            isActive={isActive}
            handleClick={() => {
              if (user && link.name === "campaign") {
                link.disabled = true;
              }
              if (org && link.name === "store") {
                link.disabled = true;
              }
              if (!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }}
          />
        ))}

        <Icon styles="mt-5 bg-dark shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
}
