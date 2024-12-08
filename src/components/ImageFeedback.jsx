import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addImageFeedback } from "../store/Slices/imageFeedbackSlice";
import toast from "react-hot-toast";
import GetImagePreview from "./GetImagePreview";
import { FaUpload, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function ImageFeedback() {
  const { handleSubmit, register, control, reset, setValue } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const loading = useSelector((state) => state.imageFeedback.loading);
  const dispatch = useDispatch();

  const addFeedback = async (data) => {

    const res = await dispatch(addImageFeedback(data));

    if (res.type === "addImageFeedback/fulfilled") {
      setIsSuccess(true);
      toast.success("Feedback added successfully");
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        setValue("image", null);
      }, 2000);
    }

    if (res.type === "addImageFeedback/rejected") {
      toast.error("Couldn't add feedback");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit(addFeedback)}>
        <motion.h2
          className="text-2xl font-bold mb-6 text-[#3e3e65]"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Add Image Feedback
        </motion.h2>

        <motion.div
          className="mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GetImagePreview
            loading={loading}
            name="image"
            control={control}
            className="w-full h-64 object-cover rounded-lg border-2 border-[#214e82] hover:border-[#2e61a8] transition-colors duration-300"
            cameraSize={40}
          />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#3e3e65] mb-1"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter feedback title"
            className="w-full px-3 py-2 border border-[#214e82] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e61a8] transition-all duration-300"
            {...register("title", { required: true })}
          />
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#3e3e65] mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Enter feedback description"
            className="w-full px-3 py-2 border border-[#214e82] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e61a8] transition-all duration-300 resize-none"
            {...register("description", { required: true })}
          />
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <AnimatePresence>
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="bg-green-500 text-white font-bold py-2 px-6 rounded-full flex items-center justify-center min-w-[200px]"
              >
                <FaCheckCircle className="mr-2" />
                Success!
              </motion.div>
            ) : (
              <motion.button
                type="submit"
                className="bg-[#214e82] hover:bg-[#2e61a8] text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out flex items-center justify-center min-w-[200px]"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <FaUpload className="mr-2" />
                    Add Feedback
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default ImageFeedback;
