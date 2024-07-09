import React from "react";
import { NavLink } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { MdGridView } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  const navItems = [
    {
      name: "Upload Feedback",
      icon: <GoUpload />,
      path: "/upload-feedback",
      admin: false,
    },
    {
      name: "Your Feedbacks",
      icon: <MdGridView />,
      path: "/view-responses",
      admin: false,
    },
  ];
  return (
    <div className="w-[15vw] border-slate-400 border-x-2 h-screen">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] bg-slate-400 hover:bg-[#27374d] hover:text-[#dde6ed]"
                  : "flex items-center gap-2 text-base no-underline font-semibold p-2 transition ease-in-out duration-300 text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed]"
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
