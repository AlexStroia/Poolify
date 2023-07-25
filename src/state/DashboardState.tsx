import { QuestionData } from "../model/QuestionData";
import { User } from "../model/User";

export enum DashboardPage {
  HOME = 0,
  LEADERBOARD = 1,
  NEW = 2,
}
export interface DashboardState {
  page: DashboardPage;
  loadingNewQuestions: boolean;
  loadingDoneQuestions: boolean;
  loading: boolean;
  errorMessage?: string | null;
  allQuestions: QuestionData[];
  userAnsweredQuestions: QuestionData[];
  userNewQuestions: QuestionData[];
  users?: User[];
}
