import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const forgotPasswordAction = createAsyncThunk(
  "auth/forgot-password",
  async (email: string, { rejectWithValue }) => {
    try {
      const credential = await firebase.auth().sendPasswordResetEmail(email);
      return credential;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
