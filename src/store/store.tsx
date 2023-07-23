import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/AuthenticationSlice";
import { dashboardReducer } from "../reducers/DashboardSlice";
import { questionReducer } from "../reducers/QuestionSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    dashboard: dashboardReducer,
    question: questionReducer,
  },
});
