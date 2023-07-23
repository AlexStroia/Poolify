import { createSlice } from "@reduxjs/toolkit";
import { questionInitialState } from "../state/ApplicationState";
import { getQuestionAction } from "../actions/GetQuestionAction";

export const questionSlice = createSlice({
  name: "question",
  initialState: questionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionAction.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(getQuestionAction.fulfilled, (state, action) => {
        console.log("Payload is " + action.payload);
        const question = action.payload;
        state.loading = false;
        state.error = null;
        state.question = question;
      });
  },
});

export const questionReducer = questionSlice.reducer;
