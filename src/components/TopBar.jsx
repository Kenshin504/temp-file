import "../styles/nav.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";

function TopBar() {
  const { imageSrc, fullName } = useContext(UserContext); // Access context
  const currentPath = window.location.pathname;

  const isActive = (path) => (currentPath === path ? "active-link" : "");

  return (
    <>
      <div className="nav-top">
        <div className="top-content">
          <div className="inventory-name">MK Inventory Ledger</div>
          <div className="user_top-bar">
            <div className="user-dropdown">
              <button className="user-settings">
                <img src={imageSrc} className="user-logo" alt="User Avatar" />
              </button>
              <div className="dropdown-content">
                <Link to="/account">Edit Profile</Link>
                <Link to="/">Log Out</Link>
              </div>
            </div>
            <b>{fullName}</b> {/* You can display other user data here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
