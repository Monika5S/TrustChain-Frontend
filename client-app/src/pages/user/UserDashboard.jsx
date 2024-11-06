import React from "react";
import "../../styles/Home.css";
import { Navbar, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="d-flex">
      <div className="d-sm-flex">
        <Sidebar user="customer" />
      </div>

      <div className="d-flex flex-column w-100">
        <Navbar />

        <div className="d-flex justify-content-center align-items-center my-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
