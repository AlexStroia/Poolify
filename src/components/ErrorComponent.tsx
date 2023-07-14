import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const ErrorComponent = (message: string) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400",
        margin: "0 auto",
        marginTop: "4",
      }}
    >
      <Alert severity="error" variant="outlined">
        <AlertTitle
          style={{
            fontWeight: "bold",
            marginBottom: "1",
          }}
        >
          Error
        </AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default ErrorComponent;
