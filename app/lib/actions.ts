"use server";
import { Session } from "next-auth";
import { QuestionsWithoutAnswer, Response } from "../types";
import prisma from "./prisma";
import { signOut, signIn } from "@/auth";
import { Question } from "@prisma/client";
import { AnswerType } from "@prisma/client";
export async function handleForm(
  formData: FormData,
  question: QuestionsWithoutAnswer,
  session: Session
) {
  const data = formData.get("answer")?.toString();
  if (data) {
    if (session.user?.id) {
      const response = await prisma.response.create({
        data: {
          answer: data,
          questionId: question.id,
          userId: session.user.id,
        },
      });
      return response;
    } else {
      return { error: "Invalid user" };
    }
  } else {
    return { error: "Invalid data" };
  }
}
export async function editCreateQuestion(
  formData: FormData,
  question?: Question
) {
  const data = formData;
  const questionName = data.get("question")?.toString();
  const answerType = data.get("answerType")?.toString() as AnswerType;
  if (question) {
    const updatedQuestion = await prisma.question.update({
      where: { id: question.id },
      data: {
        question: questionName ? questionName.toString() : undefined,
        answerType: answerType,
        choices:
          answerType === AnswerType.MULTIPLE_CHOICE
            ? data.getAll("mcoption").map((c) => c.toString())
            : undefined,
        value: data.get("value")
          ? parseInt(data.get("value")!.toString())
          : undefined,
        answers: JSON.parse(data.get("correctResponses")!.toString()),
      },
    });

    return updatedQuestion;
  } else {
    const quizId = data.get("quizId")?.toString();
    if (questionName && answerType && quizId) {
      const createdQuestion = await prisma.question.create({
        data: {
          question: questionName,
          answerType: answerType,
          choices:
            answerType === AnswerType.MULTIPLE_CHOICE
              ? data.getAll("mcoption").map((c) => c.toString())
              : undefined,
          value: data.get("value")
            ? parseInt(data.get("value")!.toString())
            : undefined,
          answers: JSON.parse(data.get("correctResponses")!.toString()),
          quizId: quizId,
        },
      });
      return createdQuestion;
    } else {
      return { error: "Invalid data" };
    }
  }
}

export async function createQuiz(formData: FormData, session: Session) {
  if (session.user?.id) {
    const title = formData.get("name")?.toString();
    if (title) {
      const quiz = await prisma.quiz.create({
        data: {
          title: title,
          description: formData.get("description")?.toString(),
          authorId: session.user.id,
        },
      });
      return quiz;
    } else {
      return { error: "Invalid data" };
    }
  } else {
    return { error: "Invalid user" };
  }
}
export async function getQuiz(id: string) {
  const feed = await prisma.quiz.findUnique({
    where: { id: id },
    include: {
      questions: {
        omit: { answers: true },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return feed;
}
export async function getQuizWithAnswers(id: string) {
  const feed = await prisma.quiz.findUnique({
    where: { id: id },
    include: {
      questions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return feed;
}
export async function getUserQuizzes(userId: string) {
  const feed = await prisma.quiz.findMany({
    where: { authorId: userId },
    include: {
      questions: {
        include: {
          responses: true,
        },
      },
    },
  });
  return feed;
}
export async function getResponsesForUser(quizId: string, userId: string) {
  const res = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          responses: {
            where: { userId: userId },
          },
        },
      },
    },
  });
  return res;
}
export async function logOut() {
  await signOut();
}

export async function logIn(provider: string, callbackUrl?: string | null) {
  await signIn(provider, { redirectTo: callbackUrl ? callbackUrl : "/" });
}

export async function checkResponseCorrect(response: Response) {
  const question = await prisma.question.findUnique({
    where: { id: response.questionId },
  });
  if (question?.answers) {
    const qLower = question.answers.map((a) => a.toLowerCase());
    if (qLower.includes(response.answer.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  } else {
    return undefined;
  }
}
