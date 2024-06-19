"use client";
import React, { useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [newQuestions, setNewQuestions] = useState(0);
  return (
    <div
      className="w-full h-screen bg-gradient-to-b from-black to-zinc-900 overflow-auto no-scrollbar before:opacity-0 transition after:opacity-100"
      onScroll={(e) =>
        (e.target as HTMLInputElement).scrollTop /
          (e.target as HTMLInputElement).clientHeight >
        0
          ? setScrolled(true)
          : setScrolled(false)
      }
    >
      <div
        className={`flex flex-col items-center px-10 py-20 sticky transition duration-300 top-0 ${
          scrolled ? "opacity-20" : "opacity-100"
        }`}
      >
        <h1 className="text-6xl text-white font-bold p-2.5 text-center">
          {quiz.title}
        </h1>
        <p className="text-zinc-400 p-2.5 text-center md:max-w-[50%]">
          {quiz.description}
        </p>
      </div>
      <div className="sm:mx-10">
        <div className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid justify-center">
          {quiz.questions.map((question, index: number) => (
            <EditQuizCard key={index} question={question} quiz={quiz} />
          ))}
          {[...Array(newQuestions)].map((_, i) => (
            <EditQuizCard
              key={quiz.questions.length + i}
              quiz={quiz}
              close={() => setNewQuestions(newQuestions - 1)}
            />
          ))}
          <div
            className="p-5 w-full h-full border-[1.5px] border-dashed border-zinc-600 rounded-lg bg-black bg-opacity-10 backdrop-blur-md transition flex items-center justify-center group hover:border-white cursor-pointer"
            onClick={() => setNewQuestions(newQuestions + 1)}
          >
            <PlusIcon className="h-10 w-10 text-zinc-300 group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
