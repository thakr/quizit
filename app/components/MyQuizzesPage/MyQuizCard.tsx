import React from "react";
import { QuizWithQuestionsAndResponses } from "../../types";
import PrimaryButton from "../Global/PrimaryButton";
import Link from "next/link";
import SecondaryButton from "../Global/SecondaryButton";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import Dropdown from "../Global/Dropdown";
import DialogComponent from "../Global/DialogComponent";
import * as Dialog from "@radix-ui/react-dialog";

export default function MyQuizCard({
  quiz,
}: {
  quiz: QuizWithQuestionsAndResponses;
}) {
  return (
    <div className="p-5 w-full h-40 border-[1.5px] border-zinc-600 rounded-lg bg-black bg-opacity-10 backdrop-blur-md opacity-80 hover:opacity-100 transition">
      <h1 className="text-xl text-white font-bold mb-2">{quiz.title}</h1>
      <div className="mb-2 flex flex-row justify-between w-48">
        <p className="text-zinc-300">
          questions:{" "}
          <span className="font-bold text-white">{quiz.questions.length}</span>
        </p>
        <p className="text-zinc-300">
          responses:{" "}
          <span className="font-bold text-white">
            {quiz.questions.reduce((acc, q) => acc + q.responses.length, 0)}
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
            { value: "View preview", onClick: () => console.log("click") },
            {
              value: "Settings",
              onClick: () => {
                console.log("delete");
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
