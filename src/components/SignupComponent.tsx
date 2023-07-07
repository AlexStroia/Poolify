import { Grid, Typography } from "@mui/material";
import { PoolifyTextField, PoolifyTextFieldInputType } from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { theme } from "../theme";
import { TransparentButton } from "../views/TransparentButton";
import { PoolifyAppBar } from "../views/PoolifyAppBar";

export const SignupComponent = ({ onSigninTap = () => {}}) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{ height: "100vh" }}
    >
            <PoolifyAppBar title="Signup"/>
      <PoolifyTextField label="Email" placeholder="johndoe@gmail.com" />
      <PoolifyTextField
        label="Password"
        placeholder="123456"
        inputType={PoolifyTextFieldInputType.Password}
      />
      <PoolifyButton
        title="Signup"
        
        onTap={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
      <Typography>
        Do not have an account? <TransparentButton
        title={'Sign In'.toLowerCase()}
        onTap={onSigninTap} />
      </Typography>
    </Grid>
  );
};
