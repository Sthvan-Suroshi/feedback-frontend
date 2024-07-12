import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImageResponses } from "../store/Slices/imageFeedbackSlice.js";
import { Link } from "react-router-dom";

function AllImageResponse() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.imageFeedback.loading);

  useEffect(() => {
    const res = dispatch(getAllImageResponses());
  }, [dispatch, loadingStatus]);

  const feedbacks = useSelector((state) => state.imageFeedback.feedbacks);

  return (
    <div className="w-full mt-1">
      {Array.isArray(feedbacks) &&
        feedbacks.map((feedback) => (
          <div key={feedback._id}>
            <div className="flex items-center justify-center w-full gap-3 border-b-4 mb-3 ">
              <div className="basis-1/4 h-32 ">
                <div className="w-full h-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={feedback.imageUrl}
                    alt="image"
                  />
                </div>
              </div>
              <div className="basis-1/2  h-32  overflow-hidden">
                <p className="text-ellipsis p-3">{feedback.title}</p>
              </div>
              <div className="basis-1/4 h-32 flex items-center justify-center gap-10 border-l-2 text-black">
                <Link to={`/feedback/${btoa(feedback._id)}`}>View Details</Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AllImageResponse;
