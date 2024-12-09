import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, registerUser } from "../../store/Slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

const CreateAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (details) => {
    setIsSubmitting(true);
    try {
      const res = await dispatch(registerUser(details));
      if (res.type === "registerUser/fulfilled") {
        toast.success("Registered successfully");
        await dispatch(getCurrentUser());
        navigate("/signin");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "college_id", label: "Admin ID", type: "text", placeholder: "JCER***" },
    { name: "accountType", label: "Account Type", type: "text", defaultValue: "admin", readOnly: true },
    { name: "department", label: "Department", type: "text", defaultValue: "ALL", readOnly: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3e3e65] to-[#214e82] p-4"
    >
      <motion.div 
        initial={{ y: -50 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#3e3e65]">Create Admin</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {inputFields.map((field) => (
            <motion.div 
              key={field.name}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder || " "}
                defaultValue={field.defaultValue}
                readOnly={field.readOnly}
                className={`block w-full px-4 py-2 text-[#3e3e65] bg-gray-100 border-2 rounded-md focus:outline-none focus:border-[#2e61a8] transition duration-200 ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                } ${field.readOnly ? 'cursor-not-allowed' : ''}`}
                {...register(field.name, { required: true })}
              />
              <label
                htmlFor={field.name}
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  errors[field.name] ? 'text-red-500' : 'text-gray-500'
                }`}
                style={{
                  top: errors[field.name] || document.activeElement === document.getElementById(field.name) || document.getElementById(field.name).value ? '-0.75rem' : '0.75rem',
                  fontSize: errors[field.name] || document.activeElement === document.getElementById(field.name) || document.getElementById(field.name).value ? '0.75rem' : '1rem',
                  backgroundColor: errors[field.name] || document.activeElement === document.getElementById(field.name) || document.getElementById(field.name).value ? 'white' : 'transparent',
                  padding: errors[field.name] || document.activeElement === document.getElementById(field.name) || document.getElementById(field.name).value ? '0 0.25rem' : '0',
                }}
              >
                {field.label}
              </label>
              <AnimatePresence>
                {errors[field.name] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    This field is required
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-[#2e61a8] text-white rounded-md hover:bg-[#214e82] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#3e3e65] focus:ring-opacity-50 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating Admin...' : 'Create Admin'}
          </motion.button>
        </form>
      </motion.div>
      <Toaster position="top-right" />
    </motion.div>
  );
};

export default CreateAdmin;

