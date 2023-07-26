import { createSlice } from "@reduxjs/toolkit";
import { dashboardPageInitialState } from "../state/ApplicationState";
import { saveUserQuestion } from "../actions/SaveUserQuestion";
import { getAllQuestions } from "../actions/GetAllQuestions";
import { getUserQuestions } from "../actions/GetUserQuestions";
import { getAllUsers } from "../actions/GetAllUsers";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardPageInitialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    mapQuestionsPutPerUser(state, action) {},
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
        if (
          state.userNewQuestions !== null &&
          state.userNewQuestions !== undefined &&
          state.userAnsweredQuestions !== null &&
          state.userAnsweredQuestions !== undefined
        ) {
          if (
            Array.isArray(state.userNewQuestions) &&
            Array.isArray(state.userAnsweredQuestions)
          ) {
            state.userNewQuestions = state.allQuestions.filter(
              (question) =>
                !state.userAnsweredQuestions.some(
                  (answeredQuestion) => answeredQuestion.id === question.id,
                ),
            );
          }
        }
      })
      .addCase(getUserQuestions.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.loading = false;
        state.loadingNewQuestions = false;
        state.loadingDoneQuestions = false;
        state.errorMessage = message;
      })

      .addCase(getAllUsers.pending, (state, _) => {
        state.loadingNewQuestions = true;
        state.loadingDoneQuestions = true;
        state.errorMessage = "";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        const payload = action.payload as { message: string };
        const message = payload.message;
        state.loading = false;
        state.loadingNewQuestions = false;
        state.loadingDoneQuestions = false;
        state.errorMessage = message;
      });
  },
});

export const { changePage } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
