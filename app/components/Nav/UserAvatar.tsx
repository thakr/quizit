import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { Session } from "next-auth";

export default function UserAvatar({ session }: { session: Session }) {
  return (
    <>
      {session.user && (
        <Avatar.Root className="bg-zinc-800 inline-flex h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle shadow-lg">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={session.user.image as string}
            alt={session.user.name as string}
          />
          <Avatar.Fallback
            className="text-white leading-1 flex h-full w-full items-center justify-center text-[15px] font-medium"
            delayMs={600}
          >
            {session.user.name
              ?.split(" ")
              .map((name: string) => name[0])
              .join("")}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
    </>
  );
}
