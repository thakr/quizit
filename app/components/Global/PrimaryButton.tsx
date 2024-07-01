"use client";
import React from "react";

export default function PrimaryButton({
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
      className="py-2 px-4 rounded-lg text-center text-black font-bold bg-white hover:bg-zinc-300 transition disabled:bg-zinc-400 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
