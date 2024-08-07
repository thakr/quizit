"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function ViewingName({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-[50%] z-50 bottom-5"
    >
      <div className="bg-zinc-800 translate-x-[-50%] py-2 px-5 w-full sm:w-[28rem] rounded-full shadow-lg flex flex-row items-center justify-between ">
        <p>
          You are viewing this quiz as{" "}
          <span className="font-semibold">{name}</span>
        </p>
        <Link href="/my-quizzes">
          <p className="text-zinc-300 font-semibold hover:text-white transition">
            Stop
          </p>
        </Link>
      </div>
    </motion.div>
  );
}
