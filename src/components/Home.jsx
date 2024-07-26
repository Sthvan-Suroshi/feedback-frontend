import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeImg from "../../src/assets/Images/home.png";
import { useSelector } from "react-redux";
function Home() {
  const status = useSelector((state) => state.auth.status);
  const accountType = useSelector((state) => state.auth.accountType);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      if (accountType === "admin") {
        navigate("/all-images");
      }

      if (accountType === "instructor") {
        navigate("/create-form");
      }

      if (accountType === "student") {
        navigate("/upload-feedback");
      }
    }
  }, [status]);

  return (
    <>
      <div className="content flex w-100% object-cover items-center pt-10">
        <div className="flex flex-col p-[2rem] gap-[0.5em] flex-wrap basis-[65%] ">
          <h1 className="font-[650]  text-[5rem] tracking-tight leading-none">
            Enhance Learning Through Feedback
          </h1>

          <p className="text-xl ">
            Our anonymous feedback system empowers the institution to collect
            valuable insights from students and staff, helping you improve
            programs and elevate educational outcomes
          </p>
          <div className="flex flex-row gap-4 text-center">
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
      <footer className="justify-center text-center fixed bottom-0 w-full mb-3">
        &copy; 2024 Feedback
      </footer>
    </>
  );
}

export default Home;
