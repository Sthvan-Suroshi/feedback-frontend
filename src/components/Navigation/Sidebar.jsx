import { NavLink } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { MdGridView } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaWpforms } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Sidebar = () => {
  const accountType = useSelector((state) => state.auth.accountType);

  const navItems = [
    {
      name: "Upload Feedback",
      icon: <GoUpload />,
      path: "/upload-feedback",
      roles: ["student"]
    },
    {
      name: "Your Feedbacks",
      icon: <MdGridView />,
      path: "/view-responses",
      roles: ["student"]
    },
    {
      name: "View Form",
      icon: <FaWpforms />,
      path: "/view-forms",
      roles: ["student"]
    },
    {
      name: "All Images",
      icon: <IoHomeOutline />,
      path: "/all-images",
      roles: ["admin"]
    },
    {
      name: "Create Form",
      icon: <FaWpforms />,
      path: "/create-form",
      roles: ["instructor"]
    },
    {
      name: "Your Forms",
      icon: <FaWpforms />,
      path: "/your-forms",
      roles: ["instructor"]
    },
    {
      name: "All Forms",
      icon: <FaWpforms />,
      path: "/admin/view-forms",
      roles: ["admin"]
    },
    {
      name: "Create Admin",
      icon: <FaRegUser />,
      path: "/add-admin",
      roles: ["admin"]
    }
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(accountType)
  );

  return (
    <div className="w-[15vw] border-slate-400 border-x-2 h-screen">
      <div className="flex flex-col gap-2">
        {filteredNavItems.map((item) => (
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
