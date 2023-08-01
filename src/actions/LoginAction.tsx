import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationData } from "../model/AuthenticationData";
// eslint-disable-next-line
import "firebase/auth";
import firebase from "firebase";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (loginData: AuthenticationData, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;
      const credential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return credential;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
