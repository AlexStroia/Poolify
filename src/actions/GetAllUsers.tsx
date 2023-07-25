import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { User } from "../model/User";
import { QuestionData } from "../model/QuestionData";

// Action creator to fetch user's question data
export const getAllUsers = createAsyncThunk(
  "question/get-users",
  async (_, { rejectWithValue }) => {
    try {
      const firestore = firebase.firestore();
      const userDocRef = firestore.collection("users");
      const userSnapshot = await userDocRef.get();

      const userPromises = userSnapshot.docs.map(async (snapshot) => {
        const userData = snapshot.data();
        const email = userData.email;

        const questionsAnsweredSnapshot = await snapshot.ref
          .collection("questions")
          .get();
        const questionsAnsweredData: QuestionData[] = [];
        questionsAnsweredSnapshot.forEach((questionSnapshot) => {
          const questionData = questionSnapshot.data() as QuestionData;
          questionsAnsweredData.push(questionData);
        });

        const questionsPutSnapshot = await snapshot.ref
          .collection("questionsCreated")
          .get();
        const questionsPutData: QuestionData[] = [];
        questionsPutSnapshot.forEach((questionSnapshot) => {
          const questionData = questionSnapshot.data() as QuestionData;
          questionsPutData.push(questionData);
        });

        const user: User = {
          email: email,
          questionsAnswered: questionsAnsweredData,
          questionsPut: questionsPutData,
        };

        return user;
      });

      const users = await Promise.all(userPromises);

      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
