import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../state/ApplicationState";

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {},
    signup(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {},
  },
});
export const { login, signup } = authenticationSlice.actions;
export const authReducer = authenticationSlice.reducer;
