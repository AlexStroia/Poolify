import { Grid } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { PoolifyAppBar } from "../views/PoolifyAppBar";
import { SpinnerComponent } from "./SpinnerComponent";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
export const ForgotPasswordComponent = ({ onForgotPasswordTap = () => {} }) => {
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

  const handleTapForgotPassword = (email: String) => {
    
  }
 
  return ( loading ? (
    <SpinnerComponent />
  ) :
    <Grid
      container
      direction="column"
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <PoolifyAppBar title="Forgot Password" />
      <PoolifyTextField label="Email" placeholder="johndoe@gmail.com" />
      <PoolifyTextField
        label="Password"
        placeholder="123456"
        inputType={PoolifyTextFieldInputType.Password}
      />
      <PoolifyButton title="Send Password" onTap={() => onForgotPasswordTap} />
    </Grid>
  );
};
