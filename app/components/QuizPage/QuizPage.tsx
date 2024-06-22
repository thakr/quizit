"use client";

import React, { useEffect, useState, useRef, use } from "react";
import { QuizWithQuestions, Response } from "../../types";
import { Session } from "next-auth";
import QuizCard from "./QuizCard";
import { motion } from "framer-motion";
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid"
          >
            {quiz.questions.map((question, index: number) => (
              <QuizCard
                key={index}
                question={question}
                cardResponse={responses.find(
                  (r) => r.questionId === question.id
                )}
                cardStatus={
                  statuses.find((s) => s.questionId == question.id)?.status
                }
                session={session}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
