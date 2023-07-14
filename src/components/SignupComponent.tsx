import { Grid, Typography } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { TransparentButton } from "../views/TransparentButton";
import { theme } from "../theme";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import ErrorComponent from "./ErrorComponent";

export const SignupComponent = ({
  onTapSignin = () => {},
  onTapForgotPassword = () => {},
  onTapSignUp = (email?: string, password?: string) => {},
}) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useSelector((state: ApplicationState) => {
    const stateError = state.authentication;

    console.log("Error is " + stateError.error);
  });

  const handleSignup = () => {
    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
    onTapSignUp(emailValue, passwordValue);
  };

  return errorMessage.length > 0 ? (
    ErrorComponent(errorMessage)
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{ height: "100vh" }}
    >
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
