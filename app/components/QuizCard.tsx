import React from 'react'
import { Status } from "../types"
import { AnswerType } from '@prisma/client'
import { QuizWithQuestions, QuestionsWithoutAnswer } from '../types';

import { SubmitButton } from './SubmitButton'
import ShortInput from './ShortInput'
import LongInput from './LongInput'
import RadioButtons from './RadioButtons'
import { handleForm } from '../lib/actions'

export default function QuizCard({question, status} : {question: QuestionsWithoutAnswer, status: Status}) {
    const renderAnswerType = () => {
        switch (question.answerType) {
            case AnswerType.SHORT_TEXT_NUMBER: return <ShortInput answer={AnswerType.SHORT_TEXT_NUMBER} disabled={status != undefined}/>
            case AnswerType.SHORT_TEXT: return <ShortInput answer={AnswerType.SHORT_TEXT} disabled={status != undefined}/>
            case AnswerType.LONG_TEXT: return <LongInput disabled={status != undefined}/>
            case AnswerType.MULTIPLE_CHOICE: return <RadioButtons choices={question.choices} disabled={status != undefined}/>
        }
    }
    

    return (
        <div className={`${status == undefined ? 'border-zinc-600' : status == 'correct' ? 'border-green-400' : 'border-red-400'} border-[1.5px] w-full rounded-xl py-2.5 px-7 flex flex-col z-10 bg-black bg-opacity-10 backdrop-blur-md`}>
            <h1 className={`text-2xl ${status != undefined ? "text-zinc-400" : "text-white" } font-bold pt-2.5`}>{question.question}</h1>
            <form action={handleForm} autoComplete='off' className='my-5 h-full flex flex-col'>
                {renderAnswerType()}
                <div className='flex flex-row justify-between mt-5'>
                    <span>
                        {status == 'correct' && <p className='p-2 font-bold text-green-400 text-md transition'>Correct</p>}
                        {status == 'incorrect' && <p className='p-2 font-bold text-red-400 text-md transition'>Incorrect</p>}
                    </span>
                    <SubmitButton disabled={status != undefined}/>
                </div>
                
            </form>

        </div>
    )
}
