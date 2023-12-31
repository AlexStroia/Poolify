import { QuestionData } from "../model/QuestionData";

export interface QuestionState {
  question?: QuestionData | null;
  loading: boolean | false;
  error?: string | null;
  avatarUrl?: string | null;
  userAnswer?: string | null;
}
