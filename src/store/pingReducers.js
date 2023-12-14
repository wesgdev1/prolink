import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ips: [],
};

const pingSlice = createSlice({
  name: "ping",
  initialState,
  reducers: {
    addIp: (state, action) => {
      state.ips.push(action.payload);
    },
    removeIp: (state, action) => {
      const { ip } = action.payload;
      state.ips = state.ips.filter((element) => element.ip !== ip);
    },

    setPingResult: (state, action) => {
      const { ip, result } = action.payload;

      const ipIndex = state.ips.findIndex((e) => e.ip === ip);
      state.ips[ipIndex].result = result;
    },
  },
});

export const { addIp, removeIp, setPingResult } = pingSlice.actions;
export default pingSlice.reducer;
