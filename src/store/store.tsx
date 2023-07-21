import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/AuthenticationSlice";
import { dashboardReducer } from "../reducers/DashboardSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    dashboard: dashboardReducer
  },
});
