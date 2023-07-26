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
  loadingNewQuestions: false,
  errorMessage: null,
  loading: false,
  allQuestions: [],
  userAnsweredQuestions: [],
  userNewQuestions: [],
  loadingDoneQuestions: false,
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
    loggedOut: null,
  },
  dashboard: {
    page: DashboardPage.HOME,
    loadingNewQuestions: false,
    errorMessage: null,
    allQuestions: [],
    userAnsweredQuestions: [],
    userNewQuestions: [],
    loading: false,
    loadingDoneQuestions: false,
  },
  question: {
    question: null,
    loading: false,
    error: null,
  },
};
