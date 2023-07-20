import { AuthenticationState } from "./AuthenticationState";
export interface ApplicationState {
  authentication: AuthenticationState;
}

export const authenticationState: AuthenticationState = {
  user: {
    email: null,
    displayName: null,
  },
  loading: false,
  errorMessage: "",
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
};
