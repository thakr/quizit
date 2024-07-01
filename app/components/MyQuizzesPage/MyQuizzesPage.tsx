"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";
import MyQuizCard from "./MyQuizCard";
import { QuizWithQuestionsAndResponses } from "../../types";
import DialogComponent from "../Global/DialogComponent";
import PrimaryButton from "../Global/PrimaryButton";
import { Session } from "next-auth";
import { createQuiz } from "../../lib/actions";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

export default function MyQuizzesPage({
  quizzes,
  session,
}: {
  quizzes: QuizWithQuestionsAndResponses[];
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
    <div className="w-full min-h-[calc(100vh-9rem)]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div
          className={`flex flex-col items-center px-10 py-16 transition duration-300 top-0 ${
            scrollY > 0 ? "opacity-20" : "opacity-100"
          }`}
        >
          <div className="flex justify-center fixed h-36 items-center flex-col text-center">
            <h1 className="text-6xl text-white font-bold p-2.5">My quizzes</h1>
          </div>
        </div>
      </motion.div>
      <div className="pb-10 mt-36 px-5 md:px-10 w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 2xl:grid-cols-3 gap-10 w-full lg:w-[75%]"
        >
          {quizzes.map((quiz) => (
            <MyQuizCard key={quiz.id} quiz={quiz} />
          ))}
          <DialogComponent
            trigger={
              <div className="p-5 w-full h-40 border-[1.5px] border-dashed border-zinc-600 rounded-lg bg-black bg-opacity-10 backdrop-blur-md transition flex items-center justify-center group hover:border-white cursor-pointer">
                <PlusIcon className="h-10 w-10 text-zinc-300 group-hover:text-white" />
              </div>
            }
          >
            <Dialog.Title className="text-xl font-bold mb-5">
              Create new quiz
            </Dialog.Title>
            <form
              action={(formData) =>
                createQuiz(formData, session).then(async (res) => {
                  if (res) {
                    redirect(`/quiz/${res.id}/edit`);
                  }
                })
              }
            >
              <fieldset className="mb-5 flex gap-2 flex-col">
                <label htmlFor="name" className="text-white font-semibold">
                  Name
                </label>
                <input
                  required
                  name="name"
                  placeholder="Movie trivia"
                  type="text"
                  className="w-full p-2.5 bg-black bg-opacity-10 rounded-lg border-[1.5px] border-zinc-600 focus:border-white focus:outline-none"
                />
              </fieldset>
              <fieldset className="mb-5 flex gap-2 flex-col">
                <label
                  htmlFor="description"
                  className="text-white font-semibold"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Test your knowledge about movies from the 21st century! (optional)"
                  className="w-full p-2.5 bg-black bg-opacity-10 rounded-lg border-[1.5px] border-zinc-600 resize-none h-32 focus:border-white focus:outline-none"
                />
              </fieldset>
              <fieldset className="pt-2 w-full flex justify-end">
                <PrimaryButton text="Create quiz" />
              </fieldset>
            </form>
            <div className="fixed top-0 right-0 p-4">
              <Dialog.Close className="text-white">
                <Cross1Icon className="h-5 w-5 text-zinc-300 transition cursor-pointer hover:text-white"></Cross1Icon>
              </Dialog.Close>
            </div>
          </DialogComponent>
        </motion.div>
      </div>
    </div>
  );
}
