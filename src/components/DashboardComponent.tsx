import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { theme } from "../theme";
import { useState } from "react";
import { TabPanelContent } from "../views/TabPanelContent";
import { HomeComponent } from "./HomeComponent";
import { LeaderboardComponent } from "./LeaderboardComponent";
import { NewComponent } from "./NewComponent";
import { PoolifyButton } from "../views/PoolifyButton";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import { logoutAction } from "../actions/LogoutAction";

export const DashboardComponent = () => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(
    (state: ApplicationState) => state.authentication.user,
  );
  console.log(user);
  const handleTabChange = () => {};
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item sx={{ flex: 1 }}>
          <Box sx={{ borderColor: theme.palette.primary.main }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
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

      <TabPanelContent
        value={tabValue}
        index={0}
        component={<HomeComponent />}
      />
      <TabPanelContent
        value={tabValue}
        index={1}
        component={<LeaderboardComponent />}
      />
      <TabPanelContent
        value={tabValue}
        index={2}
        component={<NewComponent />}
      />
    </div>
  );
};
