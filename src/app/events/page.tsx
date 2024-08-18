import EventPage from '@/components/events/EventPage'
import Navbar from '@/components/landing/Navbar'
import React from 'react'

const page = () => {
  return (
    <main className='bg-gradient-to-tr from-[#60078C] to-[#1A0226] min-h-screen'>
      <Navbar bgColor='transparent' />
      <EventPage />
    </main>
  )
}

export default page
