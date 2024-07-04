import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAndSetTheme } from "../store/Slices/themeSlice";
function Theme() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  return (
    <div className="dark:bg-zinc-600 bg-zinc-100 h-screen w-full">
      <p>Theme in the test</p>
      <button
        className="dark:bg-zinc-600 bg-zinc-100 h-screen "
        onClick={() => {
          dispatch(toggleAndSetTheme());
        }}
      >
        theme change
      </button>
    </div>
  );
}

export default Theme;
