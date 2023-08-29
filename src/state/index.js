import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userID: "63701cc1f03239c72c00017f", // TODO: get this from login
  shipperID: "63701d74f0323986f3000146"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;