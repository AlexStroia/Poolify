import { createSlice } from "@reduxjs/toolkit";
import { questionInitialState } from "../state/ApplicationState";
import { getQuestionAction } from "../actions/GetQuestionAction";
import { saveUserQuestion } from "../actions/SaveUserQuestion";
import { saveUserAnswerAction } from "../actions/SaveUserAnswer";
import { updateQuestionVotesAction } from "../actions/UpdateQuestionVotesAction";

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
      })
      .addCase(saveUserAnswerAction.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserAnswerAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(saveUserAnswerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(updateQuestionVotesAction.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestionVotesAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(updateQuestionVotesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const questionReducer = questionSlice.reducer;
