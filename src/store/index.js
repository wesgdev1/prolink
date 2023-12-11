import { configureStore } from "@reduxjs/toolkit";
import pingReducer from "./pingReducers";

export const store = configureStore({
  reducer: {
    pings: pingReducer,
  },
});

export default store;
