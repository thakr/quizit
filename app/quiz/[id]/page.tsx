import QuizPage from "@/app/components/QuizPage/QuizPage";
import { getQuiz, getResponsesForUser } from "@/app/lib/actions";

import React from "react";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
// Use the Quiz type as the type of quiz prop
export default async function Page({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id);
  const session = (await auth()) as Session;
  let responses: {
    id: string;
    userId: string;
    questionId: string;
    answer: string;
  }[] = [];
  let statuses: { questionId: string; status: boolean | undefined }[] = [];
  if (session && session.user?.id) {
    const response = await getResponsesForUser(params.id, session.user.id);
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
  } else {
    redirect(`/login?redirect=/quiz/${params.id}`);
  }
  return (
    <>
      {quiz ? (
        <QuizPage
          quiz={quiz}
          responses={responses}
          statuses={statuses}
          session={session}
        />
      ) : (
        <div>Not found</div>
      )}
    </>
  );
}
