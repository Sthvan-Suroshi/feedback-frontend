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
  ViewImageDetails,
  FormBuilder,
  AllFormsTable,
} from "./components";
import Auth from "./components/Auth";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import { Toaster } from "react-hot-toast";

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
        <Route path="/feedback/:id" element={<ViewImageDetails />} />

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
          <Route
            path="/all-images"
            element={
              <Auth authentication={true}>
                <AllImageResponse />
              </Auth>
            }
          />

          <Route path="/create-form" element={<FormBuilder />} />
          <Route path="/all-forms" element={<AllFormsTable />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
