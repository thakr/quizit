import React from "react";
import QuizCardSkeleton from "../../components/QuizCardSkeleton";

export default function loading() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center px-10 py-20 sticky top-0">
        <span className="inline-block h-5 w-[40%] animate-pulse bg-zinc-700 rounded-lg mt-2.5 mb-5"></span>
        <span className="inline-block h-5 w-[25%] animate-pulse bg-zinc-700 rounded-lg mt-2.5 mb-5"></span>
      </div>
      <div className="sm:mx-10">
        <div className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid">
          {...Array(16)
            .fill(0)
            .map((_, i) => <QuizCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
