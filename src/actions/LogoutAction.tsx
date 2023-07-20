import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const logoutAction = createAsyncThunk(
  "authentication/logout",
  async (_, { rejectWithValue }) => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
