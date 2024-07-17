import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllFeedbacksToForm } from "../store/Slices/feedbackSlice";
import Loader from "./Loader";

const FormAnalytics = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const formId = atob(id);
  const loading = useSelector((state) => state.feedback.loading);

  useEffect(() => {
    dispatch(getAllFeedbacksToForm(formId));
  }, [dispatch, formId]);

  const data = useSelector((state) => state.feedback.feedback);
  console.log(data);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-md mt-8">
        <p className="text-2xl ">No Feedbacks yet!</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-md mt-8">
      <h1 className="text-2xl font-bold mb-4 border-b-2">{data.formTitle}</h1>
      <p className="text-gray-600 mb-4 border-b-2">{data.formDescription}</p>

      <div>
        {Object.entries(data.optionCounts).map(([question, options], idx) => (
          <div key={question} className="mb-4 border-b-2">
            <h3 className="text-lg font-semibold mb-2">
              {idx + 1}. {question}
            </h3>
            <ul className="list-none pl-4">
              {Object.entries(options).map(([opt, count]) => (
                <li key={opt} className="text-gray-700">
                  {Array.isArray(count) ? (
                    <ul className="list-decimal pl-4">
                      {count.map((feedback, index) => (
                        <li key={index} className="text-gray-700">
                          {feedback}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    `${opt}: ${count}`
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormAnalytics;
