import React from "react";
import MyQuizCardSkeleton from "../components/MyQuizCardSkeleton";

export default function loading() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-zinc-900 overflow-y-scroll no-scrollbar">
      <div className="flex flex-col items-center px-10 py-20 sticky top-0">
        <h1 className="text-6xl text-white font-bold p-2.5 text-center">
          My Quizzes
        </h1>
      </div>
      <div className="pb-10 px-10 w-full flex items-center justify-center">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 w-full md:w-[75%]">
          {...Array(16)
            .fill(0)
            .map((_, i) => <MyQuizCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
