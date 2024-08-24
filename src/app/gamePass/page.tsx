import React from 'react'
import Navbar from '@/components/landing/Navbar'
import CategoryGamePass from '@/components/GamePass/CategoryGamePass'
import GamePassFooter from '@/components/GamePass/GamePassFooter'

const gamePass = () => {
  return (
    <main className='bg-gradient-to-tl from-[#110219] to-[#37024F]' >
      <Navbar bgColor='transparent' />
      <CategoryGamePass />
      <GamePassFooter />
    </main>
  )
}

export default gamePass