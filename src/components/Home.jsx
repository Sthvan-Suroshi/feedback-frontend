import React from "react";
import { Link } from "react-router-dom";
import HomeImg from '../../src/assets/Images/home.png'
function Home() {
  return (
    <>
      <div className="w-screen mt-8 ">
        <div className="content flex  w-100% h-30% object-cover items-center">
            <div className="flex flex-col p-[2rem] gap-[0.5em] flex-wrap basis-[65%] ">
                <h1 className="font-[650]  text-[5rem] tracking-tight leading-none">Enhance Learning Through Feedback</h1>
                {/* <p className="text-xl">Want to pick the best of Customer Feedback Tools? You’re at the right place!</p> */}
                <p className="text-xl ">Our anonymous feedback system empowers your institution to collect valuable insights from students and staff, helping you improve programs and elevate educational outcomes</p>
                <div className="flex flex-row gap-4 text-center">
                {/* className="group/btn mr-1 flex w-auto items-center  gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]" */}
                <Link
                  to={"/signin"}
                  className="group/btn inline-flex w-24 text-lg items-center justify-center bg-black text-white rounded-md bg-primary px-4 py-2  font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
                  type="submit"
                  >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="group/btn inline-flex w-24 text-lg items-center justify-center bg-black text-white rounded-md bg-primary px-4 py-2  font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
                  type="submit"
                >
                  SignUp
                </Link>
                </div>
             </div>
             <div className="HomeImg w-2/6 ml-6 basis-[35%]">
                <img src={HomeImg} alt="" />
             </div>
        </div>
        <footer className="justify-center text-center">
        &copy; 2024 Feedback
        </footer>
      </div>
    </>
  );
}

export default Home;
