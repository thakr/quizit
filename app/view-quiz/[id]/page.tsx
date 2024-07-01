import React from "react";
import { auth } from "@/auth";
import { getQuiz, getResponsesForUser, getUser } from "@/app/lib/actions";
import { Session } from "next-auth";
import QuizPage from "@/app/components/QuizPage/QuizPage";
import Link from "next/link";
import SecondaryButton from "@/app/components/Global/SecondaryButton";
import { motion } from "framer-motion";
import ViewingName from "@/app/components/ViewQuizPage/ViewingName";

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [user: string]: string | string[] | undefined };
}) {
  if (params.id && searchParams.user) {
    const quiz = await getQuiz(params.id);
    if (!quiz) {
      return 404;
    }
    const session = (await auth()) as Session;
    const user = await getUser(searchParams.user.toString());
    if (session && session.user?.id) {
      if (quiz.authorId === session.user.id) {
        if (user) {
          let responses: {
            id: string;
            userId: string;
            questionId: string;
            answer: string;
          }[] = [];
          let statuses: { questionId: string; status: boolean | undefined }[] =
            [];
          const response = await getResponsesForUser(
            quiz.id,
            searchParams.user.toString()
          );
          response?.questions.forEach((q) => {
            const qLower = q.answers.map((a) => a.toLowerCase());
            q.responses.forEach((r) => {
              responses.push(r);
              statuses.push({
                questionId: q.id,
                status:
                  q.answers && q.answers.length > 0
                    ? qLower.includes(r.answer.toLowerCase())
                    : undefined,
              });
            });
          });
          return (
            <div>
              <ViewingName name={user.name!} />
              <QuizPage
                quiz={quiz}
                responses={responses}
                statuses={statuses}
                session={undefined}
              />
            </div>
          );
        } else {
          return <div>inavlid user</div>;
        }
      }
    }
    return <div>unauthorized</div>;
  } else {
    return 404;
  }
}
