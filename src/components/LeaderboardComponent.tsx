import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import { getAllUsers } from "../actions/GetAllUsers";
import { ApplicationState } from "../state/ApplicationState";
import { SpinnerComponent } from "./SpinnerComponent";

export const LeaderboardComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const state = useSelector((state: ApplicationState) => state.dashboard);
  const users = state.users ?? [];
  const sortedUsers = users
    .slice()
    .sort(
      (first, second) =>
        second.questionsAnswered!.length - first.questionsAnswered!.length,
    );

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
        {state.loading ? (
          <SpinnerComponent />
        ) : (
          sortedUsers &&
          sortedUsers.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={3}>
                <Typography textAlign="center" variant="body1">
                  {item.email}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                {/* Display the user's avatar */}
                <img
                  src={"TODO"}
                  alt="Avatar"
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography textAlign="center" variant="body1">
                  {item.questionsPut?.length}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography textAlign="center" variant="body1">
                  {item.questionsAnswered?.length}
                </Typography>
              </Grid>
            </React.Fragment>
          ))
        )}
      </Grid>
    </Grid>
  );
};
