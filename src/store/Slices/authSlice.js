import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
const initialState = {
  userDetails: null,
  loading: false,
  status: false,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (details) => {
    console.log(details);

    const response = await axiosInstance.post("/users/register", details);
    console.log(response);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("loginUser", async (details) => {
  const response = await axiosInstance.post("/users/login", details);
  console.log(response);
  return response.data.data;
});

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/current-user");

  return response.data.data;
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
        state.status = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.userDetails = null;
        state.status = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
        state.status = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.userDetails = null;
        state.status = false;
      });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userDetails = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userDetails = null;
    });
  },
});

export default authSlice.reducer;
