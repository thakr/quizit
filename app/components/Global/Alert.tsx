import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import SecondaryButton from "./SecondaryButton";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

export default function Alert({
  trigger,
  onAction,
  title,
  description,
}: {
  trigger: React.ReactNode;
  onAction: () => void;
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root onOpenChange={(o) => setOpen(o)}>
      <AlertDialog.Trigger asChild className="relative">
        {trigger}
      </AlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay asChild forceMount />
            <motion.div
              initial={{ opacity: "0%" }}
              animate={{ opacity: "100%" }}
              exit={{ opacity: "0%" }}
              className="fixed inset-0 bg-black bg-opacity-50 transition "
            >
              <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border-zinc-800 border-[1.5px] rounded-lg shadow-lg p-7 max-w-lg">
                <AlertDialog.Title className="text-xl font-bold mb-5">
                  {title ? title : "Are you sure?"}
                </AlertDialog.Title>
                <AlertDialog.Description className="text-zinc-300 mb-5">
                  {description ? description : "This action is irreversible."}
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
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
