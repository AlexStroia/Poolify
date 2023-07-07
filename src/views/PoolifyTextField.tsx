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
}

export const PoolifyTextField: React.FC<PoolifyTextFieldProps> = ({
  label,
  placeholder,
  inputType = PoolifyTextFieldInputType.Text,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      label={label}
      type={inputType}
      sx={{
        width: '50%',
        marginTop:'2px',
        marginBottom: "2px",
        marginLeft: "30px",
        marginRight: "30px",
      }}
    />
  );
};
