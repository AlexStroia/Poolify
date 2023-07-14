import { AuthenticationState } from "./AuthenticationState";
export interface ApplicationState {
  authentication: AuthenticationState;
}

export const appState: ApplicationState = {
  authentication: {
    user: {
      id: null,
      email: null,
      token: null,
    },
    error: "",
    loading: false,
  },
};
