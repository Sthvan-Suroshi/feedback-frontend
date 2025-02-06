import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormDetails } from "../store/Slices/formSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";
import {
  addFeedback,
  checkFeedbackSubmission
} from "../store/Slices/feedbackSlice.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getFormDetails(formId));
    dispatch(checkFeedbackSubmission(formId));
  }, [dispatch, formId]);

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
      responseText: data[question._id]
    }));

    const res = await dispatch(addFeedback({ formId, responses }));
    if (res.type === "addFeedback/fulfilled") {
      toast.success("Feedback added successfully");
      navigate("/view-forms");
    }
  };

  if (!formData || loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader h="32" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto my-8"
    >
      <Link
        to="/view-forms"
        className="flex items-center text-[#214e82] hover:text-[#3e3e65] transition-colors duration-200 mb-4"
      >
        <IoIosArrowBack className="mr-2" />
        Back to Forms
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-[#3e3e65]">
        {formData.title}
      </h1>
      <p className="text-gray-700 mb-6">{formData.description}</p>
      <p className="text-sm text-gray-500 italic mb-6">
        Note: Once submitted, this form cannot be edited.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {formData.questions.map((question, idx) => (
          <motion.div
            key={question._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <label className="block text-[#3e3e65] text-lg font-semibold mb-2">
              {idx + 1}. {question.question}
            </label>
            <Controller
              name={question._id}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  {question.options && question.options.length > 0 ? (
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center">
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
                      ))}
                      {question.allowDescription && (
                        <div className="mt-2">
                          <label className="block text-gray-700 mb-1">
                            Additional Comments:
                          </label>
                          <textarea
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#214e82] transition-all duration-200 resize-none"
                            rows="3"
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                          ></textarea>
                        </div>
                      )}
                    </div>
                  ) : (
                    <textarea
                      id={question._id}
                      rows="4"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#214e82] transition-all duration-200 resize-none"
                      {...field}
                    ></textarea>
                  )}
                </>
              )}
            />
            {errors[question._id] && (
              <p className="text-red-500 text-sm mt-1">
                This field is required.
              </p>
            )}
          </motion.div>
        ))}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#214e82] text-white px-6 py-3 rounded-md hover:bg-[#3e3e65] transition-colors duration-300 font-semibold text-lg"
        >
          Submit Feedback
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;

