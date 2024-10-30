import { useNavigate, Link } from "react-router-dom";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/Slices/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";

function Signin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const login = async (details) => {
    setLoading(true);
    const res = await dispatch(loginUser(details));

    if (res.type === "loginUser/fulfilled") {
      toast.success("Logged in successfully");
      if (res.payload.accountType === "admin") {
        navigate("/all-images");
      }

      if (res.payload.accountType === "instructor") {
        navigate("/create-form");
      }

      if (res.payload.accountType === "student") {
        navigate("/upload-feedback");
      }
    } else {
      toast.error("Invalid credentials");
    }

    setLoading(false);
  };
  return (
    <>
      <form className="signin" onSubmit={handleSubmit(login)}>
        <h3>Signin</h3>
        <p>Enter your information to signin</p>
        <div className="cont1">
          <div className="incont">
            <input
              name="email"
              placeholder=""
              type="text"
              required
              {...register("email", {
                required: true,
              })}
            />
            <label>Email</label>
          </div>

          <div className="incont">
            <input
              name="password"
              type="password"
              placeholder=""
              required
              {...register("password", {
                required: true,
              })}
            />
            <label>Password</label>
          </div>
        </div>
        <button type="submit">
          {loading ? (
            <div className=" w-full h-full flex items-center justify-center">
              fetching credentials...
            </div>
          ) : (
            "Signin"
          )}
        </button>
        <span>
          Don&apos;t have an account?&nbsp;<Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </>
  );
}

export default Signin;
