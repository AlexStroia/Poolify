import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const getAvatarUrlAction = createAsyncThunk(
  "questions/getAvatar",
  async (userId: string, { rejectWithValue }) => {
    try {
      const firebaseStorage = firebase.storage().ref();
      const storageRef = firebaseStorage.child(`images/${userId}`);
      if (storageRef != null) {
        const downloadURL: string = await storageRef.getDownloadURL();
        return downloadURL;
      } else {
        return;
      }
    } catch (error) {
      return rejectWithValue({
        message:
          "Seems like there is a problem with loading the image. Try again later",
      });
    }
  },
);
