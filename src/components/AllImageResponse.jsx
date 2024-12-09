import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllImageResponses } from "../store/Slices/imageFeedbackSlice.js";

const AllImageResponse = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.imageFeedback.feedbacks);

  useEffect(() => {
    dispatch(getAllImageResponses());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold mb-8 text-[#3e3e65] text-center">Image Responses</h1>
      {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              variants={itemVariants}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={feedback.imageUrl}
                  alt={feedback.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3e3e65] to-transparent opacity-70"></div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-[#214e82] truncate">{feedback.title}</h2>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{feedback.title}</p>
                <Link 
                  to={`/feedback/${btoa(feedback._id)}`}
                  className="inline-block bg-[#2e61a8] text-white py-2 px-4 rounded-full hover:bg-[#214e82] transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          className="text-center text-xl text-[#3e3e65]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          No image responses available.
        </motion.p>
      )}
    </motion.div>
  );
};

export default AllImageResponse;

