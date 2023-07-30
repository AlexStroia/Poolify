import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { UserQuestionAnswer } from "../model/UserQuestionAnswer";

export const saveUserAnswerAction = createAsyncThunk(
  "question/save-answer",
  async (
    {
      userId,
      userQuestionAnswer,
    }: {
      userId: string;
      userQuestionAnswer: UserQuestionAnswer;
    },
    { rejectWithValue },
  ) => {
    try {
      const firestore = firebase.firestore();
      const userDocRef = firestore.collection("users").doc(userId);

      const date = userQuestionAnswer.questionData.date;

      const doc = await userDocRef.collection("questions").doc(date).get();

      if (!doc.exists) {
        await userDocRef
          .collection("questions")
          .doc(date)
          .set(userQuestionAnswer);
      } else {
        // If the document exists, update it
        await userDocRef
          .collection("questions")
          .doc(date)
          .update(userQuestionAnswer);
      }
      return userQuestionAnswer;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
