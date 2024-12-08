import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/Slices/authSlice";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const user = useSelector((state) => state.auth?.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#e8ecf4] text-[#2e61a8] shadow-lg sticky top-0 z-[999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              Feedback Portal
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-[#2e61a8]" />
                    <span>{user.fullName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-[#214e82] hover:bg-[#2e61a8] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/signin")}
                    className="bg-[#214e82] hover:bg-[#2e61a8] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-[#214e82] hover:bg-[#2e61a8] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-white px-3 py-2">
                  <FaUser className="text-[#2e61a8]" />
                  <span>{user.fullName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-[#2e61a8] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/signin");
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:bg-[#2e61a8] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300 ease-in-out"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:bg-[#2e61a8] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300 ease-in-out"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;