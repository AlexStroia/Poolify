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
    // login(
    //   state,
    //   action: PayloadAction<{ email: string; token: string; id: string }>
    // ) {
    //   const payload = action.payload;
    //   state.error = "";
    //   state.user = {
    //     id: payload.id,
    //     email: payload.email,
    //     token: payload.token,
    //   };
    // },
    // signup(
    //   state,
    //   action: PayloadAction<{ email: string; token: string; id: string }>
    // ) {
    //   console.log("Signup called");
    //   const payload = action.payload;
    //   state.error = "";
    //   state.user = {
    //     id: payload.id,
    //     email: payload.email,
    //     token: payload.token,
    //   };
    // },
    // forgotPassword(state, action) {
    //   const payload = action.payload;
    //   state.error = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(loginAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(signupAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(signupAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.loading = true;
        state.error = "";
      });
  },
});
// export const { login, signup, forgotPassword } = authenticationSlice.actions;
export const authReducer = authenticationSlice.reducer;
