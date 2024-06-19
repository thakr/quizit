import React from "react";
import { useFormStatus } from "react-dom";
export default function DangerButton({
  text,
  disabled,
  onClick,
}: {
  text: String;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className=" py-2 px-4 rounded-lg text-center text-white font-bold bg-red-900 hover:bg-red-700 transition disabled:bg-zinc-600 disabled:cursor-not-allowed"
      disabled={disabled || pending}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
