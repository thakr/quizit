import React from 'react'
import QuizCardSkeleton from '../../components/QuizCardSkeleton'; 

export default function loading() {
  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-zinc-900 overflow-y-scroll no-scrollbar'>
        <div className='flex flex-col items-center px-10 py-20 sticky top-0'>
          <span className='inline-block h-5 w-[40%] animate-pulse bg-zinc-700 rounded-xl mt-2.5 mb-5'></span>
          <span className='inline-block h-5 w-[25%] animate-pulse bg-zinc-700 rounded-xl mt-2.5 mb-5'></span>
        </div>
        <div className='sm:mx-10'>
          <div className="flex flex-row flex-wrap items-center m-5 h-full justify-center gap-10">
            {
             ...Array(10).fill(0).map((_, i) => <QuizCardSkeleton key={i}/>)
            }
          </div>
        </div>

      </div>
  )
}
