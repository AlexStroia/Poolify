import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dashboardPageInitialState } from "../state/ApplicationState";
import { saveUserQuestion } from "../actions/SaveUserQuestion";
import { getAllQuestions } from "../actions/GetAllQuestions";
import { getUserQuestions } from "../actions/GetUserQuestions";
import { QuestionData } from "../model/QuestionData";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardPageInitialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    getNewQuestions(state, action: PayloadAction<QuestionData[]>) {
      console.log("Get new questions called");
      state.userNewQuestions = state.allQuestions.filter(
        (question) =>
          !state.userAnsweredQuestions.some(
            (answeredQuestion) => answeredQuestion.id === question.id,
          ),
      );
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
      })
      .addCase(getAllQuestions.pending, (state, _) => {
        state.loadingNewQuestions = true;
        state.errorMessage = "";
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.loadingNewQuestions = false;
        state.errorMessage = message;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        const questions = action.payload;
        state.loadingNewQuestions = false;
        state.errorMessage = "";
        state.allQuestions = questions;
      })
      .addCase(getUserQuestions.pending, (state, _) => {
        state.loadingNewQuestions = true;
        state.loadingDoneQuestions = true;
        state.errorMessage = "";
      })
      .addCase(getUserQuestions.fulfilled, (state, action) => {
        const userAnsweredQuestions = action.payload;
        state.loading = false;
        state.loadingNewQuestions = false;
        state.loadingDoneQuestions = false;
        state.errorMessage = "";
        state.userAnsweredQuestions = userAnsweredQuestions;
        state.userNewQuestions = state.allQuestions.filter(
          (question) =>
            !state.userAnsweredQuestions.some(
              (answeredQuestion) => answeredQuestion.id === question.id,
            ),
        );
      })
      .addCase(getUserQuestions.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.loading = false;
        state.loadingNewQuestions = false;
        state.loadingDoneQuestions = false;
        state.errorMessage = message;
      });
  },
});

export const { changePage, getNewQuestions } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
