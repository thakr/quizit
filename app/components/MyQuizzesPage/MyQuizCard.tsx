"use client";

import React, { use, useEffect, useState } from "react";
import { QuizWithQuestionsAndResponses } from "../../types";
import PrimaryButton from "../Global/PrimaryButton";
import Link from "next/link";
import SecondaryButton from "../Global/SecondaryButton";
import { DotsHorizontalIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import Dropdown from "../Global/Dropdown";
import DialogComponent from "../Global/DialogComponent";
import * as Dialog from "@radix-ui/react-dialog";
import { getUsersFromQuiz } from "@/app/lib/actions";

export default function MyQuizCard({
  quiz,
}: {
  quiz: QuizWithQuestionsAndResponses;
}) {
  const [responses, setRespnoses] = useState<
    | null
    | {
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      }[]
  >(null);
  useEffect(() => {
    getUsersFromQuiz(quiz.id).then((res) => setRespnoses(res));
  }, [quiz.id]);
  return (
    <div className="p-5 w-full h-40 border-[1.5px] border-zinc-600 rounded-lg bg-black bg-opacity-10 backdrop-blur-md opacity-80 hover:opacity-100 transition">
      <h1 className="text-xl text-white font-bold mb-2">{quiz.title}</h1>
      <div className="mb-2 flex flex-row justify-between w-52">
        <p className="text-zinc-300">
          Questions:{" "}
          <span className="font-bold text-white">{quiz.questions.length}</span>
        </p>
        <p className="text-zinc-300">
          Responses:{" "}
          <span className="font-bold text-white">
            {responses?.length.toString() ?? "0"}
          </span>
        </p>
      </div>
      <div className="w-full flex items-center justify-end gap-5 mt-4">
        <Link href={`/quiz/${quiz.id}/edit`}>
          <SecondaryButton text="Edit quiz" />
        </Link>
        <DialogComponent trigger={<PrimaryButton text="View responses" />}>
          <Dialog.Title className="text-xl font-bold mb-5">
            Responses
          </Dialog.Title>
          <div className="max-h-96 overflow-scroll px-2 flex flex-col gap-3">
            {responses && responses.length > 0 ? (
              responses?.map((res) => {
                return (
                  <Link
                    href={`/view-quiz/${quiz.id}?user=${res.id}`}
                    key={res.id}
                  >
                    <div className="flex flex-row items-center bg-black justify-between px-5 py-3 rounded-lg border-[1.5px] border-zinc-800 opacity-80 hover:opacity-100 transition cursor-pointer">
                      <p>{res.name}</p>
                      <ExternalLinkIcon className="h-5 w-5 text-zinc-300 ml-2"></ExternalLinkIcon>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No responses yet</p>
            )}
          </div>
        </DialogComponent>
      </div>
      <div className="fixed top-0 right-0 items-center flex p-2 ">
        <Dropdown
          trigger={
            <DotsHorizontalIcon className="h-6 w-6 text-zinc-300 text-center transition cursor-pointer hover:text-white" />
          }
          content={[
            {
              value: "Share",
              onClick: () => {
                console.log("share");
              },
            },
            { value: <Link href={`/quiz/${quiz.id}`}>View preivew</Link> },
            {
              value: "Settings",
            },
          ]}
        />
      </div>
    </div>
  );
}
