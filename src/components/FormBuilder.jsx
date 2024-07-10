import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const FormBuilder = () => {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      question: "",
      options: [{ value: "" }],
      descriptionField: "",
      useDescription: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const onSubmit = async (data) => {
    // try {
    //   const response = await fetch("/api/forms", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title: data.title,
    //       description: data.description,
    //       questions: questions.map((q) => ({
    //         ...q,
    //         options: q.options.filter((opt) => opt !== null), // Filter out null options
    //       })),
    //     }),
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     console.log("Form saved:", result);
    //     setQuestions([]);
    //     reset({
    //       title: "",
    //       description: "",
    //       question: "",
    //       options: [{ value: "" }],
    //       descriptionField: "",
    //       useDescription: false,
    //     });
    //   } else {
    //     console.error("Failed to save form");
    //   }
    // } catch (error) {
    //   console.error("Error saving form:", error);
    // }
    const allQuestions = [
      ...questions,
      {
        question: data.question,
        options: data.options
          .map((opt) => opt.value)
          .filter((opt) => opt.trim() !== ""),
        description: data.useDescription ? data.descriptionField : null,
      },
    ];
    console.log(allQuestions);
  };

  const handleAddQuestion = (data) => {
    if (!data.question.trim()) {
      return;
    }

    if (
      !data.useDescription &&
      data.options.every((opt) => !opt.value.trim())
    ) {
      return;
    }

    const newQuestion = {
      question: data.question,
      options: data.useDescription
        ? null
        : data.options
            .map((opt) => opt.value)
            .filter((opt) => opt.trim() !== ""), // Filter empty options
      description: data.useDescription ? data.descriptionField : null,
    };

    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    // Reset question form fields
    reset({
      ...data,
      question: "",
      options: [{ value: "" }],
      descriptionField: "",
      useDescription: false,
    });
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setValue("question", questionToEdit.question);
    setValue(
      "options",
      questionToEdit.options
        ? questionToEdit.options.map((opt) => ({ value: opt }))
        : [{ value: "" }]
    );
    setValue("descriptionField", questionToEdit.description || "");
    setValue("useDescription", !!questionToEdit.description);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-2xl w-96 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Feedback Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Form Title:
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Form Description:
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Question:
            <Controller
              name="question"
              control={control}
              rules={{ required: "Question is required" }}
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Use Description:
            <Controller
              name="useDescription"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="ml-2"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.checked) {
                      remove();
                    } else {
                      append({ value: "" });
                    }
                  }}
                />
              )}
            />
          </label>
        </div>
        <Controller
          name="useDescription"
          control={control}
          render={({ field }) =>
            field.value ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                  <Controller
                    name="descriptionField"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...field}
                      />
                    )}
                  />
                </label>
              </div>
            ) : (
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
                      className=" text-red-500  rounded-md shadow-sm hover:text-black"
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
            )
          }
        />
        <div className="flex gap-2 w-full justify-between">
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 mb-4"
            onClick={handleSubmit(handleAddQuestion)}
          >
            {editIndex !== null ? "Update Question" : "Add Question"}
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 mb-4"
          >
            Submit
          </button>
        </div>
      </form>
      <h3 className="text-xl font-bold mb-2">Questions List</h3>
      <div className="list-disc">
        {questions.map((q, index) => (
          <p key={index} className="mb-2">
            <strong className="font-semibdivd">
              {index + 1} {q.question}
            </strong>
            {q.options ? (
              <div className="list-disc pl-2">
                {q.options.map((opt, idx) => (
                  <p key={idx} className="text-gray-700">
                    {idx + 1} {opt}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">{q.description}</p>
            )}
            <button
              type="button"
              className="bg-yellow-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-yellow-600 mr-2"
              onClick={() => handleEditQuestion(index)}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600"
              onClick={() => handleDeleteQuestion(index)}
            >
              Delete
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
