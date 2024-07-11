import { Controller } from "react-hook-form";

const FormCheckbox = ({ label, name, control, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      {label}:
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            className="ml-2"
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
          />
        )}
      />
    </label>
  </div>
);

export default FormCheckbox;
