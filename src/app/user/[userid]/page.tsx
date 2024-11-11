"use client"
import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard/page'
import { useSearchParams } from 'next/navigation'
import Settings from './settings/page'



const Page = () => {

    const searchParam = useSearchParams()
    const option = searchParam.get('opt')
   return (
    <>
    {option === 'dashboard'? <Dashboard />:<Settings/>}
    </>
  )
}

export default Page