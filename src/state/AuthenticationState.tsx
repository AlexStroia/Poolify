import { User } from "../model/User";

export interface AuthenticationState {
  user: User | null;
  errorMessage: string | "";
  success?: boolean | null;
  loading: boolean | false;
}
