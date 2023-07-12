import { Grid, Typography } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { TransparentButton } from "../views/TransparentButton";
import { theme } from "../theme";
import { useRef } from "react";

export const SignupComponent = ({
  onTapSignin = () => {},
  onTapForgotPassword = () => {},
}) => {
  const email = useRef(null);
  const password = useRef(null);
  return (
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
      <PoolifyButton
        title="Signup"
        onTap={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
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
