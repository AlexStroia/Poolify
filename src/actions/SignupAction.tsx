import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationData } from "../model/AuthenticationData";
import firebase from "firebase";
import "firebase/auth";

export const signupAction = createAsyncThunk(
  "auth/signup",
  async (authenticationData: AuthenticationData, { rejectWithValue }) => {
    try {
      const { email, password, displayName, avatarFile } = authenticationData;
      const firebaseAuth = firebase.auth();
      const firebaseStorage = firebase.storage().ref();
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      if (avatarFile !== null) {
        const blob = new Blob([avatarFile!], { type: avatarFile!.type });
        const storageRef = firebaseStorage.child(`images/${user?.uid}`);
        await storageRef.put(blob);

        const downloadURL = await storageRef.getDownloadURL();

        await user?.updateProfile({
          displayName: displayName,
          photoURL: downloadURL,
        });
      } else {
        await user?.updateProfile({
          displayName: displayName,
        });
      }
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
