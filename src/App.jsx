import React, { useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
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
  FormAnalytics,
  AdminViewForms,
  ViewFormDetails,
  CreateAdmin,
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin Routes */}
        <Route
          element={
            <Auth authentication={true} allowedRoles={["admin"]}>
              <Layout />
            </Auth>
          }
        >
          <Route path="/feedback/:id" element={<ViewImageDetails />} />
          <Route path="/all-images" element={<AllImageResponse />} />
          <Route path="/admin/view-forms" element={<AdminViewForms />} />
          <Route path="/add-admin" element={<CreateAdmin />} />
        </Route>

        {/* Admin and Instructor Routes */}
        <Route
          element={
            <Auth authentication={true} allowedRoles={["admin", "instructor"]}>
              <Layout />
            </Auth>
          }
        >
          <Route path="/form/:id" element={<ViewFormDetails />} />
          <Route path="/analytics/:id" element={<FormAnalytics />} />
          <Route path="/create-form" element={<FormBuilder />} />
          <Route path="/your-forms" element={<AllFormsTable />} />
        </Route>

        {/* Student Routes */}
        <Route
          element={
            <Auth authentication={true} allowedRoles={["student"]}>
              <Layout />
            </Auth>
          }
        >
          <Route path="/fill-form/:id" element={<FeedbackForm />} />
          <Route path="/upload-feedback" element={<ImageFeedback />} />
          <Route path="/view-forms" element={<ViewAllForms />} />
        </Route>

        {/* Instructor and Student Routes */}
        <Route
          element={
            <Auth
              authentication={true}
              allowedRoles={["instructor", "student"]}
            >
              <Layout />
            </Auth>
          }
        >
          <Route path="/view-responses" element={<ImageResponseView />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
