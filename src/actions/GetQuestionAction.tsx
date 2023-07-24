import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { QuestionData } from "../model/QuestionData";

export const getQuestionAction = createAsyncThunk(
  "getQuestion",
  async (id: string, { rejectWithValue }) => {
    try {
      const database = firebase.firestore();
      const questionsRef = database.collection("questions");
      const docRef = questionsRef.doc(id);
      const question = await docRef.get();
      console.log(question);
      if (question.exists && question.data()) {
        const data = question.data();
        const questionData: QuestionData = {
          id: id,
          date: data?.date ?? "",
          questionOptionFirst: data?.questionOptionFirst ?? "",
          questionOptionSecond: data?.questionOptionSecond ?? "",
          email: data?.email || "",
          voteOptionFirst: data?.voteOptionFirst ?? "0",
          voteOptionSecond: data?.voteOptionSecond ?? "0",
          // Provide a default value if 'email' is not available in the data object
        };
        console.log("Final is " + questionData);
        return questionData;
      } else {
        return rejectWithValue({ message: "Question does not exist" });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
