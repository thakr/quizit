'use client'

// import {Radio, RadioGroup } from '@headlessui/react'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function RadioButtons({choices, disabled} : {choices: string[] | undefined, disabled: boolean}) {
    const [selected, setSelected] = React.useState<string | undefined>("");
    const { pending } = useFormStatus()
    
    return (
        <RadioGroup.Root className="flex flex-col gap-4 justify-center" value={selected} onValueChange={setSelected} required={true} name="answer" aria-label="multiple-choice">
            {choices?.map((choice, i) => (
                <RadioGroup.Item key={i} value={choice} className="group py-2.5 flex justify-between px-4 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-800 transition data-[state=checked]:from-zinc-500 data-[state=checked]:to-zinc-600 hover:cursor-pointer data-[disabled]:from-zinc-800 data-[disabled]:to-zinc-800 data-[disabled]:cursor-not-allowed" disabled={pending || disabled}>
                        <div className={`${disabled ? "text-zinc-400" : "text-white" } font-bold`}>{choice}</div>
                        <CheckCircleIcon className="size-6 fill-white opacity-0 group-data-[state=checked]:opacity-100" />
                </RadioGroup.Item>
                
            ))}
        </RadioGroup.Root>
    )
}
