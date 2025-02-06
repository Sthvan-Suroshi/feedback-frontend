import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  deleteImageFeedback,
  getAllUserImageResponses,
  resetImageFeedback
} from "../store/Slices/imageFeedbackSlice";
import { EditImageFeedback, Loader } from "./index";

const ImageResponseView = () => {
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
    } else if (res.type === "deleteImageFeedback/rejected") {
      toast.error("Couldn't delete feedback");
    }
  };

  const handleEdit = async (feedback) => {
    setPost(feedback);
    setPopUp(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center h-screen font-bold">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-2xl text-[#3e3e65] font-semibold">
          No Feedback Found
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {popUp && <EditImageFeedback setPopUp={setPopUp} post={post} />}
      </AnimatePresence>
      <motion.div
        className="container mx-auto p-4 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-bold mb-8 text-[#3e3e65] text-center">
          Image Feedbacks
        </h1>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(feedbacks) &&
            feedbacks.map((feedback) => (
              <motion.div
                key={feedback._id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                    src={feedback.imageUrl}
                    alt={feedback.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3e3e65] to-transparent opacity-70"></div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-[#214e82] truncate">
                    {feedback.title}
                  </h2>
                  <p className="text-gray-600 mb-4 h-12 overflow-hidden line-clamp-2">
                    {feedback.description}
                  </p>
                  <div className="flex justify-between items-center">
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
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ImageResponseView;
