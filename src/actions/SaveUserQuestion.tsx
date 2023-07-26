import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export interface SaveUserQuestionData {
  questionOptionFirst: string;
  questionOptionSecond: string;
  date: string;
  userId: string;
  email: string;
}

export const saveUserQuestion = createAsyncThunk(
  "dashboard/new",
  async (
    { saveUserQuestionData }: { saveUserQuestionData: SaveUserQuestionData },

    { rejectWithValue },
  ) => {
    try {
      if (
        saveUserQuestionData.questionOptionFirst !==
        saveUserQuestionData.questionOptionSecond
      ) {
        const database = firebase.firestore();
        const questionsDatabase = database.collection("questions");
        const usersDatabase = database.collection("users");
        const user = usersDatabase.doc(saveUserQuestionData.userId);
        user.collection("questionsCreated").add(saveUserQuestionData);
        questionsDatabase.add(saveUserQuestionData);
        return questionsDatabase;
      }
      return rejectWithValue({ message: "Answers should be different" });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
