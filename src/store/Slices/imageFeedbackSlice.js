import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  feedbacks: [],
  loading: false,
  status: false,
};

export const addImageFeedback = createAsyncThunk(
  "addImageFeedback",
  async (details) => {
    const form = new FormData();
    form.append("title", details.title);
    form.append("description", details.description);
    form.append("image", details.image[0]);

    const response = await axiosInstance.post("/imageFeedback/upload", form);
    console.log(response);
    return response.data;
  }
);

const imageFeedbackSlice = createSlice({
  name: "imageFeedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addImageFeedback.pending, (state) => {
        state.loading = true;
        state.status = false;
      })
      .addCase(addImageFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.feedbacks = action.payload;
      })
      .addCase(addImageFeedback.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  },
});

export default imageFeedbackSlice.reducer;
