import { Controller } from "react-hook-form";

const FormTextArea = ({ label, name, control }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      {label}:
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            rows={6}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
            {...field}
          />
        )}
      />
    </label>
  </div>
);

export default FormTextArea;
