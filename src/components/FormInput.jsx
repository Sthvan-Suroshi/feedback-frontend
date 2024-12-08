import { Controller } from "react-hook-form";
import { motion } from "framer-motion";

const FormInput = ({ label, name, control }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-4"
  >
    <label className="block text-sm font-medium text-[#3e3e65]">
      {label}:
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <motion.input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2e61a8] focus:border-[#2e61a8] sm:text-sm transition-all duration-300"
              {...field}
              whileFocus={{ scale: 1.02 }}
            />
            {fieldState.error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-2"
              >
                {fieldState.error.message}
              </motion.p>
            )}
          </>
        )}
      />
    </label>
  </motion.div>
);

export default FormInput;
