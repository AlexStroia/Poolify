import React from "react";
import { TextField } from "@mui/material";

export enum PoolifyTextFieldInputType {
  Password = "password",
  Text = "text",
}

interface PoolifyTextFieldProps {
  label: string;
  placeholder: string;
  inputType?: PoolifyTextFieldInputType;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const PoolifyTextField: React.FC<PoolifyTextFieldProps> = ({
  label,
  placeholder,
  inputType = PoolifyTextFieldInputType.Text,
  inputRef,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      label={label}
      type={inputType}
      inputRef={inputRef}
      sx={{
        width:"50%",
        marginTop: "2px",
        marginBottom: "2px",
        justifyContent: "center",
      }}
    />
  );
};
