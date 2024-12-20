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
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-[#f0f4f8] text-[#3e3e65] shadow-xl transition-all duration-300 ease-in-out md:w-64 overflow-x-hidden`}
      >
        <div className="p-2 mt-5">
          <h2 className="text-2xl font-bold mb-6 text-[#214e82]">Dashboard</h2>
          <nav>
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 mt-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#2e61a8] text-white"
                      : "text-[#3e3e65] hover:bg-[#d0e1f9]"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
  