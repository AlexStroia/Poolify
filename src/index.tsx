import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";
import { firebaseConfig } from "./firebase";
import { Provider } from "react-redux";
import { store } from "./store/store";
// eslint-disable-next-line
import "firebase/auth";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
