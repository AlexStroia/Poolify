import { Grid, Typography } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import React from "react";

export const LeaderboardComponent = () => {
  const data = [
    {
      name: "John Doe",
      avatar: "https://example.com/avatar/john.png",
      questionsAsked: 10,
      questionsAnswered: 25,
    },
    {
      name: "Jane Smith",
      avatar: "https://example.com/avatar/jane.png",
      questionsAsked: 5,
      questionsAnswered: 15,
    },
    // Add more data objects for additional rows
  ];

  return (
    <Grid>
      <Grid item marginBottom={"16px"}>
        <PoolifyTabBar />
      </Grid>
      <Grid item marginLeft="16px" marginRight="16px" container spacing={2}>
        <Grid container>
          <Grid item xs={3}>
            <Typography textAlign="center" variant="subtitle1">
              <strong>Name</strong>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography textAlign="center" variant="subtitle1">
              <strong>Avatar</strong>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography textAlign="center" variant="subtitle1">
              <strong>Asked</strong>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography textAlign="center" variant="subtitle1">
              <strong>Answered</strong>
            </Typography>
          </Grid>
        </Grid>

        {/* Data Rows */}
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <Grid item xs={3}>
              <Typography textAlign="center" variant="body1">
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
            {/* Center the image */}
            <img src={item.avatar} alt={item.name} style={{ width: "36px", height: "36px", display: "block", margin: "0 auto" }} />
          </Grid>
            <Grid item xs={3}>
              <Typography textAlign="center" variant="body1">
                {item.questionsAsked}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign="center" variant="body1">
                {item.questionsAnswered}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};
