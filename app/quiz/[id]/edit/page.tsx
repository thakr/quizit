import EditQuizPage from "@/app/components/EditQuizPage/EditQuizPage";
import { getQuiz, getQuizWithAnswers } from "@/app/lib/actions";
import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
export const revalidate = 0;
type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quiz = await getQuiz(params.id);
  return {
    title: quiz?.title ? `Edit ${quiz.title}` : "Quiz not found",
  };
}
export default async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  const quiz = await getQuizWithAnswers(params.id);
  if (session && session.user?.id) {
    if (quiz) {
      if (quiz.authorId === session.user.id) {
        return <EditQuizPage session={session} quiz={quiz} />;
      } else {
        redirect(`/quiz/${params.id}`);
      }
    } else {
      return <div>Not found</div>;
    }
  } else {
    redirect(`/login?redirect=/quiz/${params.id}/edit`);
  }
}
