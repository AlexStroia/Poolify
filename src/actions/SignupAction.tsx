import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationData } from "../model/AuthenticationData";
import firebase from "firebase";
import "firebase/auth";

export const signupAction = createAsyncThunk(
  "auth/signup",
  async (authenticationData: AuthenticationData, { rejectWithValue }) => {
    try {
      const { email, password } = authenticationData;
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
