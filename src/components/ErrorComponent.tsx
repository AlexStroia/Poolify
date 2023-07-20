import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  ClickAwayListener,
  Dialog,
  Button,
  Box,
} from "@mui/material";

export const ErrorComponent = ({ message }: { message: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(message.length > 0);
  }, [message]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} closeAfterTransition>
      <Box sx={{ p: 2 }}>
        <Alert severity="error" variant="outlined">
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={handleDismiss}>
            Dismiss
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ErrorComponent;
