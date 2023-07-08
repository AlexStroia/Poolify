import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/AuthenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
  },
});
