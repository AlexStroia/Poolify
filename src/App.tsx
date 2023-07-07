import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { LoginComponent } from "./components/LoginComponent";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignupComponent } from "./components/SignupComponent";
import { ForgotPasswordComponent } from "./components/ForgotPasswordComponent";

function App() {
  const navigator = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginComponent onSignupTap={() => navigator("/signup")} />}
      />
      <Route
        path="/signup"
        element={<SignupComponent onSigninTap={() => navigator("/")} />}
      />
        <Route
        path="/forgot-password"
        element={<ForgotPasswordComponent onForgotPasswordTap={() => {}} />}
      />
    </Routes>
  );
}

export default App;
