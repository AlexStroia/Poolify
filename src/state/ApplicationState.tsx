import { AuthenticationState } from "./AuthenticationState";
export interface ApplicationState {
  authentication: AuthenticationState;
}

export const authenticationState: AuthenticationState = {
  user: {
    id: null,
    email: null,
    token: null,
  },
  loading: false,
  error: "",
};

export const appState: ApplicationState = {
  authentication: {
    user: {
      id: null,
      email: null,
      token: null,
    },
    loading: false,
    error: "",
  },
};
