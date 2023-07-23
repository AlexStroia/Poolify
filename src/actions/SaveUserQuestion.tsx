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
    {
      userId,
      saveUserQuestionData,
    }: { userId?: string | null; saveUserQuestionData: SaveUserQuestionData },

    { rejectWithValue },
  ) => {
    try {
      const database = firebase.firestore();
      const users = database.collection("questions");
      users.add(saveUserQuestionData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
