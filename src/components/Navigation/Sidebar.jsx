import React from "react";
import { NavLink } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { MdGridView } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="w-[15vw] border-slate-400 border-x-2 h-screen">
      <div className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
              : "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
          }
        >
          <IoHomeOutline />
          Home
        </NavLink>

        <NavLink
          to="/upload-feedback"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
              : "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
          }
        >
          <GoUpload />
          Upload Image
        </NavLink>

        <NavLink
          to="/view-responses"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
              : "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
          }
        >
          <MdGridView />
          View All Feedbacks
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
