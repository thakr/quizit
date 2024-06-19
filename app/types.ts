import { Prisma } from "@prisma/client";

export enum AnswerType {
  LongText = "long-text",
  ShortTextNumber = "short-text-number",
  MultipleChoice = "multiple-choice",
  ShortText = "short-text",
}
export type Status = "correct" | "incorrect" | undefined;

export type QuizWithQuestions = Prisma.QuizGetPayload<{
  include: {
    questions: {
      omit: { answers: true };
    };
  };
}>;
export type QuizWithQuestionsWithAnswers = Prisma.QuizGetPayload<{
  include: {
    questions: true;
  };
}>;
export type QuizWithQuestionsAndResponses = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        responses: true;
      };
    };
  };
}>;
export type QuestionsWithoutAnswer = Prisma.QuestionGetPayload<{
  omit: { answers: true };
}>;

export type Response = {
  id: string;
  userId: string;
  questionId: string;
  answer: string;
};
