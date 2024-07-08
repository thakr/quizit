import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { motion } from "framer-motion";

type DialogItemProps = {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  onSelect?: () => void;
  onOpenChange?: (arg: boolean) => void;
};

const DialogItem = React.forwardRef(
  (props: DialogItemProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
      props;

    return (
      <Dialog.Root onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <DropdownMenu.Item
            {...itemProps}
            ref={forwardedRef}
            className="text-zinc-200 cursor-pointer outline-none py-2 px-4 hover:bg-zinc-700 rounded-lg"
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            {triggerChildren}
          </DropdownMenu.Item>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              className="fixed inset-0 bg-black/50 z-20"
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
      </Dialog.Root>
    );
  }
);
DialogItem.displayName = "DialogItem";
export default DialogItem;
