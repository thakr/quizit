"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;
const START_Y = -14;
const START_X = -16;
const TiltCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(START_X);
  const y = useMotionValue(START_Y);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(START_X);
    y.set(START_Y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
    >
      <div className="xl:scale-125 scale-100 hidden md:block">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            transform,
          }}
          className="relative h-[27.5rem] w-[26rem] rounded-xl bg-black bg-opacity-20 flex items-center justify-center"
        >
          <div
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute border-zinc-600 border-[1.5px] w-96 rounded-lg p-5 flex flex-col z-10 bg-opacity-20 bg-black shadow-lg"
          >
            <h1 className="text-2xl font-bold mb-5">
              What is the capital city of Italy?
            </h1>
            <div className="flex flex-col gap-4 justify-center">
              <div className="group py-2.5 flex justify-between px-4 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 transition">
                <div className="text-white font-bold">Milan</div>
              </div>
              <div className="group py-2.5 flex justify-between px-4 rounded-lg bg-gradient-to-b from-zinc-500 to-zinc-600 transition">
                <div className="text-white font-bold">Rome</div>
                <CheckCircleIcon className="size-6 fill-white " />
              </div>
              <div className="group py-2.5 flex justify-between px-4 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 transition">
                <div className="text-white font-bold">Venice</div>
              </div>
              <div className="group py-2.5 flex justify-between px-4 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 transition">
                <div className="text-white font-bold">Florence</div>
              </div>
              <div className="flex flex-row justify-between">
                <span></span>
                <span className="py-2 px-4 rounded-lg text-center text-black font-bold bg-white">
                  Submit
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default TiltCard;
