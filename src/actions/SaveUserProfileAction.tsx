import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export interface SaveUserData {
  email: string;
  userId: string;
  displayName: string;
  avatar: string;
}

export const saveUserProfileAction = createAsyncThunk(
  "authentication/save-user",
  async (
    { email, userId, displayName, avatar }: SaveUserData,
    { rejectWithValue },
  ) => {
    try {
      const database = firebase.firestore();
      const users = database.collection("users");
      const doc = await users.doc(userId).get();
      if (!doc.exists) {
        users
          .doc(userId)
          .set({ email: email, displayName: displayName, avatar: avatar });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
