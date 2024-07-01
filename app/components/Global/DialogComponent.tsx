"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export default function DialogComponent({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root onOpenChange={(o) => setOpen(o)}>
      <Dialog.Trigger className="relative" asChild>
        {trigger}
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 bg-black/50 z-20 backdrop-blur-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: "0%" }}
                animate={{ opacity: "100%" }}
                exit={{ opacity: "0%" }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-50 -translate-y-1/2 bg-zinc-950 border-zinc-800 border-[1.5px] rounded-lg shadow-lg p-7 w-full sm:w-[26rem]"
              >
                {children}
                <div className="fixed top-0 right-0 p-4">
                  <Dialog.Close className="text-white">
                    <Cross2Icon className="h-5 w-5 text-zinc-300 transition cursor-pointer hover:text-white"></Cross2Icon>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
