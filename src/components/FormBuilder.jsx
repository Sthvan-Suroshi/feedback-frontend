import { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addForm } from "../store/Slices/formSlice";
import { QuestionsList, OptionsList, FormCheckbox, FormInput } from "./index";
import toast from "react-hot-toast";
import { LuSparkle } from "react-icons/lu";
import { GenerateQuestions } from "../utils/geminiGenerator";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";

const FormBuilder = ({ title, description }) => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loader, setLoader] = useState(false);

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      question: "",
      options: [{ value: "" }],
      useDescription: false
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options"
  });

  const useDescription = watch("useDescription");

  // Keeping all the original handlers
  const onSubmit = useCallback(async () => {
    if (questions.length === 0) {
      toast.error("Please add atleast one question");
      return;
    }

    const formData = { title, description, questions };
    const res = await dispatch(addForm(formData));
    if (res.type === "addForm/fulfilled") {
      toast.success("Form added successfully");
      reset({
        title: "",
        description: "",
        question: "",
        options: [{ value: "" }],
        useDescription: false
      });
      setQuestions([]);
    }
  }, [questions, dispatch, reset, description, title]);

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
        description: data.useDescription ? true : null
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
        useDescription: false
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

  const handleAIGenerate = async () => {
    try {
      setLoader(true);
      const questionString = await GenerateQuestions();
      const cleanedJSON = questionString.replace(/```json|```/g, "").trim();
      const parsedQuestions = JSON.parse(cleanedJSON);
      setQuestions((prevQuestions) => [...prevQuestions, ...parsedQuestions]);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 py-4 flex items-center justify-center w-full ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="md:w-1/2 min-w-[30vw] bg-white rounded-xl shadow-lg p-6 h-4/5">
            <div className="border-b pb-4 ">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <FormInput
                  label="Question"
                  name="question"
                  control={control}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
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
              </div>

              {!useDescription && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <OptionsList
                    fields={fields}
                    control={control}
                    remove={remove}
                    append={append}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSubmit(handleAddQuestion)}
                  className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {editIndex !== null ? (
                    <>
                      <AiOutlineEdit className="text-xl" />
                      Update Question
                    </>
                  ) : (
                    <>
                      <AiOutlinePlus className="text-xl" />
                      Add
                    </>
                  )}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Publish Form
                </button>
              </div>
            </form>
          </div>

          {/* Questions List Section */}

          <div className="bg-white rounded-xl shadow-lg p-6  min-w-[30vw]">
            <QuestionsList
              questions={questions}
              handleEditQuestion={handleEditQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          </div>
        </div>
      </div>

      {/* AI Generate Button */}
      <button
        onClick={handleAIGenerate}
        className={`fixed bottom-8 right-8 ${loader ? "size-28" : "size-16"} bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-1 group`}
      >
        <span className="font-bold opacity-0 group-hover:opacity-100 absolute transform -translate-y-8 bg-gray-800 text-white px-3 py-1 rounded text-sm transition-all duration-200">
          Generate with AI
        </span>
        <span className="font-bold">{loader ? "wait" : "AI"}</span>
        <LuSparkle className="text-xl" />
      </button>
    </div>
  );
};

export default FormBuilder;
