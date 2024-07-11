import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
const initialState = {
  loading: false,
};

export const addForm = createAsyncThunk("addForm", async (details) => {
  const response = await axiosInstance.post("/forms", details);
  return response.data;
});

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(addForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addForm.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default formSlice.reducer;
