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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger className="outline-none">
        <div>{trigger}</div>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {dropdownOpen && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content sideOffset={5} forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ ease: "easeInOut", duration: 0.1 }}
                className="w-56 bg-zinc-950 border-zinc-800 border-[1.5px] rounded-lg shadow-lg p-2 mt-2 mr-2 z-50"
              >
                {content.map((item, index) => {
                  return (
                    <div key={index}>
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
                    </div>
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
