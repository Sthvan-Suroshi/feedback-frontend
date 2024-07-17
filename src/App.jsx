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
  ViewAllForms,
  FeedbackForm,
} from "./components";
import Auth from "./components/Auth";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import { Toaster } from "react-hot-toast";
import ViewFormDetails from "./components/ViewFormDetails";

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
        <Route path="/form/:id" element={<ViewFormDetails />} />
        <Route
          path="/fill-form/:id"
          element={
            <Auth authentication={true} allowedRoles={["student"]}>
              <FeedbackForm />
            </Auth>
          }
        />

        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload-feedback"
            element={
              <Auth authentication={true} allowedRoles={["student"]}>
                <ImageFeedback />
              </Auth>
            }
          />

          <Route
            path="/view-responses"
            element={
              <Auth
                authentication={true}
                allowedRoles={["instructor", "student"]}
              >
                <ImageResponseView />
              </Auth>
            }
          />

          <Route
            path="/all-images"
            element={
              <Auth authentication={true} allowedRoles={["admin"]}>
                <AllImageResponse />
              </Auth>
            }
          />

          <Route
            path="/create-form"
            element={
              <Auth authentication={true} allowedRoles={["instructor"]}>
                <FormBuilder />
              </Auth>
            }
          />

          <Route
            path="/your-forms"
            element={
              <Auth authentication={true} allowedRoles={["instructor"]}>
                <AllFormsTable />
              </Auth>
            }
          />

          <Route
            path="/view-forms"
            element={
              <Auth authentication={true} allowedRoles={["student"]}>
                <ViewAllForms />
              </Auth>
            }
          />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
