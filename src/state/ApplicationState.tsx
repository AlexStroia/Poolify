import { error } from "console";
import { AuthenticationState } from "./AuthenticationState";
import { DashboardPage, DashboardState } from "./DashboardState";
import { QuestionState } from "./QuestionState";
export interface ApplicationState {
  authentication: AuthenticationState;
  dashboard: DashboardState;
  question: QuestionState;
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
  questions: [],
};

export const questionInitialState: QuestionState = {
  question: null,
  loading: false,
  error: null,
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
    questions: [],
  },
  question: {
    question: null,
    loading: false,
    error: null,
  },
};
