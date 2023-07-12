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
      action: PayloadAction<{ email: string; token: string; id: string }>
    ) {
      const payload = action.payload;
      state.auth.user = {
        id: payload.id,
        email: payload.email,
        token: payload.token,
      };
    },
    signup(
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>
    ) {
      const payload = action.payload;
      state.auth.user = {
        id: payload.id,
        email: payload.email,
        token: payload.token,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.auth = { ...state.auth, loading: true };
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.auth = { ...state.auth, loading: false };
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.auth = { ...state.auth, error: action.payload, loading: false };
      })
      .addCase(signupAction.pending, (state) => {
        state.auth = { ...state.auth, loading: true };
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.auth = { ...state.auth, loading: false };
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.auth = { ...state.auth, error: action.payload, loading: false };
      });
  },
});
export const { login, signup } = authenticationSlice.actions;
export const authReducer = authenticationSlice.reducer;
