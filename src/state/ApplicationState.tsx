import { AuthenticationState } from "./AuthenticationState";

export interface ApplicationState {
  auth: AuthenticationState;
}

export const initialState: ApplicationState = {
  // Initial state properties
  auth: {
    user: null,
    error: null,
  },
};
