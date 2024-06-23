import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./components/Global/PrimaryButton";
import TiltCard from "./components/LandingPage/TiltCard";
import BentoCard from "./components/LandingPage/BentoCard";

export default function Home() {
  return (
    <div>
      <div className="w-full h-screen top-0 absolute flex items-center justify-center bg-gradient-to-b from-zinc-800 to-black">
        <div className="m-auto h-full">
          <div className="flex flex-row items-center justify-around w-full h-full">
            <div className="md:w-2/5 px-10">
              <h1 className="mb-8 text-6xl lg:text-7xl w-full font-bold ">
                The quiz app for the 21st century
              </h1>

              <p className="mb-8 text-zinc-300 font-semibold text-xl">
                QuizIt&apos;s modular design keeps you engaged, one question at
                a time. Discover endless possibilities with every quiz you
                create and share.
              </p>
              <Link href="/login">
                <PrimaryButton text="Get started"></PrimaryButton>
              </Link>
            </div>
            <TiltCard></TiltCard>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-4rem)]"></div>
      {/* <div className="w-full h-[calc(100vh-4rem)] flex flex-col gap-20 items-center justify-center bg-zinc-800">
        <h1 className="text-6xl font-bold mx-10 md:w-4/5">
          Features for both users and creators
        </h1>
        <div className="h-4/5 w-4/5 grid grid-cols-3 grid-rows-2 gap-2">
          <BentoCard
            title="Create"
            description="Create quizzes in seconds"
            image="/images/create.svg"
            className="col-span-2"
          ></BentoCard>
          <BentoCard
            title="Create"
            description="Create quizzes in seconds"
            image="/images/create.svg"
          ></BentoCard>
          <BentoCard
            title="Create"
            description="Create quizzes in seconds"
            image="/images/create.svg"
          ></BentoCard>
          <BentoCard
            title="Create"
            description="Create quizzes in seconds"
            image="/images/create.svg"
            className="col-span-2"
          ></BentoCard>
        </div>
      </div> */}
    </div>
  );
}
