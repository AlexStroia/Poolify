import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { appState } from "../state/ApplicationState";
import "firebase/auth";
import { loginAction } from "../actions/LoginAction";
import { signupAction } from "../actions/SignupAction";

export const authenticationSlice = createSlice({
  name: "auth",
  initialState: appState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>,
    ) {
      const payload = action.payload;
      state.authentication.user = {
        id: payload.id,
        email: payload.email,
        token: payload.token,
      };
    },
    signup(
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>,
    ) {
      const payload = action.payload;
      state.authentication.user = {
        id: payload.id,
        email: payload.email,
        token: payload.token,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.authentication = { ...state.authentication, loading: true };
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authentication = { ...state.authentication, loading: false };
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authentication = {
          ...state.authentication,
          error: action.payload as string,
          loading: false,
        };
      })
      .addCase(signupAction.pending, (state) => {
        state.authentication = { ...state.authentication, loading: true };
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.authentication = { ...state.authentication, loading: false };
      })
      .addCase(signupAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.authentication.error = message;
      });
  },
});
export const { login, signup } = authenticationSlice.actions;
export const authReducer = authenticationSlice.reducer;
