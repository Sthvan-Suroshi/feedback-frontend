import React from "react";
import { NavLink } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { MdGridView } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaWpforms } from "react-icons/fa";

const Sidebar = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
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
    {
      name: "All Images",
      icon: <IoHomeOutline />,
      path: "/all-images",
      admin: true,
    },
    {
      name: "Create Form",
      icon: <FaWpforms />,
      path: "/create-form",
      admin: false,
    },
  ];

  const filteredNavItems = navItems.filter((item) => item.admin === isAdmin);

  return (
    <div className="w-[15vw] border-slate-400 border-x-2 h-screen">
      <div className="flex flex-col gap-2">
        {filteredNavItems &&
          filteredNavItems.map((item) => (
            <div key={item.name}>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
