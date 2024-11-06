"use client"
import React, { use } from 'react'
import Dashboard from './dashboard/page'
import { useSearchParams } from 'next/navigation'
import Settings from './settings/page'



const page = () => {
    const searchParam = useSearchParams()
    const option = searchParam.get('opt')
   return (
    <>
    {option === 'dashboard'? <Dashboard />:<Settings/>}
    </>
  )
}

export default page