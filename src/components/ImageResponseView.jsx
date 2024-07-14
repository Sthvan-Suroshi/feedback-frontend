import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageFeedback,
  getAllUserImageResponses,
} from "../store/Slices/imageFeedbackSlice";
import { EditImageFeedback, Loader } from "./index";
import toast from "react-hot-toast";

function ImageResponseView() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.imageFeedback?.feedbacks);
  const loadingStatus = useSelector((state) => state.imageFeedback.loading);

  console.log(feedbacks);

  const [popUp, setPopUp] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    dispatch(getAllUserImageResponses());
  }, [dispatch, popUp]);

  const deleteResponse = async (id) => {
    const res = await dispatch(deleteImageFeedback(id));

    if (res.type === "deleteImageFeedback/fulfilled") {
      toast.success("Feedback deleted successfully");
    }

    if (res.type === "deleteImageFeedback/rejected") {
      toast.error("Couldn't delete feedback");
    }
  };

  const handleEdit = async (feedback) => {
    setPost(feedback);
    setPopUp(true);
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
      {popUp && (
        <div className="fixed inset-0 flex justify-center items-start bg-black/50 bg-opacity-75 z-[999]">
          <EditImageFeedback setPopUp={setPopUp} post={post} />
        </div>
      )}
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
                      alt=""
                    />
                  </div>
                </div>
                <div className="basis-1/2  h-32  overflow-hidden">
                  <p className="text-ellipsis p-3">{feedback.title}</p>
                </div>
                <div className="basis-1/4 h-32 flex items-center justify-center gap-10 border-l-2">
                  <button
                    className="text-2xl border px-2 py-2 rounded border-slate-800"
                    onClick={() => handleEdit(feedback)}
                  >
                    <MdEdit />
                  </button>

                  <button
                    className="text-2xl border px-2 py-2 rounded border-slate-800"
                    onClick={() => deleteResponse(feedback._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ImageResponseView;
