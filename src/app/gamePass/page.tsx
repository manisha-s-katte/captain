import React from 'react'
import Navbar from '@/components/landing/Navbar'
import GamePassCarousel from '@/components/GamePass/Carousel'
import CategoryGamePass from '@/components/GamePass/CategoryGamePass'
import GamePassFooter from '@/components/GamePass/GamePassFooter'

const gamePass = () => {
  return (
    <main className='bg-gradient-to-tl from-[#110219] to-[#37024F] text-white' >
      <Navbar bgColor='transparent' />
      <div className='w-full flex justify-center items-center'>
    <GamePassCarousel></GamePassCarousel>
    </div>
      <CategoryGamePass />
      <GamePassFooter />
    </main>
  )
}

export default gamePass