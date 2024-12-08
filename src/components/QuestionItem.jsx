import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const QuestionItem = ({
  question,
  options,
  description,
  index,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <motion.h3
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-lg font-semibold text-[#3e3e65] truncate max-w-3xl"
        >
          {index + 1}. {question}
        </motion.h3>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-[#2e61a8] text-white rounded-full hover:bg-[#214e82] transition-colors duration-300 flex items-center"
          >
            <FaEdit className="mr-1" /> Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center"
          >
            <FaTrash className="mr-1" /> Delete
          </motion.button>
        </div>
      </div>
      {options ? (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {options.map((opt, idx) => (
            <motion.li
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * (idx + 1) }}
              className="flex items-center text-gray-600"
            >
              <span className="w-2 h-2 bg-[#2e61a8] rounded-full mr-2"></span>
              {opt}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 pl-2"
        >
          Description: {description ? "True" : "False"}
        </motion.p>
      )}
    </motion.div>
  );
};

export default QuestionItem;
