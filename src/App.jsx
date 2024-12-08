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
  AllFormsTable,
  ViewAllForms,
  FeedbackForm,
  FormAnalytics,
  AdminViewForms,
  ViewFormDetails,
  CreateAdmin,
  CreateForm
} from "./components";
import Auth from "./components/Auth";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/form/:id"
          element={
            <Auth authentication allowedRoles={["instructor", "admin"]}>
              <ViewFormDetails />
            </Auth>
          }
        />

        <Route
          path="/feedback/:id"
          element={
            <Auth authentication allowedRoles={["admin"]}>
              <ViewImageDetails />
            </Auth>
          }
        />

        <Route
          path="/analytics/:id"
          element={
            <Auth authentication allowedRoles={["admin", "instructor"]}>
              <FormAnalytics />
            </Auth>
          }
        />

        <Route
          path="/fill-form/:id"
          element={
            <Auth authentication allowedRoles={["student"]}>
              <FeedbackForm />
            </Auth>
          }
        />
        <Route
          element={
            <Auth authentication allowedRoles={["admin"]}>
              <Layout />
            </Auth>
          }
        >
          <Route path="/all-images" element={<AllImageResponse />} />
          <Route path="/admin/view-forms" element={<AdminViewForms />} />
          <Route path="/add-admin" element={<CreateAdmin />} />
        </Route>

        <Route
          element={
            <Auth authentication allowedRoles={["admin", "instructor"]}>
              <Layout />
            </Auth>
          }
        >
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/your-forms" element={<AllFormsTable />} />
        </Route>

        <Route
          element={
            <Auth authentication allowedRoles={["student"]}>
              <Layout />
            </Auth>
          }
        >
          <Route path="/upload-feedback" element={<ImageFeedback />} />
          <Route path="/view-forms" element={<ViewAllForms />} />
        </Route>

        <Route
          element={
            <Auth authentication allowedRoles={["student"]}>
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
