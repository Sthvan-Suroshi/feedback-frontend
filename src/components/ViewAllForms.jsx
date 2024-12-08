import { useEffect } from "react";
import { FiFileText, FiCheckCircle, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getFormByDept } from "../store/Slices/formSlice.js";
import { formatDate } from "../utils/formatDate.js";
import Loader from "./Loader.jsx";
import { Link } from "react-router-dom";

function ViewAllForms() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.form.loading);
  const forms = useSelector((state) => state.form.forms);

  useEffect(() => {
    dispatch(getFormByDept());
  }, [dispatch]);

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
                  Created by: {form.createdBy}
                </p>
                {form.submitted ? (
                  <p className="flex items-center text-green-500 font-semibold">
                    <FiCheckCircle className="mr-1" /> Submitted
                  </p>
                ) : (
                  <Link
                    to={`/fill-form/${btoa(form._id)}`}
                    className="inline-flex items-center text-[#2e61a8] hover:text-[#214e82] font-semibold transition duration-300 ease-in-out"
                  >
                    <FiEye className="mr-1" /> View Form
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllForms;
