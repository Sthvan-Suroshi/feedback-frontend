import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { ImageFeedback, Signup, Signin } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/upload-feedback" element={<ImageFeedback />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
