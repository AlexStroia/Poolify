import { Grid } from "@mui/material";
import { PoolifyTextField } from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { PoolifyAppBar } from "../views/PoolifyAppBar";
import { SpinnerComponent } from "./SpinnerComponent";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import PoolifySnackbar from "../views/PoolifySnackBar";

const emailSuccessMessage =
  "If that email exist in our database, you should receive an email shortly.";

export const ForgotPasswordComponent = ({
  onTapForgotPassword = (email: string) => {},
  onClose = () => {},
}) => {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const email = useRef<HTMLInputElement>(null);

  const { errorMessage: error, loading } = useSelector(
    (state: ApplicationState) => state.authentication,
  );

  const handleTapForgotPassword = () => {
    const emailValue = email.current?.value ?? "";
    onTapForgotPassword(emailValue);
    handleOpenSnackbar();
  };

  const handleOpenSnackbar = () => {
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    onClose();
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
        open={showSnackbar}
        severity={error ? "error" : "success"}
        message={error ?? emailSuccessMessage}
        onClose={handleCloseSnackbar}
      />
      <PoolifyTextField
        inputRef={email}
        label="Email"
        placeholder="johndoe@gmail.com"
      />
      <PoolifyButton title="Send Password" onTap={handleTapForgotPassword} />
    </Grid>
  );
};
