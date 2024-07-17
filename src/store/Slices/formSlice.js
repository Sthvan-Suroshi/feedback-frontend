import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  forms: [],
  form: null,
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
  await axiosInstance.delete(`forms/${id}`);
  return id;
});

export const getFormByDept = createAsyncThunk("getFormByDept", async () => {
  const response = await axiosInstance.get(`forms/department/all-forms`);
  return response.data.data;
});

export const getFormDetails = createAsyncThunk("getFormDetails", async (id) => {
  const response = await axiosInstance.get(`forms/${id}`);

  return response.data.data;
});

export const updateForm = createAsyncThunk("updateForm", async (details) => {
  const { formId } = details;
  const response = await axiosInstance.patch(`forms/${formId}`, details);
  return response.data;
});

export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async (questionId) => {
    console.log(questionId);
    const response = await axiosInstance.delete(`forms/question/${questionId}`);
    console.log(response.data);
    return response.data;
  }
);

export const updateQuestion = createAsyncThunk(
  "updateQuestion",
  async (details) => {
    const { questionId } = details;
    const response = await axiosInstance.patch(
      `forms/question/${questionId}`,
      details
    );
    return response.data;
  }
);

export const getAllForms = createAsyncThunk("getAllForms", async () => {
  const response = await axiosInstance.get(`forms/admin/all-forms`);
  return response.data.data;
});

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.form = null;
    },
  },
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

    builder
      .addCase(getFormByDept.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFormByDept.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(getFormByDept.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getFormDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFormDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload;
      });

    builder
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload;
      })
      .addCase(updateForm.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload;
      })
      .addCase(deleteQuestion.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getAllForms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllForms.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(getAllForms.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetForm } = formSlice.actions;

export default formSlice.reducer;
