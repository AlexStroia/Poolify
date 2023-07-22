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
import PoolifySnackbar from "../views/PoolifySnackBar";

export const LoginComponent = ({
  onTapSignup = () => {},
  onTapForgotPassword = () => {},
  onTapSignIn = (email: string, password: string) => {},
  onClose = () => {},
}) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const {
    errorMessage: error,
    loading,
    success,
  } = useSelector((state: ApplicationState) => state.authentication);

  const handleSignIn = () => {
    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
    onTapSignIn(emailValue, passwordValue);
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
      <PoolifySnackbar
        open={success === true}
        message={"Logged in with success"}
        severity={undefined}
        onClose={onClose}
      />
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
    </Grid>
  );
};
