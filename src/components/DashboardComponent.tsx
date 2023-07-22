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
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

export const DashboardComponent = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const state = useSelector((state: ApplicationState) => state);

  const user = state.authentication.user;
  const page = state.dashboard.page;

  const handleTabChange = (page: DashboardPage) => {
    dispatch(changePage(page));
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <Grid container alignItems="center">
        <TabPanelContent value={page} index={0} component={<HomeComponent />} />
        <TabPanelContent
          value={page}
          index={1}
          component={<LeaderboardComponent />}
        />
        <TabPanelContent value={page} index={2} component={<NewComponent />} />
      </Grid>
    </div>
  );
};
