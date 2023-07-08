import { Grid, Typography } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { TransparentButton } from "../views/TransparentButton";
import { PoolifyAppBar } from "../views/PoolifyAppBar";
import { theme } from "../theme";

export const LoginComponent = ({
  onTapSignup = () => {},
  onTapForgotPassword = () => {},
}) => {
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
        title="Login"
        onTap={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
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
