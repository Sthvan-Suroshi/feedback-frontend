import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/Slices/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth?.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className="text-black border-x-0 border bg-slate-100 flex px-10 py-4 justify-between items-center sticky top-0 z-[999] shadow-lg">
      <div className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        Feedback Portal
      </div>

      <div className="basis-24 flex justify-end">
        {user ? (
          <div className="font-bold flex gap-5 justify-center items-center">
            <p>{user.fullName}</p>
            <button
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              type="submit"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              type="submit"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
