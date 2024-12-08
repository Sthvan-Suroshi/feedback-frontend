import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  userDetails: null,
  loading: false,
  status: false,
  accountType: null
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (details) => {
    const response = await axiosInstance.post("/users/register", details);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("loginUser", async (details) => {
  const response = await axiosInstance.post("/users/login", details);

  return response.data.data;
});

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/current-user");
  return response.data.data;
});

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
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
        state.accountType = action.payload.accountType;
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
        state.accountType = action.payload.accountType;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.userDetails = null;
        state.status = false;
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userDetails = action.payload;
        state.accountType = action.payload.accountType;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.status = false;
        state.userDetails = null;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.status = false;
        state.userDetails = null;
        state.accountType = null;
      });
  }
});

export default authSlice.reducer;
