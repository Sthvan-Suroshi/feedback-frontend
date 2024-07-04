import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js";
import imageFeedbackReducer from "./Slices/imageFeedbackSlice.js";
import themeReducer from "./Slices/themeSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    imageFeedback: imageFeedbackReducer,
    theme: themeReducer,
  },
});

export default store;
