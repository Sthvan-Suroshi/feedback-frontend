import React, { useEffect } from "react";
import { FiFileText } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getFormByDept, resetForm } from "../store/Slices/formSlice.js";
import { formatDate } from "../utils/formatDate.js";
import Loader from "./Loader.jsx";
import { Link } from "react-router-dom";

function ViewAllForms() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.form.loading);
  const forms = useSelector((state) => state.form.forms);
  console.log(forms);
  useEffect(() => {
    dispatch(getFormByDept());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }

  return (
    <>
      <div className="w-screen flex flex-col gap-3 ">
        {forms.map((form) => (
          <div
            className="flex hover:bg-slate-200 transition duration-300 ease-in-out p-2"
            key={form._id}
          >
            <div className="basis-1/6 border-r-2 mr-2 ">
              <p className="text-8xl">
                <FiFileText />
              </p>
            </div>
            <div className="basis-2/3 flex flex-col items-start justify-center">
              <p className=" font-semibold">{form.title}</p>
              <p>{formatDate(form.createdAt)}</p>
              <p>created by: {form.createdBy}</p>
              <p>
                {form.submitted ? (
                  <p className="text-green-500 font-semibold ">Submitted</p>
                ) : (
                  <>
                    <Link to={`/fill-form/${btoa(form._id)}`}>View Form</Link>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewAllForms;