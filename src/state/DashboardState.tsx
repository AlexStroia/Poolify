import { QuestionData } from "../model/QuestionData";

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
  questions: QuestionData[];
}
