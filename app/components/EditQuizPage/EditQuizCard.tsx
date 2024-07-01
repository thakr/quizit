"use client";

import { AnswerType, Question, Quiz } from "@prisma/client";
import React, { useEffect, useState, useRef } from "react";

import { SubmitButton } from "../Global/SubmitButton";
import { ChevronDownIcon, Cross1Icon } from "@radix-ui/react-icons";
import Dropdown from "../Global/Dropdown";
import DangerButton from "../Global/DangerButton";
import { deleteQuestion, editCreateQuestion } from "../../lib/actions";
import Alert from "../Global/Alert";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function EditQuizCard({
  defaultQuestion,
  quiz,
  close,
  session,
}: {
  defaultQuestion?: Question;
  quiz: Quiz;
  close: (question?: Question) => void;
  session: Session;
  open?: (question: Question) => void;
}) {
  const [answerType, setAnswerType] = useState("Short answer");
  const [mcOptions, setMcOptions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [height, setHeight] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<Question | undefined>(
    defaultQuestion
  );
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current?.clientHeight]);

  useEffect(() => {
    switch (question?.answerType) {
      case AnswerType.SHORT_TEXT_NUMBER:
        setAnswerType("Number");
        break;
      case AnswerType.SHORT_TEXT:
        setAnswerType("Short answer");
        break;
      case AnswerType.LONG_TEXT:
        setAnswerType("Long answer");
        break;
      case AnswerType.MULTIPLE_CHOICE:
        setAnswerType("Multiple choice");
        setMcOptions(question.choices);
        break;
      default:
        setAnswerType("Short answer");
    }
    setResponses(question?.answers || []);
  }, [question]);
  const router = useRouter();
  return (
    <div
      className={`border-[1.5px] w-full rounded-lg p-4 flex flex-col bg-black bg-opacity-10 backdrop-blur-md shadow-lg border-zinc-600 self-start ${
        height > 500 && "row-span-2"
      } ${height > 750 && "row-span-3"}`}
      ref={ref}
    >
      <form
        action={(formData) => {
          switch (answerType) {
            case "Short answer":
              formData.append("answerType", AnswerType.SHORT_TEXT);
              break;
            case "Number":
              formData.append("answerType", AnswerType.SHORT_TEXT_NUMBER);
              break;
            case "Long answer":
              formData.append("answerType", AnswerType.LONG_TEXT);
              break;
            case "Multiple choice":
              formData.append("answerType", AnswerType.MULTIPLE_CHOICE);
              break;
          }
          formData.append("correctResponses", JSON.stringify(responses));
          formData.append("quizId", quiz.id.toString());
          editCreateQuestion(formData, session, question).then((res) => {
            if (res) {
              setQuestion(res);
            }
          });
        }}
      >
        <fieldset className="mb-5">
          <input
            type="text"
            className="bg-transparent rounded-lg border-[1.5px] border-zinc-600 p-4 w-full font-bold text-2xl"
            placeholder="Question"
            defaultValue={question?.question}
            name="question"
            required
          ></input>
        </fieldset>

        <fieldset className="mb-5">
          <Dropdown
            trigger={
              <div className="flex items-center justify-center gap-4 py-2 px-4 border-zinc-600 border-[1.5px] rounded-lg">
                <div className="text-white">{answerType}</div>
                <ChevronDownIcon className="h-5 w-5 text-white" />
              </div>
            }
            content={[
              {
                value: "Short answer",
                onClick: () => setAnswerType("Short answer"),
              },
              { value: "Number", onClick: () => setAnswerType("Number") },
              {
                value: "Long answer",
                onClick: () => setAnswerType("Long answer"),
              },
              {
                value: "Multiple choice",
                onClick: () => setAnswerType("Multiple choice"),
              },
            ]}
          />
        </fieldset>
        <fieldset className="flex flex-row gap-2 mb-5">
          <input
            type="number"
            className="bg-transparent rounded-lg border-[1.5px] border-zinc-600 p-1 text-center w-10"
            placeholder="1"
            name="value"
            defaultValue={question?.value}
          ></input>
          <p className="p-1">points</p>
        </fieldset>
        {answerType === "Multiple choice" && (
          <fieldset className="mb-5">
            <label className="text-white font-semibold">Choices</label>
            {mcOptions.map((option, index) => (
              <div
                className="flex flex-row gap-2 mt-3 items-center "
                key={index}
              >
                <input
                  type="text"
                  className="bg-transparent rounded-lg border-[1.5px] border-zinc-600 px-4 py-2 w-52"
                  placeholder="Choice"
                  name="mcoption"
                  value={option}
                  onChange={(e) =>
                    setMcOptions(
                      mcOptions.map((o, i) =>
                        i === index ? e.target.value : o
                      )
                    )
                  }
                  required
                ></input>
                {index !== 0 && (
                  <Cross1Icon
                    className="h-5 w-5 text-zinc-300 hover:text-white transition cursor-pointer"
                    onClick={() =>
                      setMcOptions(mcOptions.filter((_, i) => i !== index))
                    }
                  ></Cross1Icon>
                )}
              </div>
            ))}
            <div
              className="font-bold text-zinc-300 hover:text-white transition cursor-pointer mt-3"
              onClick={() => setMcOptions([...mcOptions, ""])}
            >
              Add option
            </div>
          </fieldset>
        )}
        <fieldset className="">
          {responses.length > 0 && (
            <label className="text-white font-semibold">
              Correct responses
            </label>
          )}
          {responses.map((option, index) => (
            <div className="flex flex-row gap-2 items-center mt-3" key={index}>
              {answerType === "Multiple choice" ? (
                <Dropdown
                  trigger={
                    <div className="flex items-center justify-center gap-4 py-2 px-4 border-zinc-600 border-[1.5px] rounded-lg">
                      <div className="text-white">{responses[index]}</div>
                      <ChevronDownIcon className="h-5 w-5 text-white" />
                    </div>
                  }
                  content={mcOptions.map((v) => ({
                    value: v,
                    onClick: () =>
                      setResponses(
                        responses.map((_, i) =>
                          i === index ? v : responses[i]
                        )
                      ),
                  }))}
                />
              ) : (
                <input
                  type="text"
                  className="bg-transparent rounded-lg border-[1.5px] border-zinc-600 px-4 py-2 w-52"
                  placeholder="Correct response"
                  name="correctResponse"
                  value={option}
                  onChange={(e) =>
                    setResponses(
                      responses.map((o, i) =>
                        i === index ? e.target.value : o
                      )
                    )
                  }
                  required
                ></input>
              )}
              <Cross1Icon
                className="h-5 w-5 text-zinc-300 hover:text-white transition cursor-pointer"
                onClick={() =>
                  setResponses(responses.filter((_, i) => i !== index))
                }
              ></Cross1Icon>
            </div>
          ))}
          <div
            className="font-bold text-zinc-300 hover:text-white transition cursor-pointer mt-3"
            onClick={() =>
              setResponses([
                ...responses,
                answerType === "Multiple choice" ? mcOptions[0] : "",
              ])
            }
          >
            Add correct response
          </div>
        </fieldset>
        <fieldset className="w-full flex gap-4 py-5 justify-end">
          {question ? (
            <Alert
              onAction={() => {
                setDisabled(true);
                deleteQuestion(question, session).then((res) => {
                  setDisabled(false);
                  close(res);
                });
              }}
              trigger={<DangerButton text="Delete" disabled={disabled} />}
              description="This action is irreversible. The question and all responses associated with it will be permanently removed."
            />
          ) : (
            <DangerButton text="Delete" onClick={close} />
          )}
          {question ? (
            <SubmitButton text="Save changes" disabled={disabled} />
          ) : (
            <SubmitButton text="Create question" disabled={disabled} />
          )}
        </fieldset>
      </form>
    </div>
  );
}
