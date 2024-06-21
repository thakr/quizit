import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";
import SecondaryButton from "./SecondaryButton";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

export default function Alert({
  trigger,
  onAction,
}: {
  trigger: React.ReactNode;
  onAction: () => void;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition " />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: "0%" }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: "0%" }}
          >
            <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-lg shadow-lg p-7 w-96">
              <AlertDialog.Title className="text-xl font-bold mb-5">
                Are you sure?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-zinc-300 mb-5">
                This action is irreversible.
              </AlertDialog.Description>
              <div className="flex flex-row justify-end gap-4 w-full">
                <AlertDialog.Cancel asChild>
                  <SecondaryButton text="Cancel"></SecondaryButton>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <PrimaryButton
                    text="Delete"
                    onClick={onAction}
                  ></PrimaryButton>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </motion.div>
        </AnimatePresence>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
