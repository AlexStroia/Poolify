import { User } from "../model/User";

export interface AuthenticationState {
  user: User | null;
  error: unknown | null;
  loading: boolean | false;
}
