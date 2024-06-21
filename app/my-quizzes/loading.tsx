import React from "react";
import MyQuizCardSkeleton from "../components/MyQuizCardSkeleton";

export default function loading() {
  return (
    <div className="w-full ">
      <div
        className={`flex flex-col items-center px-10 py-16 transition duration-300 top-0`}
      >
        <div className="flex justify-center h-36 items-center flex-col text-center">
          <h1 className="text-6xl text-white font-bold p-2.5">My quizzes</h1>
        </div>
      </div>
      <div className="pb-10 px-10 w-full flex items-center justify-center">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 w-full md:w-[75%]">
          {...Array(9)
            .fill(0)
            .map((_, i) => <MyQuizCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
