import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { UserQuestionAnswer } from "../model/UserQuestionAnswer";

// Action creator to fetch user's question data
export const getUserQuestions = createAsyncThunk(
  "question/get-user-questions",
  async (userId: string, { rejectWithValue }) => {
    try {
      const firestore = firebase.firestore();
      const userDocRef = firestore.collection("users").doc(userId);
      const questionsSnapshot = await userDocRef.collection("questions").get();
      return questionsSnapshot.docs.map((doc) => doc.data().questionData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
