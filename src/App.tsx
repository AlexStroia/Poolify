import "./App.css";
import { LoginComponent } from "./components/LoginComponent";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignupComponent } from "./components/SignupComponent";
import { ForgotPasswordComponent } from "./components/ForgotPasswordComponent";
import { PoolifyAppBar } from "./views/PoolifyAppBar";
import { signupAction } from "./actions/SignupAction";
import { useDispatch } from "react-redux";
import { AuthenticationData } from "./model/AuthenticationData";
import { loginAction } from "./actions/LoginAction";

function App() {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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

  const handleSignUp = (email?: string, password?: string) => {
    if (email != null && password != null) {
      dispatch(
        signupAction({
          email: email,
          password: password,
        }),
      );
    }
  };

  const handleSignIn = (email?: string, password?: string) => {
    if (email != null && password != null) {
      dispatch(
        loginAction({
          email: email,
          password: password,
        }),
      );
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
              onTapSignIn={handleSignIn}
              onTapForgotPassword={() => navigator("/forgot-password")}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupComponent
              onTapSignin={() => navigator("/")}
              onTapSignUp={handleSignUp}
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
