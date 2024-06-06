'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

export default function LongInput({disabled} : {disabled: boolean}) {
  const { pending } = useFormStatus()

  return (
    <textarea required name="answer" className="bg-transparent rounded-xl border-[1.5px] border-zinc-600 py-2.5 px-5 resize-none w-full h-64 disabled:cursor-not-allowed disabled:border-zinc-700" disabled={pending || disabled} placeholder="Enter a response" />
  )
}
