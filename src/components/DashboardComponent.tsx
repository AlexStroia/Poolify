import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { theme } from "../theme";
import { TabPanelContent } from "../views/TabPanelContent";
import { HomeComponent } from "./HomeComponent";
import { LeaderboardComponent } from "./LeaderboardComponent";
import { NewComponent } from "./NewComponent";
import { PoolifyButton } from "../views/PoolifyButton";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import { logoutAction } from "../actions/LogoutAction";
import { changePage } from "../reducers/DashboardSlice";
import { DashboardPage } from "../state/DashboardState";

export const DashboardComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: ApplicationState) => state);

  const user = state.authentication.user;
  const page = state.dashboard.page;
  console.log(user);

  const handleTabChange = (page: DashboardPage) => {
    dispatch(changePage(page));
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item sx={{ flex: 1 }}>
          <Box sx={{ borderColor: theme.palette.primary.main }}>
            <Tabs
              value={page}
              onChange={(_, newPage) => {
                handleTabChange(newPage);
              }}
            >
              <Tab label="Home" />
              <Tab label="Leaderboard" />
              <Tab label="New" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            {user?.email}
          </Typography>
        </Grid>
        <Grid item>
          <PoolifyButton title="Logout" onTap={handleLogout} />
        </Grid>
      </Grid>
      <TabPanelContent value={page} index={0} component={<HomeComponent />} />
      <TabPanelContent
        value={page}
        index={1}
        component={<LeaderboardComponent />}
      />
      <TabPanelContent value={page} index={2} component={<NewComponent />} />
    </div>
  );
};
