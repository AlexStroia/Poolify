import { QuestionData } from "./QuestionData"

export type UserQuestionAnswer ={
    questionData: QuestionData
    questionOptionFirst?: string | null
    questionOptionSecond?: string | null
}