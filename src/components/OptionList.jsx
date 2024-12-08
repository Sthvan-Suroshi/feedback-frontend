import { Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash } from "react-icons/fa";

const OptionsList = ({ fields, control, remove, append }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-4"
  >
    <AnimatePresence>
      {fields.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="mb-2 flex items-center"
        >
          <label className="block text-sm font-medium text-[#3e3e65] flex-grow">
            Option {index + 1}:
            <Controller
              name={`options.${index}.value`}
              control={control}
              render={({ field }) => (
                <motion.input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2e61a8] focus:border-[#2e61a8] sm:text-sm transition-all duration-300"
                  {...field}
                  whileFocus={{ scale: 1.02 }}
                />
              )}
            />
          </label>
          <motion.button
            type="button"
            className="ml-2 mt-5 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full hover:bg-red-100 p-2"
            onClick={() => remove(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTrash size={20}/>
          </motion.button>
        </motion.div>
      ))}
    </AnimatePresence>
    <motion.button
      type="button"
      className="mt-2 flex items-center text-[#2e61a8] hover:text-[#214e82] font-semibold transition-colors duration-200"
      onClick={() => append({ value: "" })}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaPlus className="mr-1" />
      Add Option
    </motion.button>
  </motion.div>
);

export default OptionsList;
