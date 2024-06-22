"use client";
import React, { useEffect, useRef, useState } from "react";
import { QuizWithQuestionsWithAnswers } from "../../types";
import { Session } from "next-auth";
import EditQuizCard from "./EditQuizCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

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
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current?.clientHeight]);
  console.log(height);
  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div
          className={`flex flex-col items-center px-10 py-16 transition duration-300 top-0 ${
            scrollY > 0 ? "opacity-20" : "opacity-100"
          }`}
        >
          <div
            ref={ref}
            className="flex fixed items-center flex-col text-center max-w-2xl"
          >
            <h1 className="text-6xl text-white font-bold p-2.5">
              {quiz.title}
            </h1>
            <p className="text-zinc-400 p-2.5 text-center">
              {quiz.description}
            </p>
          </div>
        </div>
      </motion.div>
      <div
        style={{
          height: `${height}px`,
        }}
        className={` `}
      ></div>
      <div className="sm:mx-10">
        {height !== 0 && (
          <motion.div
            className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {questions.map((question) => (
              <EditQuizCard
                key={question.id}
                defaultQuestion={question}
                quiz={quiz}
                session={session}
                close={(closedQuestion) => {
                  if (closedQuestion) {
                    setQuestions(
                      questions.filter((q) => {
                        return q.id !== closedQuestion.id;
                      })
                    );
                  }
                }}
              />
            ))}
            {newQuestions.map((v) => (
              <EditQuizCard
                key={v}
                quiz={quiz}
                close={() =>
                  setNewQuestions(newQuestions.filter((n) => n !== v))
                }
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
          </motion.div>
        )}
      </div>
    </div>
  );
}
