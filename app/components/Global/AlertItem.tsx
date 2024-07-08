import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { motion } from "framer-motion";

type AlertItemProps = {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  onSelect?: () => void;
  onOpenChange?: (arg: boolean) => void;
};

const AlertItem = React.forwardRef(
  (props: AlertItemProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
      props;

    return (
      <AlertDialog.Root onOpenChange={onOpenChange}>
        <AlertDialog.Trigger asChild>
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
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay asChild>
            <motion.div
              className="fixed inset-0 bg-black/50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          </AlertDialog.Overlay>
          <AlertDialog.Content asChild forceMount>
            <motion.div
              initial={{ opacity: "0%" }}
              animate={{ opacity: "100%" }}
              exit={{ opacity: "0%" }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-50 -translate-y-1/2 bg-zinc-950 border-zinc-800 border-[1.5px] rounded-lg shadow-lg p-7 w-full sm:w-[26rem]"
            >
              {children}
            </motion.div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    );
  }
);
AlertItem.displayName = "AlertItem";
export default AlertItem;
