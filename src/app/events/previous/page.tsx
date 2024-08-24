import React from 'react'
import Navbar from '@/components/landing/Navbar'
import UpcomingPage from '@/components/events/upcoming/UpcomingPage'

const upcoming = () => {
  return (
    <main className='bg-gradient-to-tr from-[#35044D] to-[#1A0226] min-h-screen'>
      <Navbar bgColor='transparent' />
      <UpcomingPage />
      
    </main>
  )
}

export default upcoming
