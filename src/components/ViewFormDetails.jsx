import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  getFormDetails,
  resetForm,
  updateForm,
  updateQuestion,
} from "../store/Slices/formSlice.js";
import { IoIosArrowBack } from "react-icons/io";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";

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
      description: editedDescription,
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
      options: editedOptions[questionId],
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
      [questionId]: value,
    }));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setEditedOptions((prev) => ({
      ...prev,
      [questionId]: prev[questionId].map((option, index) =>
        index === optionIndex ? value : option,
      ),
    }));
  };

  const handleAddOption = (questionId) => {
    setEditedOptions((prev) => ({
      ...prev,
      [questionId]: [...prev[questionId], ""],
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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl min-w-[470px] mx-auto my-4">
      <Link
        to={accountType === "admin" ? "/admin/view-forms" : "/your-forms"}
        className="flex items-center"
      >
        <IoIosArrowBack /> Back
      </Link>

      {editMode ? (
        <div className="mb-4 flex flex-col">
          <input
            type="text"
            className="border rounded py-1 px-2 mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="border rounded py-1 px-2 mb-2 resize-none"
            rows={6}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 border-b-2">{title}</h2>
          <p className="text-gray-600 mb-4 border-b-2">{description}</p>
        </>
      )}

      <button
        className="text-blue-500 font-semibold mb-4"
        onClick={() => {
          if (editMode) {
            handleSaveForm();
          } else {
            setEditMode(true);
          }
        }}
      >
        {editMode ? "Save Form" : "Edit Title/Description"}
      </button>

      {!editMode && (
        <div>
          {questions &&
            questions.map((question, idx) => (
              <div key={question._id} className="mb-4">
                <div className="flex items-center justify-between">
                  {!editQuestionMode.includes(question._id) ? (
                    <p className="font-semibold mb-2">
                      {idx + 1}. {question.question}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="border rounded py-1 px-2"
                      value={editedQuestions[question._id] || ""}
                      onChange={(e) =>
                        handleQuestionChange(question._id, e.target.value)
                      }
                    />
                  )}
                  <div className="min-w-28">
                    {!editQuestionMode.includes(question._id) ? (
                      <button
                        className="text-blue-500 font-semibold mr-2"
                        onClick={() => handleEditQuestion(question._id)}
                      >
                        Edit
                      </button>
                    ) : (
                      <>
                        <button
                          className="text-green-600 font-semibold mr-2"
                          onClick={() => handleSaveEdit(question._id)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-500 font-semibold mr-2"
                          onClick={() =>
                            setEditQuestionMode((prev) =>
                              prev.filter((id) => id !== question._id),
                            )
                          }
                        >
                          Cancel
                        </button>
                        {!question.description && (
                          <button
                            className="text-blue-500 font-semibold ml-2"
                            onClick={() => handleAddOption(question._id)}
                          >
                            Add Option
                          </button>
                        )}
                      </>
                    )}
                    {!editQuestionMode.includes(question._id) && (
                      <button
                        className="text-red-500 font-semibold ml-2"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                {!editQuestionMode.includes(question._id) ? (
                  question.description ? (
                    <></>
                  ) : (
                    <ul className="list-inside list-decimal">
                      {question.options.map((option, index) => (
                        <li key={index} className="ml-4">
                          {option}
                        </li>
                      ))}
                    </ul>
                  )
                ) : question.description ? (
                  <textarea
                    className="border rounded py-1 px-2 w-full"
                    placeholder="Edit your answer here"
                    value={editedQuestions[question._id] || ""}
                    onChange={(e) =>
                      handleQuestionChange(question._id, e.target.value)
                    }
                  />
                ) : (
                  <ul className="list-inside list-decimal">
                    {editedOptions[question._id]?.map((option, index) => (
                      <li key={index} className="ml-4">
                        <input
                          type="text"
                          className="border rounded py-1 px-2 mb-2"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              question._id,
                              index,
                              e.target.value,
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ViewFormDetails;
