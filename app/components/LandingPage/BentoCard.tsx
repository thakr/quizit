import React from "react";

export default function BentoCard({
  className,
  title,
  description,
  image,
}: {
  className?: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-black border-zinc-700 border-[1.5px]  shadow-lg ${className}`}
    >
      BentoCard
    </div>
  );
}
