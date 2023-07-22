import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export interface SaveUserQuestionData {
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

      // Check if the "questions" collection exists
      const collectionSnapshot = await database
        .collectionGroup("questions")
        .limit(1)
        .get();
      if (userId !== null) {
        if (collectionSnapshot.empty) {
          await users.doc(userId).set({
            [new Date().toISOString()]: saveUserQuestionData,
          });
        } else {
          // The "questions" collection exists, proceed with the update
          await users.doc(userId).update({
            [new Date().toISOString()]: saveUserQuestionData,
          });
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
