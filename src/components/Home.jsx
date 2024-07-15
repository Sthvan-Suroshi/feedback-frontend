import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="w-screen mt-10 flex justify-center items-center gap-3">
        <Link
          to={"/signin"}
          className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
          type="submit"
        >
          Login
        </Link>

        <Link
          to={"/signup"}
          className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
          type="submit"
        >
          SignUp
        </Link>
      </div>
    </>
  );
}

export default Home;
