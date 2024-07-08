"use client";

import React, { useEffect, useState } from "react";
import { QuizWithQuestionsAndResponses } from "../../types";
import PrimaryButton from "../Global/PrimaryButton";
import Link from "next/link";
import SecondaryButton from "../Global/SecondaryButton";
import { DotsHorizontalIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import { toast } from "react-toastify";
import DialogComponent from "../Global/DialogComponent";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { deleteQuiz, getUsersFromQuiz, updateQuiz } from "@/app/lib/actions";
import { AnimatePresence, motion } from "framer-motion";
import DialogItem from "../Global/DialogItem";
import * as Switch from "@radix-ui/react-switch";
import { SubmitButton } from "../Global/SubmitButton";
import { Session } from "next-auth";
import AlertItem from "../Global/AlertItem";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function MyQuizCard({
  quiz,
  session,
}: {
  quiz: QuizWithQuestionsAndResponses;
  session: Session;
}) {
  const [responses, setRespnoses] = useState<
    | {
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      }[]
  >([]);
  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }
  useEffect(() => {
    getUsersFromQuiz(quiz.id).then((res) => setRespnoses(res));
  }, [quiz.id]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef(null);
  const focusRef = React.useRef(null);
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
                    <div className="flex flex-row items-center bg-black justify-between px-5 py-3 rounded-lg border-[1.5px] border-zinc-800 opacity-80 hover:opacity-100 hover:border-zinc-700 transition cursor-pointer">
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
        {/* <Dropdown
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
        /> */}
        <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenu.Trigger>
            <DotsHorizontalIcon
              ref={dropdownTriggerRef}
              className="h-6 w-6 text-zinc-300 text-center transition cursor-pointer hover:text-white"
            />
          </DropdownMenu.Trigger>
          <AnimatePresence>
            {dropdownOpen && (
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={5}
                  forceMount
                  asChild
                  hidden={hasOpenDialog}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.1 }}
                    className="w-56 bg-zinc-950 border-zinc-800 border-[1.5px] rounded-lg shadow-lg p-2 mt-2 mr-2 z-50"
                  >
                    <DropdownMenu.Item
                      className="text-zinc-200 cursor-pointer outline-none py-2 px-4 hover:bg-zinc-700 rounded-lg"
                      onSelect={() => {
                        navigator.clipboard.writeText(
                          `https://quizit.org/quiz/${quiz.id}`
                        );
                        toast("Link copied");
                      }}
                    >
                      <p>Copy link</p>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="text-zinc-200 cursor-pointer outline-none py-2 px-4 hover:bg-zinc-700 rounded-lg">
                      <Link href={`/quiz/${quiz.id}`}>View preview</Link>
                    </DropdownMenu.Item>
                    <DialogItem
                      triggerChildren="Settings"
                      onSelect={handleDialogItemSelect}
                      onOpenChange={handleDialogItemOpenChange}
                    >
                      <Dialog.Title className="text-xl font-bold mb-5">
                        Settings
                      </Dialog.Title>
                      <form
                        action={(formData) => {
                          formData.append("quizId", quiz.id);
                          updateQuiz(formData, session).then(() => {
                            toast("Quiz updated");
                          });
                        }}
                      >
                        <fieldset className="mb-5 flex gap-2 flex-col">
                          <label
                            htmlFor="name"
                            className="text-white font-semibold"
                          >
                            Name
                          </label>
                          <input
                            required
                            name="name"
                            placeholder="Movie trivia"
                            defaultValue={quiz.title}
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
                            defaultValue={quiz.description ?? undefined}
                            className="w-full p-2.5 bg-black bg-opacity-10 rounded-lg border-[1.5px] border-zinc-600 resize-none h-32 focus:border-white focus:outline-none"
                          />
                        </fieldset>
                        <fieldset className="mb-5 flex gap-2 flex-col">
                          <label
                            htmlFor="accepting-responses"
                            className="text-white font-semibold"
                          >
                            Accepting responses
                          </label>
                          <Switch.Root
                            className="w-[50px] h-[25px] bg-zinc-800 rounded-full relative  focus:shadow-black data-[state=checked]:bg-blue-700 outline-none cursor-default"
                            name="accepting-responses"
                            defaultChecked={quiz.acceptingAnswers}
                          >
                            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[27px]" />
                          </Switch.Root>
                        </fieldset>
                        <fieldset className="pt-2 w-full flex justify-end">
                          <SubmitButton text="Update quiz" />
                        </fieldset>
                      </form>
                    </DialogItem>
                    <AlertItem
                      triggerChildren="Delete"
                      onSelect={handleDialogItemSelect}
                      onOpenChange={handleDialogItemOpenChange}
                    >
                      <AlertDialog.Title className="text-xl font-bold mb-5">
                        Are you sure?
                      </AlertDialog.Title>
                      <AlertDialog.Description className="text-zinc-300 mb-5">
                        Deleting this quiz will delete all questions and
                        responses permanently.
                      </AlertDialog.Description>
                      <div className="flex flex-row justify-end gap-4 w-full">
                        <AlertDialog.Cancel asChild>
                          <SecondaryButton text="Cancel"></SecondaryButton>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <PrimaryButton
                            text="Delete"
                            onClick={() => {
                              deleteQuiz(quiz.id, session).then(() => {
                                toast("Quiz deleted successfully");
                              });
                            }}
                          ></PrimaryButton>
                        </AlertDialog.Action>
                      </div>
                    </AlertItem>
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
