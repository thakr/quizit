'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

export default function LongInput({ response} : {response: string | undefined}) {
  const { pending } = useFormStatus()

  return (
    <textarea required name="answer" value={response} className="bg-transparent rounded-lg border-[1.5px] border-zinc-600 py-2.5 px-5 resize-none w-full h-64 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-400" disabled={pending || response != undefined} placeholder="Enter a response" />
  )
}
