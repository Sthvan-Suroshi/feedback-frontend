import { Controller } from "react-hook-form";

const OptionsList = ({ fields, control, remove, append }) => (
  <div className="mb-4">
    {fields.map((field, index) => (
      <div key={field.id} className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Option {index + 1}:
          <Controller
            name={`options.${index}.value`}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...field}
              />
            )}
          />
        </label>
        <button
          type="button"
          className="text-red-500 rounded-md shadow-sm hover:text-black"
          onClick={() => remove(index)}
        >
          Delete Option
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
      onClick={() => append({ value: "" })}
    >
      Add Option
    </button>
  </div>
);
export default OptionsList;
