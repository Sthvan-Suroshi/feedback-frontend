import { useNavigate, Link } from "react-router-dom";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Slices/authSlice";
import toast from "react-hot-toast";
import Loader from "../Loader";
function Signin() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const login = async (details) => {
    const res = await dispatch(loginUser(details));
    if ((res.type = "loginUser/fulfilled")) {
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
    }
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
            <div className=" flex items-center justify-center">
              <Loader />
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
