import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

export const NotFoundComponent = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ marginBottom: 2 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Oops! Page not found.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Go back to Home
      </Button>
    </Container>
  );
};
