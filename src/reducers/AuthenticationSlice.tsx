import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authenticationState } from "../state/ApplicationState";
import "firebase/auth";
import { loginAction } from "../actions/LoginAction";
import { signupAction } from "../actions/SignupAction";
import { forgotPasswordAction } from "../actions/ForgotPasswordAction";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: authenticationState,
  reducers: {
    reset(state) {
      state.errorMessage = "";
      state.loading = false;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.loading = false;
        state.errorMessage = "";
        state.user = {
          displayName: user?.displayName,
          email: user?.email,
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.errorMessage = message;
        state.loading = false;
      })
      .addCase(signupAction.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(signupAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.errorMessage = message;
        state.loading = false;
      })
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.errorMessage = message;
        state.loading = false;
      });
  },
});
export const { reset } = authenticationSlice.actions;
export const authReducer = authenticationSlice.reducer;
