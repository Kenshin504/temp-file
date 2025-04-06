import { useState, useEffect } from "react";
import "../styles/nav.css";
import Account from "../pages/Account";
import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Layout({ children }) {
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
                <img
                  src={imageSrc} // Use imageSrc from context
                  className="user-logo"
                  alt="User Avatar"
                />
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

      <div className="side-bar">
        <div className="side-content">
          <div className="logo-section">
            <Link to="/dashboard">
              <div className="logo-part"></div>
            </Link>
            <h3 className="welcome-text">Welcome User!</h3>
          </div>

          <div className="links">
            <div className="link-item">
              <Link to="/dashboard" className={isActive("/dashboard")}>
                Dashboard
              </Link>
            </div>
            <div className="link-item">
              <Link to="/products" className={isActive("/products")}>
                Products
              </Link>
            </div>
            <div className="link-item">
              <Link to="/stocks" className={isActive("/stocks")}>
                Stocks
              </Link>
            </div>
            <div className="link-item">
              <Link to="/sales" className={isActive("/sales")}>
                Sales
              </Link>
            </div>
            <div className="link-item">
              <Link to="/account" className={isActive("/account")}>
                Account
              </Link>
            </div>
            <div className="link-item">
              <Link to="/about" className={isActive("/about")}>
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section fade-in">{children}</div>
    </>
  );
}

export default Layout;
