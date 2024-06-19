'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

export default function DialogComponent({children, trigger}: {children: React.ReactNode, trigger: React.ReactNode}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 transition'/>
        <AnimatePresence>
          <motion.div initial={{ opacity:"0%"}} animate={{ opacity:"100%"}} exit={{opacity:"0%"}}>
            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-lg shadow-lg p-7 w-96'>
                {children}
            </Dialog.Content>
          </motion.div>
        </AnimatePresence>
        
    </Dialog.Portal>
    </Dialog.Root>
    
  )
}
