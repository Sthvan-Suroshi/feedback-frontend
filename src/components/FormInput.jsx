import { Controller } from "react-hook-form";

const FormInput = ({ label, name, control, rules }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      {label}:
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...field}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-2">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </label>
  </div>
);

export default FormInput;
