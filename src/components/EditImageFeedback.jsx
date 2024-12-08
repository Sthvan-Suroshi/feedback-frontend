import GetImagePreview from "./GetImagePreview";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import { editImageFeedback } from "../store/Slices/imageFeedbackSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function EditImageFeedback({ post, setPopUp }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.imageFeedback.loading);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      title: post?.title,
      description: post?.description
    }
  });

  const editFeedback = async (data) => {
    data._id = post._id;
    const res = await dispatch(editImageFeedback(data));

    if (res.type === "editImageFeedback/fulfilled") {
      toast.success("Feedback edited successfully");
      setPopUp(false);
    }

    if (res.type === "editImageFeedback/rejected") {
      toast.error("Couldn't edit feedback");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6"
      >
        <form onSubmit={handleSubmit(editFeedback)} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#3e3e65]">
              Edit Image Feedback
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setPopUp(false)}
              className="text-[#3e3e65] hover:text-red-500 transition-colors duration-200"
            >
              <ImCancelCircle size={24} />
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <GetImagePreview
                name="image"
                control={control}
                className="w-full h-64 object-cover rounded-lg"
                cameraIcon
                image={post?.imageUrl}
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
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
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[#3e3e65] mb-1"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Enter feedback description"
                  className="w-full px-3 py-2 border border-[#214e82] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e61a8] transition-all duration-300 resize-none"
                  {...register("description", { required: true })}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#214e82] hover:bg-[#2e61a8] text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Feedback"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default EditImageFeedback;
