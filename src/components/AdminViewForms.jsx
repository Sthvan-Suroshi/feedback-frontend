import React, { useEffect } from "react";
import { FiFileText, FiTrash2, FiBarChart2, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm, getAllForms, resetForm } from "../store/Slices/formSlice";
import { formatDate } from "../utils/formatDate.js";
import Loader from "./Loader.jsx";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminViewForms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forms = useSelector((state) => state.form.forms);
  const loading = useSelector((state) => state.form.loading);
  const accountType = useSelector((state) => state.auth.accountType);

  const handleDelete = async (id) => {
    const res = await dispatch(deleteForm(id));

    if (res.type === "deleteForm/fulfilled") {
      toast.success("Form deleted successfully");
    }

    if (res.type === "deleteForm/rejected") {
      toast.error("Couldn't delete Form");
    }
  };

  useEffect(() => {
    if (accountType === "admin") {
      dispatch(getAllForms());
    }

    return () => {
      dispatch(resetForm());
    };
  }, [dispatch, accountType]);

  if (accountType !== "admin") {
    return null; // or you could redirect to a 404 page
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader h="32" />
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-[#3e3e65] font-semibold">No Forms Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#3e3e65] mb-6">All Forms</h1>
      <div className="space-y-4">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="flex items-center p-4">
              <div className="flex-shrink-0 mr-4">
                <FiFileText className="text-5xl text-[#214e82]" />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-[#3e3e65] mb-1">
                  {form.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Created on: {formatDate(form.createdAt)}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Created by: {form.createdBy || "Unknown"}
                </p>
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/form/${btoa(form._id)}`}
                    className="inline-flex items-center text-[#2e61a8] hover:text-[#214e82] font-semibold transition duration-300 ease-in-out"
                  >
                    <FiEye className="mr-1" /> View Form
                  </Link>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="inline-flex items-center text-red-500 hover:text-red-600 font-semibold transition duration-300 ease-in-out"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => navigate(`/analytics/${btoa(form._id)}`)}
                    className="inline-flex items-center text-green-500 hover:text-green-600 font-semibold transition duration-300 ease-in-out"
                  >
                    <FiBarChart2 className="mr-1" /> Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminViewForms;

