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
      const exists = await question.get();
      console.log("updating");
      if (exists) {
        console.log("exists");
        if (voteOptionFirst !== null) {
          await question.update({
            voteOptionFirst: firebase.firestore.FieldValue.increment(1) ?? 0,
          });
        } else if (voteOptionSecond !== null) {
          await question.update({
            voteOptionSecond: firebase.firestore.FieldValue.increment(1) ?? 0,
          });
        }
        question.update({});
      } else {
        return rejectWithValue({ message: "Could not update question" });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
