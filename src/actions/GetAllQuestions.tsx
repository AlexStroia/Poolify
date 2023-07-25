import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { QuestionData } from "../model/QuestionData";

export const getAllQuestions = createAsyncThunk(
  "questions/get",
  async (_, { rejectWithValue }) => {
    try {
      const database = firebase.firestore();
      const questionsRef = database.collection("questions");
      const snapshot = await questionsRef.get();
      const docs = snapshot.docs;
      return docs.map((element) => {
        const id = element.id;
        const data = element.data();
        const questionData: QuestionData = {
          id: id,
          date: data["date"] ?? "",
          questionOptionFirst: data["questionOptionFirst"] ?? "",
          questionOptionSecond: data["questionOptionSecond"] ?? "",
          email: data["email"],
          userId: data["userId"] ?? "",
        };
        return questionData;
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
