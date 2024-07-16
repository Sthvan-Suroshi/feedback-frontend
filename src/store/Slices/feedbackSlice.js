import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedbacks: [],
  feedback: null,
  loading: false,
};

export const addFeedback = createAsyncThunk("addFeedback", async (details) => {
  const response = await axiosInstance.post(`/response/:${formId}`, details);
  return response.data;
});

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
        state.feedback = action.payload;
        state.feedbacks = [...state.feedbacks, action.payload];
      });
  },
});

export default feedbackSlice.reducer;
