import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js";
import imageFeedbackReducer from "./Slices/imageFeedbackSlice.js";
import themeReducer from "./Slices/themeSlice.js";
import formReducer from "./Slices/formSlice.js";
import feedbackReducer from "./Slices/feedbackSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    imageFeedback: imageFeedbackReducer,
    theme: themeReducer,
    form: formReducer,
    feedback: feedbackReducer,
  },
});

export default store;
