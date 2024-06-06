'use client'

import React from 'react'
import { AnswerType } from "@prisma/client"
import { useFormStatus } from 'react-dom'

export default function ShortInput({answer, disabled} : {answer: AnswerType, disabled: boolean}) {
  const { pending } = useFormStatus()

  return (
    <input name="answer" className="bg-transparent rounded-xl border-[1.5px] border-zinc-600 py-2.5 px-5 w-full disabled:cursor-not-allowed disabled:border-zinc-700" type={answer == AnswerType.SHORT_TEXT_NUMBER ? "number" : "text"} placeholder={answer == AnswerType.SHORT_TEXT_NUMBER ? "Enter a number" : "Enter a response"} required disabled={pending || disabled}/>
  )
}
