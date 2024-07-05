import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { ImageFeedback, Signup, Signin } from "./components";
import Auth from "./components/Auth";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div>
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
