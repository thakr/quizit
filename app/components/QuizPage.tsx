"use client";

import React, { useEffect, useState } from "react";
import QuizCard from "@/app/components/QuizCard";
//import { Quiz,Question,Status } from '../types';
import { QuizWithQuestions, Response } from "../types";
import { AnswerType } from "@prisma/client";
import { Session } from "next-auth";
export default function QuizPage({
  quiz,
  responses,
  statuses,
  session,
}: {
  quiz: QuizWithQuestions;
  responses: Response[];
  statuses: { questionId: string; status: boolean | undefined }[];
  session: Session;
}) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        className={`flex flex-col items-center px-10 py-16 transition duration-300 top-0 ${
          scrollY > 0 ? "opacity-20" : "opacity-100"
        }`}
      >
        <div className="flex fixed h-44 items-center flex-col text-center overflow-y-visible">
          {/* TODO: FIX OVERFLOW ISSUE WIHT TEXT TRUNCATING */}
          <h1 className="text-6xl text-white font-bold p-2.5">{quiz.title}</h1>
          <p className="text-zinc-400 p-2.5 text-center md:max-w-[50%]">
            {quiz.description}
          </p>
        </div>
      </div>
      <div className="sm:mx-10 mt-44">
        {/* flex flex-row flex-wrap items-start justify-start */}
        <div className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid">
          {quiz.questions.map((question, index: number) => (
            <QuizCard
              key={index}
              question={question}
              cardResponse={responses.find((r) => r.questionId === question.id)}
              cardStatus={
                statuses.find((s) => s.questionId == question.id)?.status
              }
              session={session}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
