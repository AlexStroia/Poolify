import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/AuthenticationSlice";
import { dashboardReducer } from "../reducers/DashboardSlice";
import { reducer as questionReducer } from "../reducers/QuestionSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    dashboard: dashboardReducer,
    question: questionReducer,
  },
  middleware: [thunk], // add the thunk middleware
});
