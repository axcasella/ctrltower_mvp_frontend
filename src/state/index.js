import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  // userID: "63701cc1f03239c72c00017f", // TODO: get this from login
  user: null,
  shipperID: "63701d74f0323986f3000146"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    }
  },
});

export const { setMode, setUser } = globalSlice.actions;

export default globalSlice.reducer;