"use client";

import React from "react";

export default function SecondaryButton({
  text,
  disabled,
  onClick,
}: {
  text: String;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className="py-2 px-4 rounded-lg text-center text-white font-bold bg-zinc-900 border-zinc-600 border-[1.5px] hover:bg-zinc-600 transition disabled:bg-zinc-400 disabled:cursor-not-allowed"
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
