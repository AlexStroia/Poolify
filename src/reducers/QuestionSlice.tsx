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
      })
      .addCase(updateQuestionVotesAction.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.error = message;
        state.loading = false;
      })
      .addCase(updateQuestionVotesAction.fulfilled, (state, action) => {
        const payload = action.payload;
        state.loading = false;
        state.error = null;

        const question = state.question;

        if (payload?.voteOptionFirst) {
          question!.voteOptionFirst = payload.voteOptionFirst ?? "0";
        }

        if (payload?.voteOptionSecond) {
          question!.voteOptionSecond = payload.voteOptionSecond ?? "0";
        }
        state.question = question;
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
        state.avatarUrl = avatarUrl;
      })

      .addCase(getUserQuestionAnswerById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getUserQuestionAnswerById.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.loading = false;
        state.error = message;
      })
      .addCase(getUserQuestionAnswerById.fulfilled, (state, action) => {
        const userAnswer = action.payload ?? "";
        state.loading = false;
        state.userAnswer = userAnswer;
      });
  },
});

export const { actions, reducer } = questionSlice;
