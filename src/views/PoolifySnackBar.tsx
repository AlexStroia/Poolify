import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface PoolifySnackbarProps {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
  onClose: () => void;
}

const PoolifySnackbar: React.FC<PoolifySnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <div
      style={{
        width: "100%", // Set the width of the wrapping div to 100
        display: "flex",
        justifyContent: "center", // Center the snackbar horizontally
      }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <MuiAlert
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClose={onClose}
          severity={severity}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PoolifySnackbar;
