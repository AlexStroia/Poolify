import { Grid, Typography } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { TransparentButton } from "../views/TransparentButton";
import { theme } from "../theme";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import { SpinnerComponent } from "./SpinnerComponent";
import ErrorComponent from "./ErrorComponent";
import ImpersonateComponent from "./ImpersonateComponent";
import React from "react";

export const LoginComponent = ({
  onTapSignup = () => {},
  onTapForgotPassword = () => {},
  onTapSignIn = (email: string, password: string) => {},
}) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const { errorMessage: error, loading } = useSelector(
    (state: ApplicationState) => state.authentication,
  );

  const handleSignIn = () => {
    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
    onTapSignIn(emailValue, passwordValue);
  };

  const handleSignInUdacityAccount = () => {
    const emailValue = "udacity@gmail.com";
    const passwordValue = "123456";
    onTapSignIn(emailValue, passwordValue);
  };

  const handleSignInAlexAccount = () => {
    const emailValue = "alextest@yahoo.com";
    const passwordValue = "123456";
    onTapSignIn(emailValue, passwordValue);
  };

  return loading ? (
    <SpinnerComponent />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center" // Center align horizontally
      padding="16px"
      style={{
        height: "100vh",
        width: "100%",
        gap: "16px",
      }}
    >
      <ErrorComponent message={error} />
      <PoolifyTextField
        label="Email"
        placeholder="johndoe@gmail.com"
        inputRef={email}
      />
      <PoolifyTextField
        label="Password"
        placeholder="123456"
        inputType={PoolifyTextFieldInputType.Password}
        inputRef={password}
      />
      <PoolifyButton title="Login" onTap={handleSignIn} />
      <Typography>
        Do not have an account?{" "}
        <TransparentButton title={"Sign Up"} onTap={onTapSignup} />
      </Typography>

      <Typography
        onClick={onTapForgotPassword}
        sx={{
          color: theme.palette.primary.main,
        }}
      >
        Forgot Password
      </Typography>

      <ImpersonateComponent
        onTapUdacityAccount={handleSignInUdacityAccount}
        onTapAlexAccount={handleSignInAlexAccount}
      />
    </Grid>
  );
};
