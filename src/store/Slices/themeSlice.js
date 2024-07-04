import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleAndSetTheme: (state, action) => {
      const newTheme =
        action.payload || (state.theme === "light" ? "dark" : "light");
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    },
  },
});

export const { toggleAndSetTheme } = themeSlice.actions;

export default themeSlice.reducer;
