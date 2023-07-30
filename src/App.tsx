import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LoginComponent } from "./components/LoginComponent";
import { SignupComponent } from "./components/SignupComponent";
import { ForgotPasswordComponent } from "./components/ForgotPasswordComponent";
import { PoolifyAppBar } from "./views/PoolifyAppBar";
import { signupAction } from "./actions/SignupAction";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./actions/LoginAction";
import { forgotPasswordAction } from "./actions/ForgotPasswordAction";
import { reset } from "./reducers/AuthenticationSlice";
import { useEffect } from "react";
import { ApplicationState } from "./state/ApplicationState";
import {
  SaveUserData,
  saveUserProfileAction,
} from "./actions/SaveUserProfileAction";
import NewComponent from "./components/NewComponent";
import { LeaderboardComponent } from "./components/LeaderboardComponent";
import { NotFoundComponent } from "./components/NotFoundComponent";
import { QuestionComponent } from "./components/QuestionComponent";
import { ProtectedRouteComponent } from "./components/ProtectedRouteComponent";
import React from "react";
import HomeComponent from "./components/HomeComponent";

function App() {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: ApplicationState) => {
    return state;
  });
  const user = state.authentication.user;
  const authenticated = (user && user.email !== null) ?? false;
  const loggedOut = state.authentication.loggedOut ?? false;
  useEffect(() => {
    function navigateToHomeIfLoggedIn() {
      if (user && user.email !== null) {
        const userData: SaveUserData = {
          email: user?.email ?? "",
          userId: user?.userId ?? "",
          displayName: user?.displayName ?? "",
          avatar: user?.avatarUrl ?? "",
        };
        dispatch(saveUserProfileAction(userData));
        navigator("/home");
      }
    }
    function navigateToMainPageIfLoggedOut() {
      if (loggedOut) {
        navigator("/");
      }
    }

    navigateToHomeIfLoggedIn();
    navigateToMainPageIfLoggedOut();
  }, [loggedOut, user]);

  const getPageTitle = () => {
    const { pathname } = location;
    if (pathname.includes("/questions")) {
      return "Would you rather?";
    }
    switch (pathname) {
      case "/":
        return "Login";
      case "/forgot-password":
        return "Forgot Password";
      case "/signup":
        return "Signup";
      case "/dashboard":
        return "Dashboard";
      case "/leaderboard":
        return "Leaderboard";
      case "/add":
        return "Add";
      case "/home":
        return "Home";
      default:
        return "";
    }
  };

  const handleSignUp = (
    email?: string,
    password?: string,
    displayName?: string,
    avatar?: File,
  ) => {
    if (
      email !== undefined &&
      password !== undefined &&
      displayName !== undefined &&
      avatar !== undefined
    ) {
      dispatch(
        signupAction({
          email: email!,
          password: password!,
          displayName: displayName!,
          avatarFile: avatar,
        }),
      );
    }
  };

  const handleSignIn = (email?: string, password?: string) => {
    if (email && password) {
      dispatch(
        loginAction({
          email: email!,
          password: password!,
        }),
      );
    }
  };

  const handleOnClose = () => {
    dispatch(reset());
  };

  const handleForgotPassword = (email?: string) => {
    if (email != null) {
      dispatch(forgotPasswordAction(email));
    }
  };

  return (
    <div>
      <PoolifyAppBar
        title={getPageTitle()}
        hidden={
          getPageTitle().toLowerCase() === "dashboard" ||
          getPageTitle().toLowerCase() === "leaderboard" ||
          getPageTitle().toLowerCase() === "add" ||
          getPageTitle().toLowerCase() === "home"
        }
      />

      <Routes>
        <Route path="/error" element={<NotFoundComponent />} />
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
          element={
            <ForgotPasswordComponent
              onTapForgotPassword={handleForgotPassword}
              onClose={handleOnClose}
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRouteComponent isLoggedIn={authenticated}>
              <HomeComponent />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRouteComponent isLoggedIn={authenticated}>
              <NewComponent />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRouteComponent isLoggedIn={authenticated}>
              <LeaderboardComponent />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <ProtectedRouteComponent isLoggedIn={authenticated}>
              <QuestionComponent />
            </ProtectedRouteComponent>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
