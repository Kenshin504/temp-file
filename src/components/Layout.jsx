import { useState, useEffect } from "react";
import "../styles/nav.css";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

function Layout({ children }) {
  return (
    <>
      <TopBar />
      <SideBar />
      <div className="content-section fade-in">{children}</div>
    </>
  );
}

export default Layout;
