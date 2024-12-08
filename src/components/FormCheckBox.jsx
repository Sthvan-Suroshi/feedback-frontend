import { Controller } from "react-hook-form";
import { motion } from "framer-motion";

const FormCheckbox = ({ label, name, control, onChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-4"
  >
    <label className="flex items-center text-sm font-medium text-[#3e3e65]">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <motion.input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-[#2e61a8] transition duration-150 ease-in-out"
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
      />
      <span className="ml-2">{label}</span>
    </label>
  </motion.div>
);

export default FormCheckbox;
