'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({disabled} : {disabled: boolean}) {
  const { pending } = useFormStatus()
 
  return (
    <button className=' p-2 rounded-xl text-black font-bold bg-white w-24 hover:bg-zinc-300 transition disabled:bg-zinc-400 disabled:cursor-not-allowed' type="submit" disabled={pending || disabled}>
      Submit
    </button>
  )
}