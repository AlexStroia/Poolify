import { AuthenticationState } from "./AuthenticationState";
import { DashboardPage, DashboardState } from "./DashboardState";
export interface ApplicationState {
  authentication: AuthenticationState;
  dashboard: DashboardState;
}

export const authenticationState: AuthenticationState = {
  user: {
    email: null,
    displayName: null,
  },
  loading: false,
  errorMessage: "",
};

export const dashboardPageInitialState: DashboardState = {
  page: DashboardPage.HOME,
  loading: false,
  errorMessage: null,
  questions: []
};

export const appState: ApplicationState = {
  authentication: {
    user: {
      email: null,
      displayName: null,
    },
    loading: false,
    errorMessage: "",
  },
  dashboard: {
    page: DashboardPage.HOME,
    loading: false,
    errorMessage: null,
    questions: []
  },
};
