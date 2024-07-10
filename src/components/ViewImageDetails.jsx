import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getImageFeedback } from "../store/Slices/imageFeedbackSlice";
import Loader from "./Loader";

function ViewImageDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.imageFeedback.loading);
  useEffect(() => {
    dispatch(getImageFeedback(id));
  }, [id]);

  const feedback = useSelector((state) => state.imageFeedback.feedback);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }
  return (
    <div className="w-screen ">
      {feedback && (
        <>
          <div className="flex items-start justify-center gap-4 h-screen p-5 ">
            <div className="basis-1/2 h-3/4">
              <img
                src={feedback.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="basis-1/2 h-3/4">
              <h3 className="text-xl h-fit bg-slate-400 mb-3 p-2">
                {feedback.title}
              </h3>

              <p className="text-lg h-fit bg-slate-400 mb-3 p-2">
                {feedback.description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewImageDetails;
