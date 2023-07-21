import React from "react";
import { Grid, Typography, Box, TextField } from "@mui/material";
import { PoolifyTextField } from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";

export const NewComponent = () => {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignContent="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>
        Enter your question
      </Typography>
      <PoolifyTextField label="Question" placeholder="How much is 2+2?" />
      <Typography variant="h4" gutterBottom>
        Answers
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid>
          {" "}
          {/* Use numeric value (e.g., 2) for spacing */}
          <PoolifyTextField label="First" placeholder="3" />
        </Grid>
        <Box width="2px"></Box>
        <Grid>
          <PoolifyTextField label="Second" placeholder="3" />
        </Grid>
      </Grid>
      <PoolifyButton
        title="Save"
        onTap={() => {
          throw new Error("Function not implemented.");
        }}
      />
    </Grid>
  );
};

export default NewComponent;
