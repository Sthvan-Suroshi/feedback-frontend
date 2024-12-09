import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getImageFeedback } from "../store/Slices/imageFeedbackSlice";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";

function ViewImageDetails() {
  const { id } = useParams();
  const imgId = atob(id);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.imageFeedback.loading);
  const feedback = useSelector((state) => state.imageFeedback.feedback);

  useEffect(() => {
    dispatch(getImageFeedback(imgId));
  }, [id, dispatch, imgId]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999] bg-[#f0f4f8]">
        <Loader h="32" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f0f4f8] p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {feedback && (
        <>
          <motion.div variants={itemVariants}>
            <Link
              to="/all-images"
              className="inline-flex items-center mb-6 text-[#214e82] hover:text-[#2e61a8] transition-colors duration-300"
            >
              <IoIosArrowBack className="mr-2" />
              <span className="font-semibold">Back to All Images</span>
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="md:w-1/2"
              variants={itemVariants}
            >
              <img
                src={feedback.imageUrl}
                alt={feedback.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div
              className="md:w-1/2 space-y-6"
              variants={itemVariants}
            >
              <motion.h3
                className="text-2xl font-bold text-[#3e3e65] bg-white p-4 rounded-lg shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feedback.title}
              </motion.h3>

              <motion.div
                className="bg-white rounded-lg shadow overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-[#214e82] mb-2">Description</h4>
                  <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-[#3e3e65]">{feedback.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default ViewImageDetails;

