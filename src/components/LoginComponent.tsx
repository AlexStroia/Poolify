import { Grid, Typography, makeStyles } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";

export const LoginComponent = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
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
        Do not have an account? <span>Sign Up</span>
      </Typography>
    </Grid>
  );
};
