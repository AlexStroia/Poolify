import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { PoolifyButton } from "./PoolifyButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApplicationState } from "../state/ApplicationState";
import { logoutAction } from "../actions/LogoutAction";
import { theme } from "../theme";
import { Link, useLocation } from "react-router-dom";
import { changePage } from "../reducers/DashboardSlice";
import { DashboardPage } from "../state/DashboardState";

export const PoolifyTabBar = () => {
  const dispatch = useDispatch();
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
    <Grid container alignItems="center">
      <Grid item sx={{ flex: 1 }}>
        <Box sx={{ borderColor: theme.palette.primary.main }}>
          <Tabs
            value={page}
            onChange={(_, newPage) => {
              handleTabChange(newPage);
            }}
          >
            <Tab label="Home" component={Link} to="/home" />
            <Tab label="Leaderboard" component={Link} to="/leaderboard" />
            <Tab label="New" component={Link} to="/add" />
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
  );
};
