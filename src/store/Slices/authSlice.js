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
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
        state.status = true;
      });

    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.userDetails = null;
      state.status = false;
    });
  },
});

export default authSlice.reducer;
