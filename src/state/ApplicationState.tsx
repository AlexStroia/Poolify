import { AuthenticationState } from "./AuthenticationState";
import { User } from "../model/User";
export interface ApplicationState {
  auth: AuthenticationState;
}

export const appState: ApplicationState = {
  auth: {
    user: {
      id: null,
      email: null,
      token: null,
    },
    error: null,
    loading: false,
  },
};
