'use client';

import React from 'react'

export default function MyQuizCardSkeleton() {
return (
    <div className='p-5 w-full h-40 border-[1.5px] border-zinc-600 rounded-lg bg-black bg-opacity-10 backdrop-blur-md'>
            <span className='inline-block h-5 w-[70%] animate-pulse bg-zinc-700 rounded-lg mt-2 mb-3'></span>
            <div className='flex flex-row justify-between w-48 gap-2'>
                    <span className='inline-block h-5 w-[50%] animate-pulse bg-zinc-700 rounded-lg mb-3'></span>
                    <span className='inline-block h-5 w-[50%] animate-pulse bg-zinc-700 rounded-lg mb-3'></span>
            </div>
            <div className='w-full flex items-center justify-end mt-2 gap-5'>
                    <span className='inline-block py-4 px-4 w-[20%] animate-pulse bg-zinc-500 rounded-lg'></span>
                    <span className='inline-block py-4 px-4 w-[40%] animate-pulse bg-zinc-500 rounded-lg'></span>
            </div>
    </div>
)
}
