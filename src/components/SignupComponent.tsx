import { Avatar, Grid, Input, Tooltip, Typography } from "@mui/material";
import {
  PoolifyTextField,
  PoolifyTextFieldInputType,
} from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { TransparentButton } from "../views/TransparentButton";
import { theme } from "../theme";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import ErrorComponent from "./ErrorComponent";
import { SpinnerComponent } from "./SpinnerComponent";

export const SignupComponent = ({
  onTapSignin = () => {},
  onTapForgotPassword = () => {},
  onTapSignUp = (
    email?: string,
    password?: string,
    displayName?: string,
    avatar?: File,
  ) => {},
}) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const displayName = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatar, setAvatar] = useState<string | null>(null);

  const { errorMessage: error, loading } = useSelector(
    (state: ApplicationState) => state.authentication,
  );

  const handleSignup = () => {
    if (avatarFile !== null && avatarFile !== undefined) {
      const emailValue = email.current?.value ?? "";
      const passwordValue = password.current?.value ?? "";
      const displayNameValue = displayName.current?.value ?? "";
      onTapSignUp(emailValue, passwordValue, displayNameValue, avatarFile);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files && event.target.files[0];
    if (file) {
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
      };
      setAvatarFile(file);
      reader.readAsDataURL(file);
    }
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
      style={{
        height: "100vh",
        gap: "16px",
      }}
    >
      <ErrorComponent message={error} />
      <Tooltip title="Click to upload a profile picture" arrow>
        <Avatar
          src={avatar as string}
          style={{
            height: "150px",
            width: "150px",
            cursor: "pointer",
          }}
          onClick={handleAvatarClick}
        />
      </Tooltip>
      <Input type="file" onChange={handleImageUpload} ref={fileInputRef} />
      <Typography variant="body1">*Profile picture is mandatory</Typography>
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
      <PoolifyTextField
        label="Display Name"
        placeholder="John Doe"
        inputRef={displayName}
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

export default SignupComponent;
