"use client";
import React, { useEffect, useState } from "react";
import { QuizWithQuestionsWithAnswers } from "../types";
import { Session } from "next-auth";
import EditQuizCard from "./EditQuizCard";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function EditQuizPage({
  quiz,
  session,
}: {
  quiz: QuizWithQuestionsWithAnswers;
  session: Session;
}) {
  const [questions, setQuestions] = useState(quiz.questions);
  const [newQuestions, setNewQuestions] = useState<number[]>([]);
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
          <h1 className="text-6xl text-white font-bold p-2.5">{quiz.title}</h1>
          <p className="text-zinc-400 p-2.5 text-center md:max-w-[50%]">
            {quiz.description}
          </p>
        </div>
      </div>
      <div className="sm:mx-10 mt-44">
        <div className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid justify-center">
          {questions.map((question, index: number) => (
            <EditQuizCard
              key={index}
              defaultQuestion={question}
              quiz={quiz}
              session={session}
              close={(question) => {
                if (question) {
                  setQuestions(questions.filter((q) => q.id !== question.id));
                }
              }}
            />
          ))}
          {newQuestions.map((v) => (
            <EditQuizCard
              key={v}
              quiz={quiz}
              close={() => setNewQuestions(newQuestions.filter((n) => n !== v))}
              session={session}
            />
          ))}
          <div
            className="p-5 w-full min-h-[21.875rem] h-full border-[1.5px] border-dashed border-zinc-600 rounded-lg bg-black bg-opacity-10 backdrop-blur-md transition flex items-center justify-center group hover:border-white cursor-pointer"
            onClick={() =>
              setNewQuestions([
                ...newQuestions,
                newQuestions[newQuestions.length - 1] + 1 || 0,
              ])
            }
          >
            <PlusIcon className="h-10 w-10 text-zinc-300 group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
