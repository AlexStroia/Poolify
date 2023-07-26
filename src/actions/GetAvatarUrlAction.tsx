import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const getAvatarUrlAction = createAsyncThunk(
  "questions/getAvatar",
  async (userId: string, { rejectWithValue }) => {
    try {
      const firebaseStorage = firebase.storage().ref();
      const storageRef = firebaseStorage.child(`images/${userId}`);
      const downloadURL: string = await storageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
