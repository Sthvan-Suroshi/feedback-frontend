import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, registerUser } from "../../store/Slices/authSlice.js";
import toast from "react-hot-toast";
import Loader from "../Loader.jsx";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const submit = async (details) => {
    const res = await dispatch(registerUser(details));
    if (res.type === "registerUser/fulfilled") {
      toast.success("Registered successfully");
      navigate("/signin");
    }
    await dispatch(getCurrentUser());
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="signup">
        <h3>Signup</h3>
        <p>Enter your information to create an account</p>
        <div className="cont1">
          <div className="incont">
            <input
              placeholder=""
              type="text"
              required
              {...register("fullName", {
                required: true,
              })}
            />
            <label>Full Name</label>
          </div>

          <div className="incont">
            <input
              name="email"
              placeholder=""
              type="email"
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
              placeholder=""
              type="password"
              required
              {...register("password", { required: true })}
            />
            <label>Password</label>
          </div>

          <div className="incont">
            <input
              name="college_id"
              placeholder=""
              type="text"
              required
              {...register("college_id", { required: true })}
            />
            <label>USN/INST_ID</label>
          </div>

          <div className="incont border-4 rounded-lg">
            <select
              className="p-3"
              name="accountType"
              id="accountType"
              required
              defaultValue="student"
              {...register("accountType", {
                required: true,
              })}
            >
              <option value="student">Student (Default)</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div className="incont border-4 rounded-lg">
            <select
              className="p-3"
              name="department"
              id="department"
              required
              {...register("department", {
                required: true,
              })}
            >
              <option>select</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE </option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="AIML">AIML</option>
            </select>
          </div>
        </div>

        <button type="submit">
          {loading ? (
            <div className=" flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            "Signup"
          )}
        </button>
        <span>
          Already have an account?&nbsp;<Link to={"/signin"}>Signin</Link>
        </span>
      </form>
    </>
  );
}

export default Signup;
