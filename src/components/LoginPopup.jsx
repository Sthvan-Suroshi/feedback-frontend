import React from "react";
import { Link } from "react-router-dom";

const LoginPopup = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 bg-opacity-75 z-[999]">
      <div className="bg-slate-100 border rounded-lg p-5 text-center">
        <p className="text-xl font-medium mb-2 ">Login or Signup to continue</p>
        <div className="flex justify-around items-center gap-3">
          <Link to="/signin" className="basis-1/2">
            <button className="bg-slate-800 w-full py-2 px-4  text-lg rounded outline outline-1 text-slate-100">
              Login
            </button>
          </Link>
          <Link to="/signup" className="basis-1/2">
            <button className="bg-slate-800 w-full py-2 px-4  text-lg rounded text-slate-100 outline outline-1">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
