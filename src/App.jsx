import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import {
  ImageFeedback,
  Signup,
  Signin,
  ImageResponseView,
  AllImageResponse,
} from "./components";
import Auth from "./components/Auth";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import { Toaster } from "react-hot-toast";
import FeedbackFormBuilder from "./components/customque";
import ViewImageDetails from "./components/ViewImageDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div className="">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <Auth authentication={false}>
                <Home />
              </Auth>
            }
          />
          <Route
            path="/upload-feedback"
            element={
              <Auth authentication={true}>
                <ImageFeedback />
              </Auth>
            }
          />

          <Route
            path="/view-responses"
            element={
              <Auth authentication={true}>
                <ImageResponseView />
              </Auth>
            }
          />
          <Route path="/all-images" element={<AllImageResponse />} />

          <Route path="/feedback/:id" element={<ViewImageDetails />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
