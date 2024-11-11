"use client"
import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard/page'
import { useSearchParams } from 'next/navigation'
import Settings from './settings/page'
import { getSession } from 'next-auth/react'



const Page = () => {

  const [email,setEmail] = useState("")

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      if(typeof(sessionData?.user?.email) === "string"){
      setEmail(sessionData.user.email)
      }
    }

    fetchSession();
  }, []);

    const searchParam = useSearchParams()
    const option = searchParam.get('opt')
   return (
    <>
    {option === 'dashboard'? <Dashboard email={email} />:<Settings email={email}/>}
    </>
  )
}

export default Page