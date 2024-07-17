import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  feedbacks: [],
  feedback: null,
  loading: false,
};

export const addFeedback = createAsyncThunk(
  "addFeedback",
  async ({ formId, responses }) => {
    console.log(formId, responses);
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
  },
});

export default feedbackSlice.reducer;
