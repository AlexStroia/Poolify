import { User } from "../model/User";

export interface AuthenticationState {
  user: User | null;
  error?: string;
  loading: boolean | false;
}
