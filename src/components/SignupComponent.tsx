import { Grid, Typography } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { TransparentButton } from "../views/TransparentButton";
import { theme } from "../theme";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import ErrorComponent from "./ErrorComponent";
import { SpinnerComponent } from "./SpinnerComponent";

export const SignupComponent = ({
  onTapSignin = () => {},
  onTapForgotPassword = () => {},
  onTapSignUp = (email?: string, password?: string) => {},
  onTapDismiss = () => {},
}) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const errorState = useSelector(
    (state: ApplicationState) => state.authentication.error,
  );
  const loadingState = useSelector(
    (state: ApplicationState) => state.authentication.loading,
  );

  useEffect(() => {
    if (errorState.length > 0) {
      setErrorMessage(errorState);
    }
    console.log(loadingState);
    setLoading(loadingState);
  });

  const handleSignup = () => {
    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
    onTapSignUp(emailValue, passwordValue);
    setErrorMessage("");
  };

  return loading ? (
    <SpinnerComponent />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <ErrorComponent message={errorMessage} onTapDismiss={onTapDismiss} />
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
      <PoolifyButton title="Signup" onTap={handleSignup} />
      <Typography>
        Do not have an account?{" "}
        <TransparentButton title={"Sign In"} onTap={onTapSignin} />
      </Typography>
      <Typography
        onClick={onTapForgotPassword}
        sx={{
          color: theme.palette.primary.main,
        }}
      >
        Forgot Password
      </Typography>
    </Grid>
  );
};
