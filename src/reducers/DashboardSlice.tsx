import { createSlice } from "@reduxjs/toolkit";
import { dashboardPageInitialState } from "../state/ApplicationState";
import { saveUserAction } from "../actions/SaveUserAction";
import { saveUserQuestion } from "../actions/SaveUserQuestion";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardPageInitialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserQuestion.pending, (state, _) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(saveUserQuestion.fulfilled, (state, _) => {
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(saveUserQuestion.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.loading = false;
        state.errorMessage = message;
      });
  },
});

export const { changePage } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
