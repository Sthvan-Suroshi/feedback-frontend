import React from "react";
import GetImagePreview from "./GetImagePreview";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addImageFeedback } from "../store/Slices/imageFeedbackSlice";

function ImageFeedback() {
  const { handleSubmit, register, control } = useForm();

  const dispatch = useDispatch();
  const test = async (data) => {
    const res = await dispatch(addImageFeedback(data));
    console.log(res);
  };
  return (
    <form
      className="w-full mt-10 overflow-y-auto"
      onSubmit={handleSubmit(test)}
    >
      <div className="w-3/4 h-1/2 mx-auto border-slate-900 border-4 rounded-md">
        <GetImagePreview
          name="image"
          control={control}
          className="w-full object-cover border-none border-slate-900 h-full"
          cameraIcon
        />
      </div>
      <div className="w-full flex items-center mt-6 flex-col">
        <div className="w-3/4 flex flex-col ">
          <label htmlFor="title" className="">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter feedback title"
            className=" border-2 bg-slate-200 py-1 focus:outline-none px-1 rounded-md"
            {...register("title", {
              required: true,
            })}
          />

          <label htmlFor="description" className="mt-2">
            Description
          </label>
          <textarea
            name="description"
            type="text"
            rows="5"
            cols="30"
            placeholder="Enter feedback description"
            className="border-2 bg-slate-200 py-1 px-1 focus:outline-none resize-none rounded-md"
            {...register("description", {
              required: true,
            })}
          />
        </div>
      </div>
      <div className="w-full flex items-center mt-6 flex-col">
        <button className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ImageFeedback;
