import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getImageFeedback } from "../store/Slices/imageFeedbackSlice";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";

function ViewImageDetails() {
  const { id } = useParams();
  const imgId = atob(id);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.imageFeedback.loading);

  useEffect(() => {
    dispatch(getImageFeedback(imgId));
  }, [id, dispatch, imgId]);

  const feedback = useSelector((state) => state.imageFeedback.feedback);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }
  return (
    <div className="">
      {feedback && (
        <>
          <Link
            to="/all-images"
            className="flex items-center my-4 mx-3 font-semibold"
          >
            <IoIosArrowBack /> Back
          </Link>
          <div className="flex items-center justify-center gap-4 p-2 ">
            <div className="basis-1/2">
              <img
                src={feedback.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="basis-1/2 ">
              <h3 className="text-xl bg-slate-200 mb-3 p-2 rounded-md">
                {feedback.title}
              </h3>

              <div className="text-lg overflow-y-scroll min-h-96 max-h-[500px] bg-slate-200 mb-3 p-2 custom-scrollbar rounded-md">
                <p>{feedback.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewImageDetails;
