import { useState } from "react";

// Custom Input Component
const Input = ({ label, error, className = "", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-2 
          text-gray-700 bg-white 
          border-2 rounded-md 
          transition-all duration-200
          ${error ? "border-red-500" : isFocused ? "border-blue-500" : "border-gray-300"}
          ${props.readOnly ? "bg-gray-50 cursor-not-allowed" : "hover:border-gray-400"}
          focus:outline-none
          ${className}
        `}
      />
      {label && (
        <label
          className={`
            absolute left-3 px-1
            transition-all duration-200
            pointer-events-none
            ${isFocused || props.value ? "-top-2 text-sm bg-white" : "top-2 text-gray-500"}
            ${isFocused ? "text-blue-500" : error ? "text-red-500" : "text-gray-500"}
          `}
        >
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Custom Button Component
const Button = ({ children, className = "", isLoading = false, ...props }) => {
  return (
    <button
      {...props}
      className={`
        px-4 py-2 
        text-white 
        bg-blue-600 
        rounded-md
        transition-all duration-200
        ${!props.disabled && "hover:bg-blue-700 active:bg-blue-800"}
        ${props.disabled && "opacity-50 cursor-not-allowed"}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Main Component
const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    college_id: "",
    accountType: "admin",
    department: "ALL"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAdmins, setCreatedAdmins] = useState([]);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.college_id.trim()) {
      newErrors.college_id = "Admin ID is required";
    } else if (!/^JCER\d+$/.test(formData.college_id)) {
      newErrors.college_id =
        "Admin ID must start with JCER followed by numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // Simulating API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCreatedAdmins((prev) => [...prev, formData]);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        college_id: "",
        accountType: "admin",
        department: "ALL"
      });
      setSubmitStatus({
        type: "success",
        message: "Admin created successfully!"
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to create admin. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    {
      name: "college_id",
      label: "Admin ID",
      type: "text",
      placeholder: ""
    },
    {
      name: "accountType",
      label: "Account Type",
      type: "text",
      readOnly: true
    },
    { name: "department", label: "Department", type: "text", readOnly: true }
  ];

  return (
    <div className=" flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Admin
        </h2>

        {submitStatus.message && (
          <div
            className={`
            mb-6 p-4 rounded-md
            ${
              submitStatus.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }
          `}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              readOnly={field.readOnly}
            />
          ))}

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full"
          >
            Create Admin
          </Button>
        </form>

        {createdAdmins.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Created Admins
            </h3>
            <div className="space-y-3">
              {createdAdmins.map((admin, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <p className="font-medium text-gray-800">{admin.fullName}</p>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdmin;
