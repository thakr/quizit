import { Prisma } from '@prisma/client';


export enum AnswerType {
    LongText = "long-text",
    ShortTextNumber = "short-text-number",
    MultipleChoice = "multiple-choice",
    ShortText = "short-text"

}
export type Status = "correct" | "incorrect" | undefined;

export interface Question {
    question: string;
    answerType: AnswerType;
    imageurl?: string; // not supported yet
    answer?: string;
    choices?: string[];
}
export interface Quiz {
    id: number;
    title: string;
    questions: Question[];
    timeLimit?: number; //seconds
    description?: string;
  }

 export type QuizWithQuestions = Prisma.QuizGetPayload<{
    include: {
      questions: {
        omit: { answer: true }
      }
    }
  }>
  export type QuestionsWithoutAnswer = Prisma.QuestionGetPayload<{
    omit: { answer: true }
  }>