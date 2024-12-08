import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteForm,
  getFormsByUser,
  resetForm
} from "../store/Slices/formSlice";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiTrash2,
  FiBarChart2,
  FiAlertCircle
} from "react-icons/fi";
import { Loader, TogglePublish } from "./index";
import { formatDate } from "../utils/formatDate.js";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center h-[88vh]">
        <Loader h="32" />
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-[#3e3e65]">
        <FiAlertCircle className="w-16 h-16 mb-4" />
        <p className="text-2xl font-semibold">No Forms Found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto my-8"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-[#3e3e65]">All Forms</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your created forms</p>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-[#3e3e65] uppercase tracking-wider">
                <th className="pb-3">Title</th>
                <th className="pb-3">Created On</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {forms.map((form) => (
                  <motion.tr
                    key={form._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <td className="py-4 font-medium text-[#3e3e65]">
                      {form.title}
                    </td>
                    <td className="py-4 text-gray-500">
                      {formatDate(form.createdAt)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Tooltip content="View">
                          <Link
                            to={`/form/${btoa(form._id)}`}
                            className="p-2 text-[#214e82] hover:bg-[#e6f0ff] rounded-full transition-colors duration-200 inline-flex items-center justify-center"
                          >
                            <FiFileText className="w-5 h-5" />
                          </Link>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <button
                            onClick={() => handleDelete(form._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Analytics">
                          <Link
                            to={`/analytics/${btoa(form._id)}`}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors duration-200 inline-flex items-center justify-center"
                          >
                            <FiBarChart2 className="w-5 h-5" />
                          </Link>
                        </Tooltip>
                        <TogglePublish
                          formId={form._id}
                          isPublished={form.isPublished}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function Tooltip({ content, children }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#3e3e65] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {content}
      </div>
    </div>
  );
}

export default AllFormsTable;
