import React from "react";
import NavBar from "./Navigation/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="app">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main">
        <div className="routes">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
