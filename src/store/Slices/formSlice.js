import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
const initialState = {
  loading: false,
  forms: [],
};

export const addForm = createAsyncThunk("addForm", async (details) => {
  const response = await axiosInstance.post("/forms", details);
  return response.data;
});

export const getFormsByUser = createAsyncThunk("getFormsByUser", async () => {
  const response = await axiosInstance.get(`forms/user/all-forms`);
  return response.data.data;
});

export const deleteForm = createAsyncThunk("deleteForm", async (id) => {
  const response = await axiosInstance.delete(`forms/${id}`);
  return id;
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

    builder
      .addCase(getFormsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFormsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(getFormsByUser.rejected, (state) => {
        state.loading = false;
        state.forms = [];
      });

    builder
      .addCase(deleteForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.filter((form) => form._id !== action.payload);
      })
      .addCase(deleteForm.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default formSlice.reducer;
