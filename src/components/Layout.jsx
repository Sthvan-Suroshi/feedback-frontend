import React from "react";
import { Navbar } from "./index";
import { Outlet } from "react-router-dom";
import Sidebar from "./Navigation/Sidebar";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <div className="text-white ">
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
