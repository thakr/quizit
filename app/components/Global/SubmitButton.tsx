"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  text,
  disabled,
}: {
  text?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className=" py-2 px-4 rounded-lg text-center text-black font-bold bg-white hover:bg-zinc-300 transition disabled:bg-zinc-400 disabled:cursor-not-allowed"
      type="submit"
      disabled={disabled || pending}
    >
      {text ? text : "Submit"}
    </button>
  );
}
