import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Features from '@/components/About Us/Features'
import Message from '@/components/About Us/Message'
import Partners from '@/components/About Us/Partners'
import Team from '@/components/About Us/Team'
import Achievement from '@/components/About Us/Achivement'
import Subscribe from '@/components/About Us/Subscribe'
import AboutUsFooter from '@/components/About Us/AboutUsFooter'

const AboutUs = () => {
  return (
    <main >
      <Navbar />
      <Features />
      <Message />
      <Partners />
      <Team />
      <Achievement />
      <Subscribe />
      <AboutUsFooter />
    </main>
  )
}

export default AboutUs