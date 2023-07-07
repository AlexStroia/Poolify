import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { LoginComponent } from "./components/LoginComponent";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignupComponent } from "./components/SignupComponent";

function App() {
  const navigator = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/signup" element={<SignupComponent />} />
    </Routes>
  );
}

export default App;
