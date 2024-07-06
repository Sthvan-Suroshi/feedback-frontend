import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageFeedback,
  getAllUserImageResponses,
} from "../store/Slices/imageFeedbackSlice";
import { Loader } from "./index";
import toast from "react-hot-toast";

function ImageResponseView() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.imageFeedback?.feedbacks);
  const loadingStatus = useSelector((state) => state.imageFeedback.loading);

  useEffect(() => {
    dispatch(getAllUserImageResponses());
  }, [dispatch]);

  const deleteResponse = async (id) => {
    const res = await dispatch(deleteImageFeedback(id));

    if (res.type === "deleteImageFeedback/fulfilled") {
      toast.success("Feedback deleted successfully");
    }

    if (res.type === "deleteImageFeedback/rejected") {
      toast.error("Couldn't delete feedback");
    }
  };

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center absolute inset-0 ">
        <Loader h="32" />
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex items-start justify-center w-screen mt-10 ">
        <p className="text-3xl">No Feedback Found</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mt-1">
        {Array.isArray(feedbacks) &&
          feedbacks.map((feedback) => (
            <>
              <div
                className="flex items-center justify-center w-full gap-3 border-b-4 mb-3 shadow-sm"
                key={feedback._id}
              >
                <div className="basis-1/4 h-32 ">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={feedback.imageUrl}
                      alt=""
                    />
                  </div>
                </div>
                <div className="basis-1/2  h-32  overflow-hidden">
                  <p className="text-ellipsis p-3">{feedback.title}</p>
                </div>
                <div className="basis-1/4  h-32  flex items-center justify-around ">
                  <button className="text-2xl border px-2 py-2 rounded border-slate-800">
                    <MdEdit />
                  </button>

                  <button
                    className="text-2xl border px-2 py-2 rounded border-slate-800"
                    onClick={() => deleteResponse(feedback._id)}
                  >
                    <MdDelete />
                  </button>

                  <Link className="text-lg">View Detials</Link>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default ImageResponseView;
