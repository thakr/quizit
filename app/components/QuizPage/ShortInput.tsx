'use client'

import React from 'react'
import { AnswerType } from "@prisma/client"
import { useFormStatus } from 'react-dom'

export default function ShortInput({answer, response} : {answer: AnswerType, response: string | undefined}) {
  const { pending } = useFormStatus()
  return (
    <input name="answer" value={response} className="bg-transparent rounded-lg border-[1.5px] border-zinc-600 py-2.5 px-5 w-full disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-400" type={answer === AnswerType.SHORT_TEXT_NUMBER ? "number" : "text"} placeholder={answer === AnswerType.SHORT_TEXT_NUMBER ? "Enter a number" : "Enter a response"} required disabled={pending || response != undefined}/>
  )
}
