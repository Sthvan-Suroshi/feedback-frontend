import { useState } from "react";
import { motion } from "framer-motion";
import { FormBuilder } from "../components";
import { FaArrowRight } from "react-icons/fa";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [next, setNext] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNext(true);
  };

  if (next) {
    return <FormBuilder title={title} description={description} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex pt-20 justify-center px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-[#f0f4f8] to-white"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center text-3xl font-extrabold text-[#3e3e65]"
          >
            Create Your Form
          </motion.h2>
          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2 text-center text-sm text-gray-600"
          >
            Enter the title and description for your new form
          </motion.p>
        </div>
        <motion.form
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2e61a8] focus:border-[#2e61a8] focus:z-10 sm:text-sm transition duration-300"
                placeholder="Form Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2e61a8] focus:border-[#2e61a8] focus:z-10 sm:text-sm transition duration-300 resize-none"
                placeholder="Form Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2e61a8] hover:bg-[#214e82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e61a8] transition duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!title || !description}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaArrowRight
                  className="h-5 w-5 text-[#214e82] group-hover:text-[#2e61a8]"
                  aria-hidden="true"
                />
              </span>
              Next
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default CreateForm;
