import GetImagePreview from "./GetImagePreview";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import { editImageFeedback } from "../store/Slices/imageFeedbackSlice";
import toast from "react-hot-toast";

function EditImageFeedback({ post, setPopUp }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.imageFeedback.loading);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      title: post?.title,
      description: post?.description
    }
  });

  const editFeedback = async (data) => {
    data._id = post._id;
    const res = await dispatch(editImageFeedback(data));

    if (res.type === "editImageFeedback/fulfilled") {
      toast.success("Feedback edited successfully");
      setPopUp(false);
    }

    if (res.type === "editImageFeedback/rejected") {
      toast.error("Couldn't edit feedback");
    }
  };

  return (
    <div className="w-screen flex items-center mt-10 justify-center h-screen">
      <form
        className=" w-3/4 h-3/4 bg-slate-200 py-3 px-2 rounded-lg"
        onSubmit={handleSubmit(editFeedback)}
      >
        <div className="flex p-3 items-center justify-between">
          <button
            className="text-xl"
            type="button"
            onClick={() => {
              setPopUp(false);
            }}
          >
            <ImCancelCircle />
          </button>
          <p className="text-lg basis-3/5">Edit Image Feedback</p>
        </div>

        <div className="p-3 flex h-[80%] items-center justify-center gap-3 w-full">
          <div className="basis-1/2 bg-white w-full h-full rounded-xl">
            <GetImagePreview
              name="image"
              control={control}
              className="w-full object-cover  h-full"
              cameraIcon
              image={post?.imageUrl}
            />
          </div>

          <div className="basis-1/2 h-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="">
                Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter feedback title"
                className=" border-2 bg-slate-50 py-1  px-1 rounded-md"
                {...register("title", {
                  required: true
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
                className="border-2 bg-slate-50 py-1 px-1 resize-y rounded-md max-h-64"
                {...register("description", {
                  required: true
                })}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center flex-col">
          <button
            className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-slate-400 px-3 py-2 text-center font-semibold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            type="submit"
          >
            {loading ? "Updating ....." : "Update Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditImageFeedback;
