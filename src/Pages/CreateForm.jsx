import { useState } from "react";
import { FormBuilder } from "../components";
import { FaArrowRight } from "react-icons/fa";
function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [next, setNext] = useState(false);

  return (
    <div className="mx-auto">
      {next ? (
        <FormBuilder title={title} description={description} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-w-96">
          <h2 className="text-2xl font-bold mb-4">
            Enter Form Title and Description
          </h2>
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-semibold ">
              Title*
            </label>
            <input
              required={true}
              name="title"
              placeholder="Enter title"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description" className="font-semibold">
              Description*
            </label>
            <textarea
              required={true}
              placeholder="Enter description"
              name="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input type="text" />

            <button
              onClick={() => setNext(true)}
              disabled={title === "" || description === ""}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-1/2 rounded-md p-2 disabled:cursor-not-allowed disabled:bg-blue-400 flex items-center justify-center"
            >
              Next{" "}
              <span>
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateForm;
