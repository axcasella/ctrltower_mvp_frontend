import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  shipperID: null,
  carrierID: null,
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
    },
    setShipperID: (state, action) => {
      state.shipperID = action.payload.shipperID;
    },
    setCarrierID: (state, action) => {
      state.carrierID = action.payload.carrierID;
    },
  },
});

export const { setMode, setUser, setCarrierID, setShipperID } = globalSlice.actions;

export default globalSlice.reducer;