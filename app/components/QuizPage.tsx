'use client';

import React, { useEffect, useState } from 'react'
import QuizCard from '@/app/components/QuizCard';
//import { Quiz,Question,Status } from '../types';
import { QuizWithQuestions } from '../types';
import { AnswerType } from '@prisma/client';

export default function QuizPage({ quiz }: { quiz: QuizWithQuestions}) {
    const [scrolled, setScrolled] = useState(false);
    return (
      
    <div className='w-full h-screen bg-gradient-to-b from-black to-zinc-900 overflow-auto no-scrollbar before:opacity-0 transition after:opacity-100' onScroll={(e) => ((e.target as HTMLInputElement)).scrollTop/ (e.target as HTMLInputElement).clientHeight > 0 ? setScrolled(true) : setScrolled(false)}>
        <div className={`flex flex-col items-center px-10 py-20 sticky transition duration-300 top-0 ${scrolled ? 'opacity-20' : 'opacity-100'}`}>
          <h1 className='text-6xl text-white font-bold p-2.5 text-center'>{quiz.title}</h1>
          <p className='text-zinc-400 p-2.5 text-center md:max-w-[50%]'>{quiz.description}</p>
        </div>
        <div className='sm:mx-10'>
            {/* flex flex-row flex-wrap items-start justify-start */}
            <div className="m-5 lg:m-10 gap-10 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid">        
            
                {quiz.questions.map((question, index: number) => (
                  <div key={index} className={`${(question.answerType === AnswerType.LONG_TEXT || question.answerType === AnswerType.MULTIPLE_CHOICE) ? 'row-span-2' : 'row-span-1'}`}>
                    <QuizCard question={question} status={undefined}/>
                  </div>
                  
                ))}

            </div>
          
        </div>

      </div>
  )
}

