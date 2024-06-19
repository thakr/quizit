'use client';

import React, { useState } from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Session } from 'next-auth';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { logOut } from '@/app/lib/actions';
import Dropdown from '../Dropdown';
import UserAvatar from '../UserAvatar';

export default function NavBar({session} : {session: Session | null}) {
  return (
    <NavigationMenu.Root className='flex absolute w-screen z-20'>
      <NavigationMenu.Item className='ml-auto p-5 list-none'>
        
          {session?.user ? 
            <Dropdown trigger={<UserAvatar session={session} />} content={[{value: "My quizzes", link: "/my-quizzes"}, {value:"Sign out", onClick:() => logOut()}]}/>
          : <div>no user</div>}
            
          
      </NavigationMenu.Item>
        
      
    </NavigationMenu.Root>
  );
}
