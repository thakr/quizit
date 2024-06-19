"use-client";

  import React from 'react'
  
  export default function QuizCardSkeleton() {
    return (
        <div>
            <div className={`border-zinc-600 border-[1.5px] rounded-lg py-2.5 px-7 flex flex-col min-w-80 max-w-96 z-10 bg-black bg-opacity-10 backdrop-blur-md`}>
                <span className='inline-block h-5 w-[70%] animate-pulse bg-zinc-700 rounded-lg mt-2.5 mb-5'></span>
                <span className='inline-block h-5 w-full animate-pulse bg-zinc-700 rounded-lg mb-5'></span>
                <span className='inline-block h-5 w-[30%] animate-pulse bg-zinc-700 rounded-lg mb-2.5'></span>
            </div>
        </div>
    )
  }
  
  