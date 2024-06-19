import EditQuizPage from "@/app/components/EditQuizPage";
import { getQuizWithAnswers } from "@/app/lib/actions";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

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
