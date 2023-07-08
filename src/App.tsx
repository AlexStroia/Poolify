import "./App.css";
import { LoginComponent } from "./components/LoginComponent";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignupComponent } from "./components/SignupComponent";
import { ForgotPasswordComponent } from "./components/ForgotPasswordComponent";
import { PoolifyAppBar } from "./views/PoolifyAppBar";

function App() {
  const navigator = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const { pathname } = location;
    switch (pathname) {
      case "/":
        return "Login";
      case "/forgot-password":
        return "Forgot Password";
      case "/signup":
        return "Signup";
      default:
        return "";
    }
  };

  return (
    <div>
      <PoolifyAppBar title={getPageTitle()} />
      <Routes>
        <Route
          path="/"
          element={
            <LoginComponent
              onTapSignup={() => navigator("/signup")}
              onTapForgotPassword={() => navigator("/forgot-password")}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupComponent
              onTapSignin={() => navigator("/")}
              onTapForgotPassword={() => navigator("/forgot-password")}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordComponent onForgotPasswordTap={() => {}} />}
        />
      </Routes>
    </div>
  );
}

export default App;
