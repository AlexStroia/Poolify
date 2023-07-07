import { Grid, Typography, makeStyles } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";

export const ForgotPasswordComponent = ({ onForgotPasswordTap = () => {} }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      display="flex"
      alignItems="center"

      style={{ height: "100vh" }}
    >
      <PoolifyTextField label="Email" placeholder="johndoe@gmail.com" />
      <PoolifyTextField
        label="Password"
        placeholder="123456"
        inputType={PoolifyTextFieldInputType.Password}
      />
      <PoolifyButton
        title="Send Password"
        onTap={() => onForgotPasswordTap}
      />
    </Grid>
  );
};
