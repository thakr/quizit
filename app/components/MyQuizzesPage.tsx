"use client";

import React, { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import MyQuizCard from "./MyQuizCard";
import { QuizWithQuestionsAndResponses } from "../types";
import DialogComponent from "./DialogComponent";
import PrimaryButton from "./PrimaryButton";
import { Session } from "next-auth";
import { createQuiz } from "../lib/actions";
import { redirect } from "next/navigation";

export default function MyQuizzesPage({
  quizzes,
  session,
}: {
  quizzes: QuizWithQuestionsAndResponses[];
  session: Session;
}) {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div
      className="w-full h-screen bg-gradient-to-b overflow-auto no-scrollbar from-black to-zinc-900 before:opacity-0 transition after:opacity-100"
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
          My Quizzes
        </h1>
      </div>
      <div className="pb-10 px-10 w-full flex items-center justify-center">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 w-full md:w-[75%]">
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
                  if (res && !("error" in res)) {
                    redirect(`/quiz/${res.id}`);
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
                <XMarkIcon className="h-6 w-6 text-zinc-300 transition cursor-pointer hover:text-white"></XMarkIcon>
              </Dialog.Close>
            </div>
          </DialogComponent>
        </div>
      </div>
    </div>
  );
}
