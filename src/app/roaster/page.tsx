import React from 'react'
import Navbar from '@/components/landing/Navbar'
import RoasterPage from '@/components/roaster/RoasterPage'

const page = () => {
  return (
    <main className='bg-[#1E012C] min-h-screen'>
      <Navbar bgColor='transparent' />
      <RoasterPage />
    </main>
  )
}

export default page
