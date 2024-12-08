import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageFeedback,
  getAllUserImageResponses,
  resetImageFeedback
} from "../store/Slices/imageFeedbackSlice";
import { EditImageFeedback, Loader } from "./index";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function ImageResponseView() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.imageFeedback?.feedbacks);
  const loadingStatus = useSelector((state) => state.imageFeedback.loading);

  const [popUp, setPopUp] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    dispatch(getAllUserImageResponses());

    return () => {
      dispatch(resetImageFeedback());
    };
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
      <div className="flex items-center justify-center h-screen">
        <Loader h="32" />
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-[#3e3e65] font-semibold">
          No Feedback Found
        </p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {popUp && <EditImageFeedback setPopUp={setPopUp} post={post} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-[#3e3e65] mb-6">
          Image Feedbacks
        </h1>
        <AnimatePresence>
          {Array.isArray(feedbacks) &&
            feedbacks.map((feedback) => (
              <motion.div
                key={feedback._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 h-48 md:h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={feedback.imageUrl}
                      alt={feedback.title}
                    />
                  </div>
                  <div className="w-full md:w-3/4 p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-[#3e3e65] mb-2">
                        {feedback.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">
                        {feedback.description}
                      </p>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#214e82] hover:text-[#2e61a8] transition-colors duration-200"
                        onClick={() => handleEdit(feedback)}
                      >
                        <MdEdit size={24} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        onClick={() => deleteResponse(feedback._id)}
                      >
                        <MdDelete size={24} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default ImageResponseView;
