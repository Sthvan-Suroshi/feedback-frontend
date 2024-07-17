import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormDetails } from "../store/Slices/formSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";
import {
  addFeedback,
  checkFeedbackSubmission,
} from "../store/Slices/feedbackSlice.js";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formId = atob(id);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.form);
  const loading = useSelector((state) => state.form.loading);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getFormDetails(formId));
    dispatch(checkFeedbackSubmission(formId));
  }, [dispatch, id]);

  useEffect(() => {
    if (formData) {
      formData.questions.forEach((question) => {
        setValue(question._id, "");
      });
    }
  }, [formData, setValue]);

  const onSubmit = async (data) => {
    const responses = formData.questions.map((question) => ({
      questionID: question._id,
      responseText: data[question._id],
    }));

    const res = await dispatch(addFeedback({ formId, responses }));
    if (res.type === "addFeedback/fulfilled") {
      toast.success("Feedback added successfully");
      navigate("/view-forms");
    }
  };

  if (!formData || loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-3 max-w-xl w-96 mx-auto my-4">
      <Link to={"/view-forms"} className="flex items-center">
        <IoIosArrowBack />
        Back
      </Link>
      <h1 className="text-2xl font-bold mb-4 border-b shadow-sm">
        {formData.title}
      </h1>
      <p className="text-gray-700 border-b shadow-sm ">
        {formData.description}
      </p>
      <span className="text-xs italic mb-4 inline-block border-b shadow-sm">
        form once submited will not be editable*
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formData.questions.map((question, idx) => (
          <div key={question._id} className="mb-4 border-b shadow-sm">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {idx + 1}. {question.question}
            </label>
            {question.options !== null ? (
              question.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <Controller
                    name={question._id}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div>
                        <input
                          type="radio"
                          id={`${question._id}-${index}`}
                          value={option}
                          onChange={() => field.onChange(option)}
                          checked={field.value === option}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`${question._id}-${index}`}
                          className="text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    )}
                  />
                </div>
              ))
            ) : (
              <Controller
                name={question._id}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <textarea
                    id={question._id}
                    rows="4"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none resize-none"
                    {...field}
                  ></textarea>
                )}
              />
            )}
            {errors[question._id] && (
              <p className="text-red-500 text-xs italic">
                This field is required.
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
