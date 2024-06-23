"use client";

import * as Dialog from "@radix-ui/react-dialog";
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
      <Dialog.Trigger className="relative">{trigger}</Dialog.Trigger>
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
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-30 -translate-y-1/2 bg-zinc-950 border-zinc-800 border-[1.5px] rounded-lg shadow-lg p-7 w-full sm:w-[26rem]"
              >
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
