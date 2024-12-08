import { Navbar } from "./index";
import { Outlet } from "react-router-dom";
import Sidebar from "./Navigation/Sidebar";

function Layout() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />
      <div className="flex">
        {/* Sidebar with fixed width */}
        <div className="w-64 bg-gray-800 text-white hidden md:block">
          <Sidebar />
        </div>
        {/* Main content area */}
        <div className="flex-1  ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
