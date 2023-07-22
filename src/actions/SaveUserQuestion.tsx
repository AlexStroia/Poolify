import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export interface SaveUserQuestionData {
  questionTitle: string;
  questionOptionFirst: string;
  questionOptionSecond: string;
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
      if (userId !== null) {
        await users.doc(userId).update({
          [new Date().toISOString()]: saveUserQuestionData,
        });
      } else {
        return rejectWithValue({
          message: "Could not save the question.",
        });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
