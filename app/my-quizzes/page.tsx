import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserQuizzes } from "../lib/actions";
import { QuizWithQuestionsAndResponses } from "../types";
import MyQuizzesPage from "../components/MyQuizzesPage/MyQuizzesPage";
export const metadata = {
  title: "QuizIt | My Quizzes",
};
export default async function page() {
  const session = await auth();
  let quizzes: QuizWithQuestionsAndResponses[] = [];
  if (session && session.user?.id) {
    quizzes = await getUserQuizzes(session.user.id);
    return <MyQuizzesPage quizzes={quizzes} session={session} />;
  } else {
    redirect("/login?redirect=/my-quizzes");
  }
}
