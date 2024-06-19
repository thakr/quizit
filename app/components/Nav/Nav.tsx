import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'
export default async function Nav() {
    const session = await auth();
  return (
    <NavBar session={session} />
  )
}
