import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  feedbacks: [],
  loading: false,
};

export const addImageFeedback = createAsyncThunk(
  "addImageFeedback",
  async (details) => {
    try {
      const form = new FormData();
      form.append("title", details.title);
      form.append("description", details.description);
      form.append("image", details.image[0]);

      const response = await axiosInstance.post("/imageFeedbacks/upload", form);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const editImageFeedback = createAsyncThunk(
  "editImageFeedback",
  async (details) => {
    try {
      const form = new FormData();
      form.append("title", details.title);
      form.append("description", details.description);

      if (details.image) {
        form.append("image", details.image[0]);
      }

      const response = await axiosInstance.patch(
        `/imageFeedbacks/edit/${details._id}`,
        form
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteImageFeedback = createAsyncThunk(
  "deleteImageFeedback",
  async (id) => {
    const response = await axiosInstance.delete(`/imageFeedbacks/delete/${id}`);
    return response.data;
  }
);

export const getAllUserImageResponses = createAsyncThunk(
  "getAllUserImageResponses",
  async (id) => {
    const response = await axiosInstance.get(
      `/imageFeedbacks/user/image-responses`
    );
    return response.data.data;
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

    builder
      .addCase(editImageFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(editImageFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(editImageFeedback.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteImageFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteImageFeedback.fulfilled, (state) => {
        state.loading = false;
      });

    builder.addCase(getAllUserImageResponses.fulfilled, (state, action) => {
      state.loading = false;
      state.feedbacks = action.payload;
    });
  },
});

export default imageFeedbackSlice.reducer;
