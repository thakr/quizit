"use client";

import React, { Suspense, use, useEffect, useRef, useState } from "react";
import { Response, Status } from "../types";
import { AnswerType } from "@prisma/client";
import { QuestionsWithoutAnswer } from "../types";

import { SubmitButton } from "./SubmitButton";
import ShortInput from "./ShortInput";
import LongInput from "./LongInput";
import RadioButtons from "./RadioButtons";
import { handleForm, checkResponseCorrect } from "../lib/actions";
import { Session } from "next-auth";

export default function QuizCard({
  question,
  cardResponse,
  cardStatus,
  session,
}: {
  question: QuestionsWithoutAnswer;
  cardResponse: Response | undefined;
  cardStatus: boolean | undefined;
  session: Session;
}) {
  const [response, setResponse] = useState<Response | undefined>(cardResponse);
  const [status, setStatus] = useState<boolean | undefined>(cardStatus);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current?.clientHeight]);
  const renderAnswerType = () => {
    switch (question.answerType) {
      case AnswerType.SHORT_TEXT_NUMBER:
        return (
          <ShortInput
            answer={AnswerType.SHORT_TEXT_NUMBER}
            response={response?.answer}
          />
        );
      case AnswerType.SHORT_TEXT:
        return (
          <ShortInput
            answer={AnswerType.SHORT_TEXT}
            response={response?.answer}
          />
        );
      case AnswerType.LONG_TEXT:
        return <LongInput response={response?.answer} />;
      case AnswerType.MULTIPLE_CHOICE:
        return (
          <RadioButtons
            choices={question.choices}
            response={response?.answer}
          />
        );
    }
  };

  return (
    <div
      ref={ref}
      className={`${
        status == undefined
          ? "border-zinc-600 bg-black"
          : status === true
          ? "border-green-400 bg-green-900"
          : "border-red-400 bg-red-900"
      } border-[1.5px] w-full rounded-lg p-5 flex flex-col z-10 bg-opacity-20  backdrop-blur-md shadow-lg self-start ${
        height > 300 && "row-span-2"
      }`}
    >
      <h1
        className={`text-2xl ${
          response != undefined ? "text-zinc-400" : "text-white"
        } font-bold mb-5`}
      >
        {question.question}
      </h1>
      <form
        action={(formData) =>
          handleForm(formData, question, session).then(async (res) => {
            if (res && !("error" in res)) {
              setResponse(res);
              const newStatus = await checkResponseCorrect(res);
              setStatus(newStatus);
            }
          })
        }
        autoComplete="off"
        className="h-full flex flex-col"
      >
        {renderAnswerType()}
        <div className="flex flex-row justify-between mt-5">
          <span>
            {status && (
              <p className="p-2 font-bold text-green-400 text-md transition before:opacity-0 after:opacity-100">
                Correct
              </p>
            )}
            {status === false && (
              <p className="p-2 font-bold text-red-400 text-md transition before:opacity-0 after:opacity-100">
                Incorrect
              </p>
            )}
          </span>
          <SubmitButton disabled={response != undefined} />
        </div>
      </form>
    </div>
  );
}
