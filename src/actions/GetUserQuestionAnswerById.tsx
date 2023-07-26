import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { QuestionData } from "../model/QuestionData";

export const getUserQuestionAnswerById = createAsyncThunk(
  "question/get-user-questions",
  async (
    { userId, questionId }: { userId: string; questionId: string },
    { rejectWithValue },
  ) => {
    try {
      const firestore = firebase.firestore();
      const userDocRef = firestore.collection("users").doc(userId);
      const questionsSnapshot = await userDocRef.collection("questions").get();
      const questionFound = questionsSnapshot.docs.find((doc) => {
        const questionData = doc.data().questionData;
        return questionData.id === questionId;
      });

      if (questionFound) {
        const question = questionFound.data();
        const userFirstOptionVote = question.questionOptionFirst ?? null;
        const userSecondOptionVote = question.questionOptionSecond ?? null;
        if (userFirstOptionVote !== null) {
          return userFirstOptionVote;
        }
        return userSecondOptionVote;
      } else {
        return "";
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
