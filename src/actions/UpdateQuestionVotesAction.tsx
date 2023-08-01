import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const updateQuestionVotesAction = createAsyncThunk(
  "question/vote",
  async (
    {
      questionId,
      voteOptionFirst,
      voteOptionSecond,
    }: {
      questionId: string;
      voteOptionFirst?: string | null;
      voteOptionSecond?: string | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const database = firebase.firestore();
      const questions = database.collection("questions");
      const question = questions.doc(questionId);
      const currentQuestion = await question.get();

      const currentVoteOptionFirst = parseInt(
        currentQuestion.data()?.voteOptionFirst ?? "0",
      );

      const currentVoteOptionSecond = parseInt(
        currentQuestion.data()?.voteOptionSecond ?? "0",
      );

      console.log("Current");
      console.log(currentVoteOptionFirst);
      console.log(currentVoteOptionSecond);

      if (currentQuestion) {
        if (voteOptionFirst !== null) {
          const newVoteOptionFirstValue = currentVoteOptionFirst + 1;
          await question.update({
            voteOptionFirst: currentVoteOptionFirst! + 1,
          });
          return {
            voteOptionFirst: newVoteOptionFirstValue.toString(),
          };
        } else if (voteOptionSecond !== null) {
          const newVoteOptionSecondValue = currentVoteOptionSecond + 1;
          await question.update({
            voteOptionSecond: newVoteOptionSecondValue,
          });
          return {
            voteOptionSecond: newVoteOptionSecondValue.toString(),
          };
        }
      } else {
        return rejectWithValue({ message: "Could not update question" });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
