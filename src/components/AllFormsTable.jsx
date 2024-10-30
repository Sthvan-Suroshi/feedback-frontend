import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteForm,
  getFormsByUser,
  resetForm
} from "../store/Slices/formSlice";
import { Link } from "react-router-dom";
import { TbFileText } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { Loader, TogglePublish } from "./index";
import { formatDate } from "../utils/formatDate.js";
import { GrAnalytics } from "react-icons/gr";
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

    return () => {
      dispatch(resetForm());
    };
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
      <div>
        <div className="mt-1">
          <table className="w-full text-center table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/3">Title</th>
                <th className="px-4 py-2 w-1/3">Created On</th>
                <th className="px-4 py-2 w-1/3">Action</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id} className="border-b">
                  <td className="px-4 py-2 max-w-24 overflow-hidden text-ellipsis whitespace-nowrap w-1/3">
                    {form.title}
                  </td>
                  <td className="px-4 py-2 w-1/3">
                    {formatDate(form.createdAt)}
                  </td>
                  <td className="px-4 py-2 flex items-center justify-center gap-3 ">
                    <div className="relative group">
                      <Link to={`/form/${btoa(form._id)}`}>
                        <button className="text-blue-500 px-4 py-2 rounded-md shadow-md hover:text-blue-600 text-lg">
                          <TbFileText />
                        </button>
                      </Link>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <div className="bg-black text-white text-xs rounded py-1 px-2 shadow-lg">
                          View
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <button
                        className="text-red-500  px-4 py-2 rounded-md shadow-md hover:text-red-600 text-lg"
                        onClick={() => handleDelete(form._id)}
                      >
                        <MdDeleteOutline />
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block opacity-0 group-hover:opacity-100 transition duration-300 delay-200">
                        <div className="bg-black text-white text-xs rounded py-1 px-2 shadow-lg">
                          Delete
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <Link
                        className="text-green-500 inline-block px-4 py-2 rounded-md shadow-md hover:text-green-600 text-lg"
                        to={`/analytics/${btoa(form._id)}`}
                      >
                        <GrAnalytics />
                      </Link>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block opacity-0 group-hover:opacity-100 transition duration-300 delay-200">
                        <div className="bg-black text-white text-xs rounded py-1 px-2 shadow-lg">
                          Analytics
                        </div>
                      </div>
                    </div>

                    <div>
                      <TogglePublish
                        formId={form._id}
                        isPublished={form.isPublished}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllFormsTable;
