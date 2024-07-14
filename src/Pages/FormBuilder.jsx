import React, { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addForm } from "../store/Slices/formSlice";
import {
  QuestionsList,
  OptionsList,
  FormCheckbox,
  FormTextArea,
  FormInput,
} from "../components/index";
import toast from "react-hot-toast";

const FormBuilder = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      question: "",
      options: [{ value: "" }],
      useDescription: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const useDescription = watch("useDescription");

  const onSubmit = useCallback(
    async (data) => {
      if (questions.length === 0) {
        toast.error("Please add atleast one question");
        return;
      }
      const formData = {
        title: data.title,
        description: data.description,
        questions,
      };

      const res = await dispatch(addForm(formData));
      if (res.type === "addForm/fulfilled") {
        toast.success("Form added successfully");
        reset({
          title: "",
          description: "",
          question: "",
          options: [{ value: "" }],
          useDescription: false,
        });
        setQuestions([]);
      }
    },
    [questions, dispatch, reset]
  );

  const handleAddQuestion = useCallback(
    (data) => {
      if (
        !data.question.trim() ||
        (!data.useDescription && data.options.every((opt) => !opt.value.trim()))
      ) {
        return;
      }

      const newQuestion = {
        question: data.question,
        options: data.useDescription
          ? null
          : data.options
              .map((opt) => opt.value)
              .filter((opt) => opt.trim() !== ""),
        description: data.useDescription ? true : null,
      };

      if (editIndex !== null) {
        const updatedQuestions = [...questions];
        updatedQuestions[editIndex] = newQuestion;
        setQuestions(updatedQuestions);
        setEditIndex(null);
      } else {
        setQuestions([...questions, newQuestion]);
      }

      reset({
        ...data,
        question: "",
        options: [{ value: "" }],
        useDescription: false,
      });
    },
    [editIndex, questions, reset]
  );

  const handleEditQuestion = useCallback(
    (index) => {
      const questionToEdit = questions[index];
      setValue("question", questionToEdit.question);
      setValue(
        "options",
        questionToEdit.options
          ? questionToEdit.options.map((opt) => ({ value: opt }))
          : [{ value: "" }]
      );
      setValue("useDescription", !!questionToEdit.description);
      setEditIndex(index);
    },
    [questions, setValue]
  );

  const handleDeleteQuestion = useCallback(
    (index) => {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    },
    [questions]
  );

  return (
    <div className="mx-auto p-4 flex gap-40">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <h2 className="text-2xl font-bold mb-4">Create Feedback Form</h2>
        <FormInput label="Form Title" name="title" control={control} />
        <FormTextArea
          label="Form Description"
          name="description"
          control={control}
        />
        <FormInput label="Question" name="question" control={control} />
        <FormCheckbox
          label="Use Description"
          name="useDescription"
          control={control}
          onChange={(e) => {
            setValue("useDescription", e.target.checked);
            if (e.target.checked) {
              fields.forEach((_, index) => remove(index));
            } else {
              append({ value: "" });
            }
          }}
        />
        {!useDescription && (
          <OptionsList
            fields={fields}
            control={control}
            remove={remove}
            append={append}
          />
        )}
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
      <QuestionsList
        questions={questions}
        handleEditQuestion={handleEditQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
      />
    </div>
  );
};

export default FormBuilder;
