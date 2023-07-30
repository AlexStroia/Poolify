import { createSlice } from "@reduxjs/toolkit";
import { questionInitialState } from "../state/ApplicationState";
import { getQuestionAction } from "../actions/GetQuestionAction";
import { saveUserAnswerAction } from "../actions/SaveUserAnswer";
import { updateQuestionVotesAction } from "../actions/UpdateQuestionVotesAction";
import { getAvatarUrlAction } from "../actions/GetAvatarUrlAction";
import { getUserQuestionAnswerById } from "../actions/GetUserQuestionAnswerById";

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
        const userAnswer = action.payload ?? "";
        state.loading = false;
        state.error = null;
        state.userAnswer =
          userAnswer.questionOptionFirst === null
            ? userAnswer.questionOptionSecond
            : userAnswer.questionOptionFirst;
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
      })
      .addCase(getAvatarUrlAction.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvatarUrlAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(getAvatarUrlAction.fulfilled, (state, action) => {
        const avatarUrl = action.payload;
        state.loading = false;
        state.error = null;
        state.avatarUrl = avatarUrl;
      })

      .addCase(getUserQuestionAnswerById.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserQuestionAnswerById.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(getUserQuestionAnswerById.fulfilled, (state, action) => {
        const userAnswer = action.payload ?? "";
        state.loading = false;
        state.error = null;
        state.userAnswer = userAnswer;
      });
  },
});

export const { actions, reducer } = questionSlice;
