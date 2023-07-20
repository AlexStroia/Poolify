import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const forgotPasswordAction = createAsyncThunk(
  "auth/forgot-password",
  async (email: string, { rejectWithValue }) => {
    try {
      const credential = await firebase.auth().sendPasswordResetEmail(email);
      console.log(credential);
      return credential;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
