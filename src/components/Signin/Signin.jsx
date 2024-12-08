import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/Slices/authSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2e61a8] to-[#3e3e65]"
    >
      <motion.form
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
        onSubmit={handleSubmit(login)}
      >
        <h3 className="text-3xl font-bold text-center text-[#3e3e65] mb-6">
          Sign In
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Enter your information to sign in
        </p>
        <div className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="text"
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
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </motion.button>
        <p className="text-center mt-6 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#2e61a8] hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.form>
    </motion.div>
  );
}

export default Signin;
