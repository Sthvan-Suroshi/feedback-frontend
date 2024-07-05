import React from "react";
import { BiDetail } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[15vw] border-slate-400 border-x-2 h-screen">
      <div className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-5 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
              : "flex items-center gap-5 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
          }
        >
          <BiDetail />
          Home
        </NavLink>

        <NavLink
          to="/upload-feedback"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-5 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
              : "flex items-center gap-5 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
          }
        >
          <BiDetail />
          Upload Image
        </NavLink>

        <NavLink
          to="/view"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-5 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
              : "flex items-center gap-5 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
          }
        >
          <BiDetail />
          View Image Feedback
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
