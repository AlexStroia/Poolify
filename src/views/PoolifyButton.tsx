import { Button, Typography } from "@mui/material";
import { theme } from "../theme";
import React from "react";

export enum PoolifyButtonSize {
  NORMAL,
  LARGE,
}

interface PoolifyButtonsProps {
  title: String;
  onTap: () => void;
  buttonSize?: PoolifyButtonSize;
}

export const PoolifyButton: React.FC<PoolifyButtonsProps> = ({
  title,
  onTap,
  buttonSize = PoolifyButtonSize.NORMAL,
}) => {
  const appTheme = theme;
  return (
    <Button
      sx={{
        backgroundColor: appTheme.palette.primary.main,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        paddingLeft: "12px",
        paddingRight: "12px",
        width: buttonSize === PoolifyButtonSize.NORMAL ? "50%" : "100%",
      }}
      onClick={onTap}
    >
      <Typography textAlign="center" variant="button" color="inherit">
        {title}
      </Typography>
    </Button>
  );
};
