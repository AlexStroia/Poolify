import { QuestionData } from "./QuestionData";

export type User = {
  email?: string | null;
  displayName?: string | null;
  userId?: string | null;
  questionsAnswered?: QuestionData[];
  questionsPut?: QuestionData[];
};
