import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, registerUser } from "../../store/Slices/authSlice.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaUserGraduate,
  FaBuilding
} from "react-icons/fa";

function Signup() {
  const { register, handleSubmit } = useForm();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2e61a8] to-[#3e3e65] py-12"
    >
      <motion.form
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
        onSubmit={handleSubmit(submit)}
      >
        <h3 className="text-3xl font-bold text-center text-[#3e3e65] mb-6">
          Sign Up
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Enter your information to create an account
        </p>
        <div className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              required
              {...register("fullName", { required: true })}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#2e61a8] transition-colors"
              placeholder="Full Name"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              required
              {...register("email", { required: true })}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#2e61a8] transition-colors"
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="password"
              type="password"
              required
              {...register("password", { required: true })}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#2e61a8] transition-colors"
              placeholder="Password"
            />
          </div>
          <div className="relative">
            <FaIdCard className="absolute top-3 left-3 text-gray-400" />
            <input
              name="college_id"
              type="text"
              required
              {...register("college_id", { required: true })}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#2e61a8] transition-colors"
              placeholder="USN/INST_ID"
            />
          </div>
          <div className="relative">
            <FaUserGraduate className="absolute top-3 left-3 text-gray-400" />
            <select
              name="accountType"
              id="accountType"
              required
              defaultValue="student"
              {...register("accountType", { required: true })}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#2e61a8] transition-colors appearance-none"
            >
              <option value="student">Student (Default)</option>
              <option value="instructor">Instructor</option>
              <option value="admin">All</option>
            </select>
          </div>
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-gray-400" />
            <select
              name="department"
              id="department"
              required
              {...register("department", { required: true })}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#2e61a8] transition-colors appearance-none"
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="AIML">AIML</option>
              <option value="ALL">ALL</option>
            </select>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-[#2e61a8] text-white py-3 mt-8 rounded-full font-semibold hover:bg-[#214e82] transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing Up...
            </div>
          ) : (
            "Sign Up"
          )}
        </motion.button>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#2e61a8] hover:underline">
            Sign In
          </Link>
        </p>
      </motion.form>
    </motion.div>
  );
}

export default Signup;
