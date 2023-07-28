import { CircularProgress, Box } from "@mui/material";
import { theme } from "../theme";
import React from "react";

export const SpinnerComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      data-testid="spinner"
    >
      <CircularProgress
        sx={{
          color: theme.palette.primary.main,
        }}
      />
    </Box>
  );
};
