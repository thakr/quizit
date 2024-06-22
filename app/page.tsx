import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./components/Global/PrimaryButton";
import TiltCard from "./components/LandingPage/TiltCard";

export default function Home() {
  return (
    <div>
      <div className="w-full h-screen top-0 absolute flex items-center justify-center bg-gradient-to-b from-zinc-700 to-black">
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

      <div className="pb-[100vh]"></div>
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-black"></div>
    </div>
  );
}
