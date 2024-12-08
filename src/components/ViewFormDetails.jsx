import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  getFormDetails,
  resetForm,
  updateForm,
  updateQuestion
} from "../store/Slices/formSlice.js";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function ViewFormDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const formId = atob(id);
  const form = useSelector((state) => state.form.form);
  const loading = useSelector((state) => state.form.loading);
  const accountType = useSelector((state) => state.auth.accountType);

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editQuestionMode, setEditQuestionMode] = useState([]);
  const [editedQuestions, setEditedQuestions] = useState({});
  const [editedOptions, setEditedOptions] = useState({});

  useEffect(() => {
    dispatch(getFormDetails(formId));
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch, formId]);

  useEffect(() => {
    if (form) {
      setEditedTitle(form.title);
      setEditedDescription(form.description);
      const initialQuestions = {};
      const initialOptions = {};
      form.questions?.forEach((question) => {
        initialQuestions[question._id] = question.question;
        initialOptions[question._id] = question.options;
      });
      setEditedQuestions(initialQuestions);
      setEditedOptions(initialOptions);
    }
  }, [form]);

  const handleSaveForm = async () => {
    const details = {
      formId,
      title: editedTitle,
      description: editedDescription
    };

    const res = await dispatch(updateForm(details));
    if (res.type === "updateForm/fulfilled") {
      toast.success("Form updated successfully");
      setEditMode(false);
      dispatch(getFormDetails(formId));
    }
  };

  const handleEditQuestion = (questionId) => {
    setEditQuestionMode((prev) => [...prev, questionId]);
  };

  const handleSaveEdit = async (questionId) => {
    const updatedQuestion = {
      questionId,
      question: editedQuestions[questionId],
      options: editedOptions[questionId]
    };

    const res = await dispatch(updateQuestion(updatedQuestion));
    if (res.type === "updateQuestion/fulfilled") {
      setEditQuestionMode((prev) => prev.filter((id) => id !== questionId));
      toast.success("Question updated successfully");
      dispatch(getFormDetails(formId));
    } else {
      toast.error("Failed to update question");
    }
  };

  const handleQuestionChange = (questionId, value) => {
    setEditedQuestions((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setEditedOptions((prev) => ({
      ...prev,
      [questionId]: prev[questionId].map((option, index) =>
        index === optionIndex ? value : option
      )
    }));
  };

  const handleAddOption = (questionId) => {
    setEditedOptions((prev) => ({
      ...prev,
      [questionId]: [...prev[questionId], ""]
    }));
  };

  const handleDeleteQuestion = async (questionId) => {
    const res = await dispatch(deleteQuestion(questionId));
    if (res.type === "deleteQuestion/fulfilled") {
      toast.success("Question deleted successfully");
      dispatch(getFormDetails(formId));
    } else {
      toast.error("Failed to delete question");
    }
  };

  if (!form || loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }

  const { title, description, questions } = form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto my-8"
    >
      <Link
        to={accountType === "admin" ? "/admin/view-forms" : "/your-forms"}
        className="flex items-center text-[#2e61a8] hover:text-[#214e82] transition-colors duration-300 mb-6"
      >
        <IoIosArrowBack className="mr-2" /> Back
      </Link>

      {editMode ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-6 space-y-4"
        >
          <input
            type="text"
            className="w-full border-2 border-[#2e61a8] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#3e3e65] transition-all duration-300"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full border-2 border-[#2e61a8] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#3e3e65] transition-all duration-300 resize-none"
            rows={6}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-6 space-y-4"
        >
          <h2 className="text-3xl font-bold text-[#3e3e65]">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
          editMode
            ? "bg-[#2e61a8] hover:bg-[#214e82]"
            : "bg-[#3e3e65] hover:bg-[#2e61a8]"
        }`}
        onClick={() => {
          if (editMode) {
            handleSaveForm();
          } else {
            setEditMode(true);
          }
        }}
      >
        {editMode ? (
          <>
            <FaSave className="mr-2" /> Save Form
          </>
        ) : (
          <>
            <FaEdit className="mr-2" /> Edit Title/Description
          </>
        )}
      </motion.button>

      {!editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-8 space-y-6"
        >
          <AnimatePresence>
            {questions &&
              questions.map((question, idx) => (
                <motion.div
                  key={question._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    {!editQuestionMode.includes(question._id) ? (
                      <h3 className="text-xl font-semibold text-[#3e3e65]">
                        {idx + 1}. {question.question}
                      </h3>
                    ) : (
                      <input
                        type="text"
                        className="w-full border-2 border-[#2e61a8] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#3e3e65] transition-all duration-300"
                        value={editedQuestions[question._id] || ""}
                        onChange={(e) =>
                          handleQuestionChange(question._id, e.target.value)
                        }
                      />
                    )}
                    <div className="flex space-x-2">
                      {!editQuestionMode.includes(question._id) ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-[#2e61a8] hover:text-[#214e82] transition-colors duration-300"
                            onClick={() => handleEditQuestion(question._id)}
                          >
                            <FaEdit size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                            onClick={() => handleDeleteQuestion(question._id)}
                          >
                            <FaTrash size={20} />
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-green-600 hover:text-green-700 transition-colors duration-300"
                            onClick={() => handleSaveEdit(question._id)}
                          >
                            <FaSave size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                            onClick={() =>
                              setEditQuestionMode((prev) =>
                                prev.filter((id) => id !== question._id)
                              )
                            }
                          >
                            <FaTimes size={20} />
                          </motion.button>
                          {!question.description && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-[#2e61a8] hover:text-[#214e82] transition-colors duration-300"
                              onClick={() => handleAddOption(question._id)}
                            >
                              <FaPlus size={20} />
                            </motion.button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {!editQuestionMode.includes(question._id) ? (
                    question.description ? (
                      <></>
                    ) : (
                      <ul className="list-inside list-disc pl-4 space-y-2">
                        {question.options.map((option, index) => (
                          <li key={index} className="text-gray-700">
                            {option}
                          </li>
                        ))}
                      </ul>
                    )
                  ) : question.description ? (
                    <textarea
                      className="w-full border-2 border-[#2e61a8] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#3e3e65] transition-all duration-300 resize-none"
                      placeholder="Edit your answer here"
                      value={editedQuestions[question._id] || ""}
                      onChange={(e) =>
                        handleQuestionChange(question._id, e.target.value)
                      }
                    />
                  ) : (
                    <ul className="space-y-2">
                      {editedOptions[question._id]?.map((option, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="text-[#2e61a8]">{index + 1}.</span>
                          <input
                            type="text"
                            className="flex-grow border-2 border-[#2e61a8] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#3e3e65] transition-all duration-300"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                question._id,
                                index,
                                e.target.value
                              )
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ViewFormDetails;
