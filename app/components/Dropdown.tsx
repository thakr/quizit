import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export default function Dropdown({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: { value: React.ReactNode; onClick?: () => void; link?: String }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="outline-none">
        <div>{trigger}</div>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={5} className="z-50">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                className="min-w-[220px] bg-zinc-900 border-zinc-600 border-[1.5px] rounded-lg shadow-lg p-2 mt-2 mr-2"
              >
                {content.map((item, index) => {
                  return (
                    <>
                      {item.link ? (
                        <Link href={`${item.link}`}>
                          <DropdownMenu.Item
                            key={index}
                            className="text-zinc-200 cursor-pointer outline-none py-2 px-4 hover:bg-zinc-700 rounded-lg"
                            onClick={item.onClick}
                          >
                            {item.value}
                          </DropdownMenu.Item>
                        </Link>
                      ) : (
                        <DropdownMenu.Item
                          key={index}
                          className="text-zinc-200 cursor-pointer outline-none py-2 px-4 hover:bg-zinc-700 rounded-lg"
                          onClick={item.onClick}
                        >
                          {item.value}
                        </DropdownMenu.Item>
                      )}
                    </>
                  );
                })}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
