import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm, getFormsByUser } from "../store/Slices/formSlice";
import { Link } from "react-router-dom";
import { TbFileText } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { Loader } from "./index";
import toast from "react-hot-toast";

function AllFormsTable() {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.form.forms);
  const loadingStatus = useSelector((state) => state.form.loading);

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
    dispatch(getFormsByUser());
  }, [dispatch]);

  if (forms.length === 0) {
    return (
      <div className="flex items-start justify-center w-screen mt-10 ">
        <p className="text-3xl">No Forms Found</p>
      </div>
    );
  }

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center absolute inset-0 ">
        <Loader h="32" />
      </div>
    );
  }

  return (
    <div className="w-screen p-3">
      <div className="w-full flex gap-4 flex-wrap">
        {forms &&
          forms.map((form) => (
            <div key={form._id} className="flex">
              <Link className="text-8xl relative text-center" key={form._id}>
                <span
                  className="absolute top-0 right-0 text-2xl bg-red-400 rounded-full p-[1px] hover:bg-black hover:text-white"
                  onClick={() => handleDelete(form._id)}
                >
                  <MdDeleteOutline />
                </span>
                <TbFileText />
                <div className="text-lg w-28 ">
                  <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                    {form.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllFormsTable;
