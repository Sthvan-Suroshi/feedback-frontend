import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  feedbacks: [],
  feedback: null,
  loading: false,
  exists: false,
};

export const addFeedback = createAsyncThunk(
  "addFeedback",
  async ({ formId, responses }) => {
    try {
      const response = await axiosInstance.post(
        `feedbacks/response/${formId}`,
        {
          responses: responses,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllFeedbacksToForm = createAsyncThunk(
  "getAllFeedbacksToForm",
  async (formId) => {
    try {
      const response = await axiosInstance.get(
        `feedbacks/all/response/${formId}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkFeedbackSubmission = createAsyncThunk(
  "checkFeedbackSubmission",
  async (formId) => {
    const response = await axiosInstance.get(`feedbacks/exists/${formId}`);

    return response.data.data.submitted;
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addFeedback.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getAllFeedbacksToForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFeedbacksToForm.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })
      .addCase(getAllFeedbacksToForm.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(checkFeedbackSubmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkFeedbackSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.exists = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
